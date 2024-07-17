import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const [items, setItems] = useState([]);
    const [alert, setAlert] = useState({ visible: false, message: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/product');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (item, quantity) => {
        const cart = JSON.parse(localStorage.getItem('carrito')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += parseInt(quantity, 10);
        } else {
            const newItem = { ...item, quantity: parseInt(quantity, 10) };
            cart.push(newItem);
        }

        localStorage.setItem('carrito', JSON.stringify(cart));
        setAlert({ visible: true, message: `Se agrego ${quantity} ${item.name} al carrito.` });

        setTimeout(() => {
            setAlert({ visible: false, message: '' });
        }, 3000);
    };

    const ProductCard = ({ item }) => {
        const [quantity, setQuantity] = useState(1);

        const handleQuantityChange = (e) => {
            setQuantity(e.target.value);
        };

        return (
            <div key={item._id} className="bg-gradient-to-b from-pvp-azul-900 via-pvp-azul-800 to-pvp-azul-800 w-full max-w-sm p-4 space-y-3 rounded-xl shadow-2xl flex flex-col">
                <img src={item.picture} alt={item.name} className="w-full h-64 object-cover rounded" />
                <div className="flex-grow">
                    <h3 className="mt-4 text-lg font-semibold">{item.name} | {item.platform}</h3>
                    <div>
                        <h4 className="mt-4 text-md font-semibold">{item.category}</h4>
                    </div>
                    <p className="mt-2 text-gray-400">
                        {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-gray-200 font-bold text-xl">${item.price}</div>
                    <div className="flex items-center">
                        <input
                            type="number"
                            className="px-3 max-w-20 py-2 border rounded-l text-gray-900 focus:outline-none focus:border-pvp-verde"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                        <button
                            onClick={() => handleAddToCart(item, quantity)}
                            className="font-semibold py-2 px-4 rounded-r text-white bg-pvp-verde hover:bg-pvp-verde/60 transition-colors duration-300 focus:outline-none focus:ring focus:ring-indigo-100"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white relative">
            <main className="p-8">
                <section className="text-center mb-8">
                    <h2 className="text-2xl font-semibold">Bienvenido a la mejor tienda de videojuegos online</h2>
                    <p className="mt-4 text-gray-400">Encuentra los mejores títulos y las últimas novedades en videojuegos.</p>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {items.map(item => (
                        <ProductCard key={item._id} item={item} />
                    ))}
                </section>
            </main>

            {alert.visible && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
                    {alert.message}
                </div>
            )}
        </div>
    );
};

export default LandingPage;
