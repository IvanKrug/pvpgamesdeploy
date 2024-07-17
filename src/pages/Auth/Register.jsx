import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const goHome = () => {
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/register', formData)
      const accesMsg = response.data.message
      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: accesMsg,

      });


    } catch (error) {
      const errorMsg = error.response.data.errorMessage

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,

      });
    }

  };

  return (

    <div className="flex  items-center justify-center min-h-screen bg-[url('./assets/background.jpg')] bg-cover bg-center">"
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-pvp-azul-900 from-35%  via-100% to-pvp-azul-800 w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl "
      >
        <h2 className="text-2xl font-bold text-center text-white">Crear una cuenta</h2>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-white">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-white">
            Nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px- py-2 mt-1 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="font-semibold w-full py-2 px-4 text-white bg-pvp-verde rounded-md hover:bg-pvp-verde/60 transition-colors duration-300  focus:outline-none focus:ring focus:ring-indigo-100"
        >
          Registrarse
        </button>
        <Link>
          <button
            type="button"
            onClick={goHome}
            className="font-semibold w-full py-2 px-4 mt-2 text-white bg-red-500 rounded-md hover:bg-red-500/60 transition-colors duration-300  focus:outline-none focus:ring focus:ring-indigo-100"
          >
            Volver
          </button>
        </Link>



      </form>
    </div>
  );
};

export default Register;
