import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './manageTours.css';

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const tourRes = await axios.get(`${BASE_URL}/tours`);
                const tourData = tourRes.data.data;

                // Process tour data, handling the review count properly
                const toursWithReviews = tourData.map((tour) => {
                    return {
                        ...tour,
                        reviews: tour.reviews.length,  // Count reviews and use this number
                        rating: tour.reviews.length > 0 ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length : 'N/A'  // Calculate average rating if there are reviews
                    };
                });

                setTours(toursWithReviews);
            } catch (error) {
                console.error('Error fetching tours:', error);
                toast.error("Error al obtener los Tours");
            }
            setLoading(false);
        };

        fetchTours();
    }, []);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(tours) || tours.length === 0) {
        return <p>No hay tours disponibles</p>;
    }

    return (
        <div>
            <h2>Gestionar Tours</h2>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Ciudad</th>
                        <th>Reviews</th>
                        <th>Rating</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                            <td>{tour.title}</td>
                            <td>{tour.city}</td>
                            <td>{tour.reviews}</td>
                            <td>{tour.rating}</td>
                            <td>
                                <Link to={`/edit_tour/${tour._id}`} className="btn secondary__btn">Editar</Link>
                                <Link to={`/delete_tour/${tour._id}`} className="btn secondary__btn">Eliminar</Link>
                                <Link to={`/detail_tour/${tour._id}`} className="btn secondary__btn">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn secondary__btn">
                <Link to="/create_tour">Crear nuevo tour</Link>
            </button>
        </div>
    );
};

export default ManageTours;
