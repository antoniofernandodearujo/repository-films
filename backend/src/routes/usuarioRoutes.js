"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = (0, express_1.Router)();
// Rota para registrar um novo usuário
router.post('/register', UserController_1.default.register);
// Rota para login de usuário
router.post('/login', UserController_1.default.login);
// Rota para obter um usuário pelo ID
router.get('/:id', UserController_1.default.getUserById);
exports.default = router;
