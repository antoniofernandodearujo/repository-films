"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../db/config"));
// Definição do modelo Usuario
class Usuario extends sequelize_1.Model {
}
// Inicialização do modelo Usuario com suas propriedades
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // Tipo UUID
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Valor padrão gerado automaticamente
        primaryKey: true, // Chave primária
    },
    nome: {
        type: sequelize_1.DataTypes.STRING, // Tipo string
        allowNull: false, // Não permite valor nulo
    },
    email: {
        type: sequelize_1.DataTypes.STRING, // Tipo string
        allowNull: false, // Não permite valor nulo
        unique: true, // Valor único
    },
    password: {
        type: sequelize_1.DataTypes.STRING, // Tipo string
        allowNull: false, // Não permite valor nulo
    },
}, {
    sequelize: config_1.default, // Instância do banco de dados
    modelName: 'Usuario', // Nome do modelo
    freezeTableName: true, // Congela o nome da tabela
    timestamps: false, // Desativa timestamps
});
exports.default = Usuario;
