"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../db/config"));
// Definição do modelo ScoreFilme
class ScoreFilme extends sequelize_1.Model {
}
// Inicialização do modelo ScoreFilme
ScoreFilme.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Geração automática de UUID
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER, // Inteiro de 1 a 5
        allowNull: false,
        validate: {
            min: 1, // Valor mínimo 1
            max: 5, // Valor máximo 5
            isInt: true, // Garantir que seja um número inteiro
        },
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Campo opcional
    },
    filmeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Filme', // Referência ao modelo Filme
            key: 'id',
        },
    },
    usuarioId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Usuario', // Referência ao modelo Usuario
            key: 'id',
        },
    },
}, {
    sequelize: config_1.default, // Instância do banco de dados
    modelName: 'ScoreFilme', // Nome do modelo
    freezeTableName: true, // Evitar pluralização do nome da tabela
    timestamps: false // Desabilitar timestamps automáticos
});
exports.default = ScoreFilme;
