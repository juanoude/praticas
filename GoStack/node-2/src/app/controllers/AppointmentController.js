import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';
import {startOfHour, parseISO, isBefore, format, subHours} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';


class AppointmentController {
  async index(req, res) {
    const {page = 1} = req.query;

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: ['date'],
      attributes: ['id','date'],
      limit: 20,
      offset: (page -1) * 20,
      include: {
        model: User,
        as: 'provider',
        attributes: ['id', 'name'],
        include: {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url']
        }
      }
    });

    return res.json(appointments);
  }

  async store(req, res) {
    
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required()
    });
    
    if(!(await schema.isValid(req.body))) {
      return res.status(401).json({error: 'Schema Invalid'});
    }

    const { provider_id, date } = req.body;

    const existsProvider = await User.findOne({ where: { id: provider_id, provider: true }});
    
    if(!(existsProvider)) {
      return res.status(400).json({ error: 'Must be a valid provider'});
    }

    /**
     * Past dates block
     */
    const hourStart = startOfHour(parseISO(date));

    if(isBefore(hourStart, new Date())) {
      return res.status(400).json({error: 'Past dates are not allowed'});
    }

    /**
     * Check provider appointments availability
     */
    const providerAvailability = await Appointment.findOne({ 
      where: { 
        date: hourStart, 
        provider_id,
        canceled_at: null
      }
    });

    if(providerAvailability) {
      return res.status(400).json({error: 'Appointment date is not available'});
    }


    const appointment = await Appointment.create({
      user_id: req.userId, 
      provider_id, 
      date: hourStart
    });

    /**
     * Notification for provider
     */
    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' HH:mm'h'",
      { locale: pt }
    );


    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id
    });

    return res.json(appointment);
  }

  async delete(req, res) {

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: User,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    if(appointment.user_id !== req.userId) {
      return res.status(401).json({error: 'Not authorized to delete this appointment'});
    }

    const cancelTimeLimit = subHours(appointment.date, 2);

    if(isBefore(cancelTimeLimit, new Date())) {
      return res.status(401).json({error: "Can't cancel after two hours for the appointment"});
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();