import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

// Rota para registrar um novo usuário
router.post('/register', UserController.register);

// Rota para login de usuário
router.post('/login', UserController.login);

// Rota para obter um usuário pelo ID
router.get('/:id', UserController.getUserById);

export default router;
