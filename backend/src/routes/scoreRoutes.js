"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ScoreController_1 = __importDefault(require("../controllers/ScoreController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
// Cria uma instância do roteador do Express
const router = (0, express_1.Router)();
// Rota para criar um novo score, protegida pelo middleware de autenticação
router.post('/', authMiddleware_1.authMiddleware, ScoreController_1.default.create);
// Rota para obter o score de um filme pelo ID do filme
router.get('/score/:filmeId', ScoreController_1.default.getScoreByFilmeId);
// Exporta o roteador para ser usado em outras partes da aplicação
exports.default = router;
