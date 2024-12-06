import { Router } from 'express';
import ScoreController from '../controllers/ScoreController';
import { authMiddleware } from '../middlewares/authMiddleware';

// Cria uma instância do roteador do Express
const router = Router();

// Rota para criar um novo score, protegida pelo middleware de autenticação
router.post('/', authMiddleware, ScoreController.create);

// Rota para obter o score de um filme pelo ID do filme
router.get('/score/:filmeId', ScoreController.getScoreByFilmeId);

// Exporta o roteador para ser usado em outras partes da aplicação
export default router;
