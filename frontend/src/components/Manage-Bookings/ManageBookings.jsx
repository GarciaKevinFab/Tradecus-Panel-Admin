import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BASE_URL } from '../../utils/config';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './manageBookings.css';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../Modal/CustomModal';

const localizer = momentLocalizer(moment);

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/booking`, { withCredentials: true });
      const events = res.data.data.map(booking => ({
        ...booking,
        start: new Date(booking.bookAt),
        end: new Date(booking.bookAt),
        title: `${booking.tourName} - ${booking.guestSize} guests`
      }));
      setBookings(events);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectEvent = (booking) => {
    setSelectedBooking(booking);
    setModalIsOpen(true);
  };

  const handleSelectSlot = (slotInfo) => {
    navigate(`/create_booking?date=${slotInfo.start.toISOString()}`);
  }

  const eventStyleGetter = () => ({
    style: { className: "myCustomEvent" }
  });

  return (
    <div style={{ height: 500 }}>
      <h2>Gestión de Reservas</h2>
      <p>Haga clic en la fecha elegida para crear una reserva.</p>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
        selectable='ignoreEvents'
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
      />
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
};

export default ManageBookings;
