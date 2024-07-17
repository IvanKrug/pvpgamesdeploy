
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import ProductForm from './pages/Auth/ProductForm';

const App = () => {
  return (
    <Login />,
    <Register />,
    <LandingPage />,
    <ShoppingCart/>,
    <AboutUs/>,
    <ProductForm/>



  );
};

export default App;
