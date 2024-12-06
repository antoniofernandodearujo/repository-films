import { Router } from 'express';
import FilmeController from '../controllers/FilmeController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rota para criar um novo filme, requer autenticação
router.post('/', authMiddleware, FilmeController.create);

// Rota para atualizar um filme existente pelo ID, requer autenticação
router.patch('/:id', authMiddleware, FilmeController.update);

// Rota para listar todos os filmes
router.get('/', FilmeController.list);

// Rota para listar filmes por usuário, requer autenticação
router.get('/user', authMiddleware, FilmeController.listByUser);

// Rota para remover um filme pelo ID, requer autenticação
router.delete('/:id', authMiddleware, FilmeController.remove);

// Rota para buscar filmes
router.post('/search', FilmeController.search);

// Rota para obter filmes recomendados
router.get('/recommended', FilmeController.getRecommended);

export default router;
