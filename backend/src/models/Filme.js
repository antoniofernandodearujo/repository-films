"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../db/config"));
// Definição do modelo Filme
class Filme extends sequelize_1.Model {
}
// Inicialização do modelo Filme com seus campos e configurações
Filme.init({
    id: {
        type: sequelize_1.DataTypes.UUID, // Tipo UUID para o campo id
        primaryKey: true, // Define como chave primária
        defaultValue: sequelize_1.DataTypes.UUIDV4 // Gera automaticamente um UUID v4
    },
    title: {
        type: sequelize_1.DataTypes.STRING, // Tipo STRING para o campo title
        allowNull: false // Não permite valores nulos
    },
    description: {
        type: sequelize_1.DataTypes.STRING, // Tipo STRING para o campo description
        allowNull: false, // Não permite valores nulos
    },
    year_lance: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo INTEGER para o campo year_lance
        allowNull: false, // Não permite valores nulos
    },
    genre: {
        type: sequelize_1.DataTypes.STRING, // Tipo STRING para o campo genre
        allowNull: false, // Não permite valores nulos
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER, // Tipo INTEGER para o campo duration
        allowNull: false, // Não permite valores nulos
    },
    userId: {
        type: sequelize_1.DataTypes.UUID, // Tipo UUID para o campo userId
        allowNull: false, // Não permite valores nulos
        references: {
            model: 'Usuario', // Referencia o modelo Usuario
            key: 'id' // Chave estrangeira é o campo id do modelo Usuario
        },
    }
}, {
    sequelize: config_1.default, // Instância do Sequelize
    modelName: 'Filme', // Nome do modelo
    freezeTableName: true, // Não pluraliza o nome da tabela
    timestamps: false // Desativa os timestamps automáticos
});
exports.default = Filme;
