import React, { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, FormGroup } from "reactstrap";
import DniField from '../../components/DNI/DniField';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from "../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const CreateBooking = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [tourType, setTourType] = useState("private"); // New state for tour type
  const [booking, setBooking] = useState({
    userId: user ? user._id : "",
    userEmail: user ? user.email : "",
    tourName: "",
    phone: "",
    guestSize: 1,
    bookAt: new Date(),
  });
  const [dni, setDni] = useState(new Array(1).fill(""));
  const [userData, setUserData] = useState(new Array(1).fill({}));

  useEffect(() => {
    axios.get(`${BASE_URL}/tours`, { withCredentials: true })
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setTours(response.data.data); // Use response.data.data
        } else {
          console.error("Received data is not in expected format:", response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedDate = queryParams.get('date');
    if (selectedDate) {
      setBooking(prev => ({ ...prev, bookAt: new Date(selectedDate) }));
    }
  }, [location]);

  useEffect(() => {
    setDni(new Array(booking.guestSize).fill(""));
    setUserData(new Array(booking.guestSize).fill({}));
  }, [booking.guestSize]);

  const getMaxGuests = () => {
    return tourType === "private" ? 2 : 25;
  };

  const handleTourTypeChange = (e) => {
    const newTourType = e.target.value;
    setTourType(newTourType);
    const maxGuests = getMaxGuests();
    if (booking.guestSize > maxGuests) {
      setBooking(prev => ({ ...prev, guestSize: maxGuests }));
      toast.info(`Número máximo de invitados para ${newTourType} es ${maxGuests}.`);
    }
  };

  const handleGuestSizeChange = (e) => {
    const newGuestSize = parseInt(e.target.value, 10);
    const maxGuests = getMaxGuests();
    if (newGuestSize <= maxGuests) {
      setBooking(prev => ({ ...prev, guestSize: newGuestSize }));
    } else {
      toast.error(`Número de invitados excede el límite para el tipo de tour seleccionado.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((tourType === "private" && booking.guestSize > 2) ||
      (tourType === "corporate" && booking.guestSize > 25)) {
      toast.error('Número de invitados excede el límite para el tipo de tour seleccionado.');
      return;
    }

    const bookingData = {
      ...booking,
      userData: userData.filter(item => item.nombres && item.apellidoPaterno && item.apellidoMaterno),
      tourType: tourType
    };

    axios.post(`${BASE_URL}/booking`, bookingData, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setBooking(prev => ({ ...prev, tourName: "", phone: "", guestSize: 1 }));
        setUserData(new Array(1).fill({}));
        setDni(new Array(1).fill(""));
        toast.success('Reserva creada con éxito.');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Ocurrió un error al crear la reserva.');
      });
  };

  return (
    <div>
      <h2>Crear nueva reserva</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nombre del Tour:</label>
          <select
            required
            value={booking.tourName}
            onChange={(e) => setBooking(prev => ({ ...prev, tourName: e.target.value }))}
          >
            <option value="">Seleccione un tour</option>
            {Array.isArray(tours) && tours.map(tour => (
              <option key={tour._id} value={tour.title}>
                {tour.title}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label>Tipo de Tour:</label>
          <select
            required
            value={tourType}
            onChange={handleTourTypeChange}
          >
            <option value="private">Privado (1-2 personas)</option>
            <option value="corporate">Corporativo (1-25 personas)</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label>Número de invitados:</label>
          <input
            type="number"
            required
            min="1"
            max={getMaxGuests()}
            value={booking.guestSize}
            onChange={handleGuestSizeChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Teléfono:</label>
          <input
            type="tel"
            required
            value={booking.phone}
            onChange={(e) => setBooking(prev => ({ ...prev, phone: e.target.value }))}
          />
        </FormGroup>

        {Array.from({ length: booking.guestSize }, (_, i) => (
          <DniField
            key={i}
            index={i}
            dni={dni}
            setDni={setDni}
            userData={userData}
            setUserData={setUserData}
          />
        ))}

        <button type="submit">Crear Reserva</button>
      </Form>
    </div>
  );
}

export default CreateBooking;
