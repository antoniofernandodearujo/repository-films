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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware de autenticação
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtém o token do cabeçalho de autorização
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // Verifica se o token foi fornecido
    if (!token) {
        res.status(403).json({ message: 'Token não fornecido' });
        return;
    }
    try {
        // Verifica e decodifica o token
        const decoded = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
        // Armazena o usuário decodificado em req.user
        req.user = decoded;
        if (!req.user) {
            res.status(401).json({ message: 'Não autorizado' });
            return;
        }
        next();
    }
    catch (err) {
        // Retorna erro de não autorizado se a verificação falhar
        res.status(401).json({ message: 'Não autorizado' });
    }
});
exports.authMiddleware = authMiddleware;
