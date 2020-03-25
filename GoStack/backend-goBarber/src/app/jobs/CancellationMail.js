import Mail from '../../lib/Mail';
import {pt} from 'date-fns/locale/pt';
import {format, parseISO} from 'date-fns';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {

    const {appointment} = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      text: 'Você tem um novo cancelamento',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "'dia ' dd 'de' MMMM ', às' HH:mm'h'", {locale: pt})
      }
    });
  }
}

export default new CancellationMail();