import Product from '../models/product.model.js';

export const createProduct = async (req, res) => {
    const { price, category, name, description, picture, platform } = req.body;

    try {
        const newProduct = new Product({
            price,
            category,
            name,
            description,
            picture,
            platform
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            message: 'Producto creado exitosamente ',
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al registrar producto ',
            error: error.message
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json({
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    const { price, category, name, description, picture } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { price, category, name, description, picture },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            });
        }

        res.json({
            message: 'Producto actualizado exitosamente',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el producto',
            error: error.message
        });
    }
};