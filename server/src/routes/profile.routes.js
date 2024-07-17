import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/profile.controller.js';
const router = Router();

router.post('/api/profile', createUser);

router.get('/api/profile', getAllUsers);

router.get('/api/profile/:id', getUserById);

router.delete('/api/profile/:id', deleteUser);

router.put('/api/profile/:id', updateUser);

export default router;
