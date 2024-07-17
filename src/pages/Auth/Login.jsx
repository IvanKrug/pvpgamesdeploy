// src/Login.jsx
import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, password });

            const userData = {
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            }
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            console.log(response)
            if(response.data.role === 'admin') {
                navigate("/new");
            }else if(
                response.data.role === 'user'
            ){
                navigate("/")
            }
            const accesMsg = response.data.message
            Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: accesMsg,

            });
         
        } catch (error) {
            console.log(error)
            const errorMsg = error.response.data.message

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: errorMsg,

            });
        }


    };

    return (
        <div className="flex  items-center justify-center min-h-screen bg-[url('./assets/background.jpg')] bg-cover bg-center">
            <div className="bg-gradient-to-b from-pvp-azul-900 from-35%  via-100% to-pvp-azul-800 w-full max-w-md p-8 space-y-3 rounded-xl shadow-2xl ">
                <div className="flex justify-center bg-cover bg-center rounde-full ">
                    <img src={logo} alt="Logo" className="w-24 h-24" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 ">
                        <label htmlFor="email" className=" block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-indigo-100"
                        />
                    </div>
                    <div className="space-y-1 bg">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-indigo-100"
                        />

                    </div>
                    <div>

                        <button
                            type="submit"
                            className="font-semibold w-full py-2 px-4 text-white bg-pvp-verde rounded-md hover:bg-pvp-verde/60 transition-colors duration-300  focus:outline-none focus:ring focus:ring-indigo-100"
                        >
                            Inicia Sesión
                        </button>

                        <div className='flex items-center justify-between mt-4'>
                            <hr className='flex-grow border-t border-white' />
                            <span className='mx-2 text-white'>O</span>
                            <hr className='flex-grow border-t border-white' />
                        </div>

                        <Link to={'/register'}>
                            <div className='text-white mt-2 text-sm font-light text-center hover:text-pvp-verde cursor-pointer'>
                                No tienes una cuenta? <span className='font-bold'>Crea una. </span>
                            </div>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;

