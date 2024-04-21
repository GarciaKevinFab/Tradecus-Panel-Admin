import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmAlert from '../Alerts/ConfirmAlert';
import { Link } from 'react-router-dom';


const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/contact`);
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al obtener los contactos");
      setLoading(false);
    }
  };

  const handleCheck = async (contactId) => {
    ConfirmAlert({
      title: 'Confirmación',
      message: '¿Estás seguro que fue atendido?',
      onConfirm: async () => {
        try {
          await axios.delete(`${BASE_URL}/contact/${contactId}`);
          toast.success("Contacto atendido y eliminado correctamente");
          fetchContacts(); // Refresh contacts
        } catch (error) {
          toast.error("Error al eliminar el contacto");
        }
      }
    });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>Gestionar Contactos</h2>
      {contacts.length === 0 ? (
        <p>No hay contactos disponibles</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
              <th>Acciones</th>
              <th>Atendido</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <input type="checkbox" onChange={() => handleCheck(contact._id)} />
                </td>
                <td>
                  <Link to={`/detail_contact/${contact._id}`} className="btn secondary__btn">
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageContacts;
