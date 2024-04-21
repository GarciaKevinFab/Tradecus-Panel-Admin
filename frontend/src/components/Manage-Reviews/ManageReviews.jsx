import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/config';
import 'react-toastify/dist/ReactToastify.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/review`);
        setReviews(res.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error al obtener las revisiones");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return <p>No hay revisiones disponibles</p>;
  }

  return (
    <div>
      <h2>Gestionar Revisiones</h2>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Comentario</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.username}</td>
              <td>{review.reviewText}</td>
              <td>{review.rating}</td>
              <td>
                <Link to={`/delete_review/${review._id}`} className="btn secondary__btn">
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReviews;
