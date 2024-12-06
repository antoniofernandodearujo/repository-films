"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FilmeController_1 = __importDefault(require("../controllers/FilmeController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rota para criar um novo filme, requer autenticação
router.post('/', authMiddleware_1.authMiddleware, FilmeController_1.default.create);
// Rota para atualizar um filme existente pelo ID, requer autenticação
router.patch('/:id', authMiddleware_1.authMiddleware, FilmeController_1.default.update);
// Rota para listar todos os filmes
router.get('/', FilmeController_1.default.list);
// Rota para listar filmes por usuário, requer autenticação
router.get('/user', authMiddleware_1.authMiddleware, FilmeController_1.default.listByUser);
// Rota para remover um filme pelo ID, requer autenticação
router.delete('/:id', authMiddleware_1.authMiddleware, FilmeController_1.default.remove);
// Rota para buscar filmes
router.post('/search', FilmeController_1.default.search);
// Rota para obter filmes recomendados
router.get('/recommended', FilmeController_1.default.getRecommended);
exports.default = router;
