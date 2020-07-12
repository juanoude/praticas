import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar
} from './styles';
import logoImg from '../../assets/logo.svg';

interface MonthAvailabilityItem {
  day: number;
  availability: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, logOut } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setSelectedMonth(month);

    api.get(`?month=${month.getMonth}&year=${month.getFullYear}`);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          month: selectedMonth.getMonth() + 1,
          year: selectedMonth.getFullYear()
        }
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [selectedMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>(`appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then((response) => {
        const formattedHourAppointments = response.data.map((appointment) => {
          return {
            ...appointment,
            formattedHour: format(parseISO(appointment.date), 'HH:mm')
          };
        });

        formattedHourAppointments.sort((a, b) => {
          if (a.formattedHour > b.formattedHour) {
            return 1;
          }

          if (a.formattedHour < b.formattedHour) {
            return -1;
          }

          return 0;
        });

        setAppointments(formattedHourAppointments);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const days = monthAvailability
      .filter((monthDay) => monthDay.availability === false)
      .map((monthDay) => {
        const year = selectedMonth.getFullYear();
        const month = selectedMonth.getMonth();
        const { day } = monthDay;
        return new Date(year, month, day);
      });

    return days;
  }, [selectedMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    const day = format(selectedDate, "dd 'de' MMMM", {
      locale: ptBR
    });
    const weekday = format(selectedDate, 'eeee', {
      locale: ptBR
    });

    return { day, weekday };
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const parsedDate = parseISO(appointment.date);
      return parsedDate.getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const parsedDate = parseISO(appointment.date);
      return parsedDate.getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Gobarber Logo" />

          <Profile>
            <img src={user.avatar_url} alt="Profile" />

            <div>
              <p>Seja bem-vindo</p>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={logOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText.day}</span>
            <span>{selectedDateAsText.weekday}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Não há agendamentos nesse período</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Não há agendamentos nesse período</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            onDayClick={handleDayChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
