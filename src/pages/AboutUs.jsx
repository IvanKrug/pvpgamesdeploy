import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-background min-h-screen text-black">
      <div className="container mx-auto p-4">
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-secondary p-4 rounded-lg shadow-lg">
              <img src={product.picture} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              <h2 className="text-xl font-bold mt-2">{product.name}</h2>
              <p className="text-sm mt-2">{product.description}</p>
              <p className="mt-2"><strong>Category:</strong> {product.category}</p>
              <p><strong>Platform:</strong> {product.platform}</p>
              <p className="text-lg font-bold mt-2"><strong>Price:</strong> ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
