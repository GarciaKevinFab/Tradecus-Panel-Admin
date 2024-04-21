import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        photo: '',
        role: 'user',
    });

    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_users");
    };


    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${BASE_URL}/users`, userData);
            toast.success('Usuario creado exitosamente!');
            setUserData({
                username: '',
                email: '',
                password: '',
                photo: '',
                role: 'user',
            });
        } catch (error) {
            toast.error('Ocurrió un error al crear el usuario');
        }
    };

    return (
        <div className="CreateUser">

        <form onSubmit={handleSubmit}>
            <label>
                Nombre de Usuario:
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
            </label>
            <label>
                Foto:
                <input type="text" name="photo" value={userData.photo} onChange={handleChange} />
            </label>
            <label>
                Rol:
                <select name="role" value={userData.role} onChange={handleChange}>
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                </select>
            </label>
            <input type="submit" value="Crear usuario" />
        </form>
        <button onClick={handleBack}>Regresar</button>

        </div>

    );
};

export default CreateUser;
