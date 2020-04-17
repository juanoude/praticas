import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointments = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  if (appointments.findByDate(parsedDate)) {
    return res
      .status(400)
      .json({ message: 'This appointment is not avaiable' });
  }

  const appointment = appointments.create(provider, date);

  return res.json(appointment);
});

export default appointmentsRouter;
