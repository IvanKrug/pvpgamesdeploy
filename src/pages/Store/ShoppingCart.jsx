import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showThanksMessage, setShowThanksMessage] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    setCartItems(cart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('carrito', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
   
    setShowThanksMessage(true);
    localStorage.removeItem('carrito'); 
    setTimeout(() => {
      navigate('/')
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="p-8">
        {!showThanksMessage && (
          <section className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Tu Carrito de Compras</h2>
            <p className="mt-4 text-gray-400">Revisa y gestiona los productos en tu carrito.</p>
          </section>
        )}
        {showThanksMessage ? (
          <section className="text-center">
            <h3 className="text-2xl font-semibold mb-4">¡Gracias por tu compra!</h3>
            <p className="text-lg text-gray-400">Tu pedido ha sido procesado exitosamente.</p>
          </section>
        ) : (
          <>
            <section>
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-pvp-azul-900">
                  <tr>
                    <th className="p-4">Producto</th>
                    <th className="p-4">Categoría</th>
                    <th className="p-4">Plataforma</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Cantidad</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item._id} className="border-b border-gray-700">
                      <td className="p-4 flex items-center">
                        <img src={item.picture} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                        <span>{item.name}</span>
                      </td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">{item.platform}</td>
                      <td className="p-4">${item.price}</td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="mt-8 text-center">
              <h3 className="text-2xl font-semibold">Total: ${calculateTotal()}</h3>
              <button
                onClick={handleCheckout}
                className="bg-pvp-verde font-bold mt-4 bg-primary text-background px-4 py-2 rounded-md hover:bg-primary/60 transition-colors duration-300 focus:outline-none focus:ring focus:ring-indigo-100"
              >
                Proceder al Pago
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ShoppingCart;
