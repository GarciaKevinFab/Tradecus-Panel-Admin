import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { BASE_URL } from '../../utils/config';

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Añadir estado para cargar
  const [error, setError] = useState(null); // Añadir estado para errores

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const url = `${BASE_URL}/users/me`;
      console.log('Fetching user data from:', url);  // Mostrar la URL completa
      try {
        const response = await axios.get(url, { withCredentials: true });
        console.log('User data received:', response.data); // Mostrar datos recibidos
        setUser(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  return (
    <nav className="navbar">
      <div className="user-data">
        {loading ? (
          <span>Cargando...</span>
        ) : error ? (
          <span>Error al cargar los datos del usuario</span>
        ) : user ? (
          <>
            <span>{user.username}</span>
            <div className="user-img-container">
              <img
                className="user-img"
                src={user.photo || "https://res.cloudinary.com/du9dasmxo/image/upload/v1687728482/san_blas/man-smiling_lewrij.jpg"}
                alt="Imagen del usuario"
              />
            </div>
          </>
        ) : (
          <span>Usuario no encontrado</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
