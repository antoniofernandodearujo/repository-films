import { Model, DataTypes } from 'sequelize';
import db from '../db/config';

// Definição do modelo Filme
class Filme extends Model {
    public id!: string;
    public title!: string;
    public description!: string;
    public genre!: string;
    public year_lance!: number;
    public duration!: number;
    public userId!: string;
}

// Inicialização do modelo Filme com seus campos e configurações
Filme.init({
    id: {
        type: DataTypes.UUID, // Tipo UUID para o campo id
        primaryKey: true, // Define como chave primária
        defaultValue: DataTypes.UUIDV4 // Gera automaticamente um UUID v4
    },
    title: {
        type: DataTypes.STRING, // Tipo STRING para o campo title
        allowNull: false // Não permite valores nulos
    },
    description: {
        type: DataTypes.STRING, // Tipo STRING para o campo description
        allowNull: false, // Não permite valores nulos
    },
    year_lance: {
        type: DataTypes.INTEGER, // Tipo INTEGER para o campo year_lance
        allowNull: false, // Não permite valores nulos
    },
    genre: {
        type: DataTypes.STRING, // Tipo STRING para o campo genre
        allowNull: false, // Não permite valores nulos
    },
    duration: {
        type: DataTypes.INTEGER, // Tipo INTEGER para o campo duration
        allowNull: false, // Não permite valores nulos
    },
    userId: {
        type: DataTypes.UUID, // Tipo UUID para o campo userId
        allowNull: false, // Não permite valores nulos
        references: {
            model: 'Usuario', // Referencia o modelo Usuario
            key: 'id' // Chave estrangeira é o campo id do modelo Usuario
        },
    }
},
{
    sequelize: db, // Instância do Sequelize
    modelName: 'Filme', // Nome do modelo
    freezeTableName: true, // Não pluraliza o nome da tabela
    timestamps: false // Desativa os timestamps automáticos
});

export default Filme;
