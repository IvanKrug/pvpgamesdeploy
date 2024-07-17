import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';


export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-pvp-verde">
            <NavBar />
            <main className="flex-grow container mx-auto ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
