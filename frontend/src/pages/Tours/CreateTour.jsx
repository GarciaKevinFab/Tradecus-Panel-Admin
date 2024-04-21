import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import "../../styles/tour/createTour.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    city: "",
    address: "",
    duration: "",
    photos: [], // Aquí
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });

  const navigate = useNavigate(); // Hook useNavigate

  const handleBack = () => {
    navigate("/manage_tours");
  };

  const handleChange = (event) => {
    setTourData({
      ...tourData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      // Convertir la lista de archivos en un array
      const fileList = Array.from(selectedFiles);
      setTourData((prevData) => ({
        ...prevData,
        photos: fileList,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // Agregar los datos del tour al FormData
    Object.keys(tourData).forEach((key) => formData.append(key, tourData[key]));
    try {
      // Agregar las imágenes al FormData
      tourData.photos.forEach((photo) => {
        formData.append("photos", photo);
      });
      // Enviar el FormData al backend
      await axios.post(`${BASE_URL}/tours`, formData);
      toast.success("Tour creado exitosamente!");
      setTourData({
        title: "",
        city: "",
        address: "",
        duration: "",
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
        photos: [], // Limpiar el arreglo de fotos después de enviar el formulario
      });
    } catch (error) {
      toast.error("Ocurrió un error al crear el tour");
    }
  };
  return (
    <div className="CreateTour">
      <form onSubmit={handleSubmit} className="Containerform">
        <div className="inputs_container">
          <div className="left__side">
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={tourData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Ciudad:
              <input
                type="text"
                name="city"
                value={tourData.city}
                onChange={handleChange}
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="address"
                value={tourData.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Duración:
              <input
                type="text"
                name="duration"
                value={tourData.duration}
                onChange={handleChange}
              />
            </label>

            <label>
              Descripción:
              <textarea
                name="desc"
                value={tourData.desc}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="right__side">
            <label>
              Precio:
              <input
                type="number"
                name="price"
                value={tourData.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Máximo tamaño del grupo:
              <input
                type="number"
                name="maxGroupSize"
                value={tourData.maxGroupSize}
                onChange={handleChange}
              />
            </label>
            <label>
              ¿Destacado?
              <input
                type="checkbox"
                name="featured"
                checked={tourData.featured}
                onChange={() =>
                  setTourData({ ...tourData, featured: !tourData.featured })
                }
              />
            </label>
            <label>
              Fotos:
              <input
                type="file"
                name="photos"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="btn-form">
          {" "}
          <input type="submit" value="Crear tour" />
          <button onClick={handleBack} className="back">
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTour;