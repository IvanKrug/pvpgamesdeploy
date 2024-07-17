import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


const NavBar = () => {

    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState("")

    const logOut = () => {
        localStorage.clear()
        setToken("")
        setIsLogin(false)
        Swal.fire({
            icon: "success",
            title: "Exito!",
            text: "Cierre de Sesion Exitoso ",

        });
        navigate("/")
    }

    
    const login = () => {
        navigate("/login")
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        if (token?.length > 1) {
            setIsLogin(true);
        }
    }, [token]);


    return (
        <header className="sticky top-0 bg-gradient-to-b from-pvp-azul-900 via-100% to-pvp-azul-800/90 z-10">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-12 h-12 p-1 rounded" />
                </Link>

                <div className="flex items-center space-x-4">
                    <button onClick={isLogin ? logOut : login} className="rounded text-xs p-1 bg-pvp-verde hover:bg-pvp-verde/60 transition-colors duration-300 focus:outline-none focus:ring focus:ring-indigo-100 text-white">
                        {isLogin ? "Cerrar Sesión" : "Iniciar Sesión"}
                    </button>
                    <Link to="/shop">
                        <HiOutlineShoppingCart color='white' size={24} />
                    </Link>

                </div>
            </nav>
        </header>
    );
}

export default NavBar;
