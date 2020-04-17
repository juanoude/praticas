import { Router } from 'express';
// import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  if (appointments.find(appointment => isEqual(appointment.date, parsedDate))) {
    return res
      .status(400)
      .json({ message: 'This appointment is not avaiable' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return res.json(appointment);
});

export default appointmentsRouter;
