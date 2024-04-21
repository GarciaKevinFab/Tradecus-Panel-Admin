import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const TourDetail = () => {
    const [tour, setTour] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/tours/${id}`);
                setTour(res.data.data);
            } catch (error) {
            }
        };

        fetchTour();
    }, [id]);

    if (!tour) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h2>{tour.title}</h2>
            <p>Ciudad: {tour.city}</p>
            <p>Dirección: {tour.address}</p>
            <p>Duración: {tour.duration}</p>


            <p>Descripción: {tour.desc}</p>
            <p>Precio: {tour.price}</p>
            <p>Tamaño máximo del grupo: {tour.maxGroupSize}</p>
            {/* Aquí puedes agregar más detalles sobre el tour */}
        </div>
    );
};

export default TourDetail;
