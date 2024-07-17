import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AiFillDelete } from 'react-icons/ai';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/product');
            if (!response.ok) {
                throw new Error('Error al obtener los productos');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/product/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const columns = [
        {
            name: 'Picture',
            selector: row => row.picture,
            cell: row => <img src={row.picture} alt={row.name} width={50} height={50} />,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            format: row => `$${row.price.toFixed(2)}`,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Platform',
            selector: row => row.platform,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <button onClick={() => handleDeleteProduct(row._id)} className="btn-delete">
                    <AiFillDelete />
                </button>
            ),
        },
    ];

    return (
        <>
            <DataTable
                columns={columns}
                data={products}
                pagination
                paginationPerPage={10} 
                paginationRowsPerPageOptions={[10, 20, 30]} 
                striped
                highlightOnHover 
            />
        </>
    );
};

export default ProductTable;
