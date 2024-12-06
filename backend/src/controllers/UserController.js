"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    // Método para registrar um novo usuário
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, email, password } = req.body;
                // Verifique se os dados do corpo estão corretos
                if (!nome || !email || !password) {
                    res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
                    return;
                }
                // Criptografa a senha
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const usuario = yield User_1.default.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
                // Gere o token JWT
                const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
                // Retorne o usuário e o token
                res.status(201).json({ usuario, token });
            }
            catch (error) {
                console.error(error); // Para fins de depuração
                res.status(500).json({ message: error instanceof Error ? error.message : 'Erro desconhecido' });
            }
        });
    }
    // Método para login de usuário
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log('Tentando logar usuário:', email); // Log do email
            const usuario = yield User_1.default.findOne({ where: { email } });
            if (!usuario) {
                console.log('Usuário não encontrado'); // Log se não encontrar usuário
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }
            const match = yield bcryptjs_1.default.compare(password, usuario.password);
            if (!match) {
                console.log('Senha não coincide'); // Log se a senha não for válida
                res.status(401).json({ message: 'Credenciais inválidas' });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: usuario.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
            console.log('Token gerado com sucesso:', token); // Log do token gerado
            res.status(200).json({ id: usuario.id, token });
        });
    }
    // Método para obter usuário por ID
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield User_1.default.findByPk(id);
            if (!usuario) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            res.json({ nome: usuario.nome });
        });
    }
}
exports.default = new UserController();
