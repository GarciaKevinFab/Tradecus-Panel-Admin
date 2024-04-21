import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';

const ContactDetail = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Obtiene el ID desde la URL

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contact/${id}`);

        setContact(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error al obtener el contacto");

        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!contact) {
    return <p>No se encontró el contacto</p>;
  }

  return (
    <div>
      <h2>Detalle del Contacto</h2>
      <p><strong>Nombre:</strong> {contact.name}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Mensaje:</strong> {contact.message}</p>
    </div>
  );
};

export default ContactDetail;
