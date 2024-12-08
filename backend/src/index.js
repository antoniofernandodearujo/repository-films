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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const filmeRoutes_1 = __importDefault(require("./routes/filmeRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const scoreRoutes_1 = __importDefault(require("./routes/scoreRoutes"));
const config_1 = __importDefault(require("./db/config"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Middleware para habilitar CORS
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// Middleware para parsear o corpo das requisições como JSON
app.use(body_parser_1.default.json());
// Rotas da aplicação
app.use('/api/filmes', filmeRoutes_1.default);
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/avaliacoes', scoreRoutes_1.default);
// Função para iniciar o servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Sincroniza o banco de dados
        yield config_1.default.sync();
        // Inicia o servidor na porta especificada
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log('Unable to connect to the database:', error);
    }
});
// Inicia o servidor
startServer();
