import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ProductTable from '../../components/dataTables/ProductTable';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    platform: '',
    picture: '',
    description: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      console.log(result);

      setFormData({
        name: '',
        category: '',
        price: '',
        platform: '',
        picture: '',
        description: ''
      });

      setShowModal(false); // Cerrar el modal después de agregar el producto

      Swal.fire({
        icon: "success",
        title: "Producto Agregado",
        text: "El producto ha sido agregado exitosamente",
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el producto. Por favor, intenta de nuevo.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-10 mr-10">
        <button
          className="bg-white hover:bg-pvp-azul-800 text-[#0D0423] font-bold py-2 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-[#9EFB06]"
          onClick={() => setShowModal(true)}
        >
          Agregar Nuevo Producto
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
            <div className="bg-[#311189] rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
              <div className="bg-[#311189] px-6 py-4">
                <div className="text-right">
                  <button
                    className="text-[#9EFB06] text-2xl font-bold"
                    onClick={() => setShowModal(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-[#9EFB06] mb-6">Agregar Nuevo Producto</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="name">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                        placeholder="Nombre del Producto"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="category">
                        Categoría
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                      >
                        <option value="">Selecciona la Categoría</option>
                        <option value="RPG">RPG</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Sports">Sports</option>
                        <option value="Racing">Racing</option>
                        <option value="Simulation">Simulation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="price">
                        Precio
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                        placeholder="Agrega el Precio"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="platform">
                        Plataforma
                      </label>
                      <select
                        name="platform"
                        value={formData.platform}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                      >
                        <option value="">Selecciona la Plataforma</option>
                        <option value="PS4">PS4</option>
                        <option value="PS5">PS5</option>
                        <option value="PC">PC</option>
                        <option value="Xbox One">Xbox One</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="picture">
                        URL de la Imagen
                      </label>
                      <input
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                        placeholder="URL de la Imagen"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9EFB06] mb-1" htmlFor="description">
                        Descripción
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-[#0D0423] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                        placeholder="Breve descripción del juego o producto..."
                        rows="4"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="bg-[#9EFB06] hover:bg-green-700 text-[#0D0423] font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-[#9EFB06]"
                      >
                        Agregar Producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-10'>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductForm;
