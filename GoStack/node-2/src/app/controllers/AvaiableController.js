import {startOfDay, endOfDay, setHours, setMinutes, setSeconds, format, isBefore} from 'date-fns';
import Appointment from '../models/Appointment';
import {Op} from 'sequelize';

class AvaiableController {
  async index(req, res) {
    const {date} = req.query;

    if(!date) {
      res.status(400).json({error: 'Must provide a date!'});
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
        }
      }
    });

    const schedule = [
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00'
    ];

    const avaiable = schedule.map( time => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(setMinutes(setHours(searchDate, hour), minute), 0);

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        avaiable: isBefore(new Date(), value) && !appointments.find( app => {
          return format(app.date, 'HH:mm') == time;
        })
      }
    });

    return res.json(avaiable);
  }
}

export default new AvaiableController();