import { Model, DataTypes } from 'sequelize';
import db from '../db/config';

// Definição do modelo ScoreFilme
class ScoreFilme extends Model {
    public id!: string;
    public score!: number;
    public comentario?: string; // Novo campo opcional de comentário
    public filmeId!: string;
    public usuarioId!: string;
}

// Inicialização do modelo ScoreFilme
ScoreFilme.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, // Geração automática de UUID
    },
    score: {
        type: DataTypes.INTEGER, // Inteiro de 1 a 5
        allowNull: false,
        validate: {
            min: 1, // Valor mínimo 1
            max: 5, // Valor máximo 5
            isInt: true, // Garantir que seja um número inteiro
        },
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: true, // Campo opcional
    },
    filmeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Filme', // Referência ao modelo Filme
            key: 'id',
        },
    },
    usuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Usuario', // Referência ao modelo Usuario
            key: 'id',
        },
    },
}, {
    sequelize: db, // Instância do banco de dados
    modelName: 'ScoreFilme', // Nome do modelo
    freezeTableName: true, // Evitar pluralização do nome da tabela
    timestamps: false // Desabilitar timestamps automáticos
});

export default ScoreFilme;
