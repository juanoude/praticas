import Appointment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';


class AppointmentController {
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

    const appointment = await Appointment.create({
      user_id: req.userId, 
      provider_id, 
      date
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();