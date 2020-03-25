import User from '../models/User';
import {Op} from 'sequelize';
import {startOfDay, endOfDay, parseISO} from 'date-fns';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if(!isProvider) {
      return res.status(400).json({error: 'Not a provider!'});
    }

    const {date} = req.query;

    const parsedDate = parseISO(date);

    const schedule = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)]
        }
      },
      order: ['date']
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();