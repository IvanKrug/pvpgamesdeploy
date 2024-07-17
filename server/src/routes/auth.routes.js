import { Router } from 'express';
import { login, register, logout, profile,} from '../controllers/auth.controller.js';
import { autRequierd } from '../middlewares/validateToken.js'
const router = Router()

router.post('/api/register', register);

router.post('/api/login', login);

router.post('/api/logout', logout);

router.get('/api/profile', autRequierd, profile);

export default router;

