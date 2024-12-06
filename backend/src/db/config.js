"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente do arquivo .env
dotenv_1.default.config();
// Verifique se as variáveis de ambiente estão definidas
if (!process.env.DB_URL || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_HOST || !process.env.POSTGRES_PORT) {
    throw new Error('Por favor, defina todas as variáveis de ambiente necessárias.');
}
// Configuração do Sequelize com PostgreSQL
const dbUrl = process.env.DB_URL;
const bd = new sequelize_1.Sequelize(dbUrl, {
    dialect: 'postgres', // Use 'postgres' diretamente
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT), // Certifique-se de converter para número
});
exports.default = bd;
