import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js'

const router = Router();

router.post('/api/product', createProduct);
router.get('/api/product', getProducts);
router.delete('/api/product/:id', deleteProduct);
router.get('/api/product/:id', getProductById);
router.put('/api/product/:id', updateProduct);
export default router;

