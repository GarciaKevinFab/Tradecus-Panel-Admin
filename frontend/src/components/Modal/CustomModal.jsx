import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, booking }) => {
  const [bookingInfo, setBookingInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (booking) {
      setBookingInfo(booking);
    }
  }, [booking]);

  const handleReschedule = () => {
    navigate(`/reschedule_booking`, { state: { booking: bookingInfo } });
    onRequestClose(); // Cierra el modal tras la acción
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reserva?')) {
      try {
        await axios.delete(`${BASE_URL}/booking/${bookingInfo._id}`, {
          withCredentials: true
        });
        toast.success('Reserva eliminada con éxito.');
        onRequestClose(); // Cierra el modal
        // Considera usar un enfoque más sofisticado que reload para actualizar la lista
        window.location.reload();
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        toast.error('Error al eliminar la reserva.');
      }
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalle de la Reserva"
      style={{
        overlay: {
          zIndex: 9999,
        },
        content: {
          zIndex: 9999,
        },
      }}
    >
      <h2>Detalle de la Reserva</h2>
      <p>Usuario ID: {bookingInfo.userId}</p>
      <p>Email del Usuario: {bookingInfo.userEmail}</p>
      <p>Nombre del Tour: {bookingInfo.tourName}</p>
      <p>Tipo de Tour: {bookingInfo.tourType}</p>
      <p>Número de Invitados: {bookingInfo.guestSize}</p>
      <p>Teléfono: {bookingInfo.phone}</p>
      <p>Fecha de Reserva: {bookingInfo.bookAt && moment(bookingInfo.bookAt).format('LLL')}</p>
      <h3>Detalles de los Invitados:</h3>
      {bookingInfo.userData && bookingInfo.userData.map((user, index) => (
        <div key={index}>
          <p>Nombre: {user.nombres}</p>
          <p>Apellido Paterno: {user.apellidoPaterno}</p>
          <p>Apellido Materno: {user.apellidoMaterno}</p>
        </div>
      ))}
      <button onClick={handleReschedule}>Reprogramar Reserva</button>
      <button onClick={handleDelete}>Eliminar Reserva</button>
      <button onClick={onRequestClose}>Cerrar</button>
    </Modal>
  );
};

export default CustomModal;
