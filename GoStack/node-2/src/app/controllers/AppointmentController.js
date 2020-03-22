import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';
import {startOfHour, parseISO, isBefore} from 'date-fns';


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

    return res.json(appointment);
  }
}

export default new AppointmentController();