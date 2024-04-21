import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import '../../styles/tour/editTour.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTour = () => {

    const { id } = useParams();

    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_tours");
    };

    const [tourData, setTourData] = useState({
        title: '',
        city: '',
        address: '',
        duration: '',
        photo: '',
        desc: '',
        reviews: [],
        price: '',
        maxGroupSize: '',
        featured: false,
    });

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/tours/${id}`);
                setTourData({
                    title: res.data.data.title || '',
                    city: res.data.data.city || '',
                    address: res.data.data.address || '',
                    duration: res.data.data.duration || '',
                    photo: res.data.data.photo || '',
                    desc: res.data.data.desc || '',
                    reviews: res.data.data.reviews || [],
                    price: res.data.data.price || '',
                    maxGroupSize: res.data.data.maxGroupSize || '',
                    featured: res.data.data.featured || false,
                });
            } catch (error) {
                toast.error('Ocurrió un error al obtener el tour');
            }
        };
        fetchTour();
    }, [id]);


    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setTourData({
            ...tourData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${BASE_URL}/tours/${id}`, tourData);
            toast.success('Tour actualizado exitosamente!');
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el tour');
        }
    };

    return (
        <div className="EditTour">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={tourData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    value={tourData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={tourData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="duration"
                    value={tourData.duration}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="photo"
                    value={tourData.photo}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="desc"
                    value={tourData.desc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={tourData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="maxGroupSize"
                    value={tourData.maxGroupSize}
                    onChange={handleChange}
                    required
                />
                <label>
                    Featured:
                    <input
                        name="featured"
                        type="checkbox"
                        checked={tourData.featured}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Actualizar tour" />
            </form>
            <button onClick={handleBack}>Regresar</button>

        </div>

    );
};

export default EditTour;
