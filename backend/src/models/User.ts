import { Model, DataTypes } from 'sequelize';
import db from '../db/config';

// Definição do modelo Usuario
class Usuario extends Model {
  public id!: string; // UUID como string
  public nome!: string; // Nome do usuário
  public email!: string; // Email do usuário
  public password!: string; // Senha do usuário
}

// Inicialização do modelo Usuario com suas propriedades
Usuario.init(
  {
    id: {
      type: DataTypes.UUID, // Tipo UUID
      defaultValue: DataTypes.UUIDV4, // Valor padrão gerado automaticamente
      primaryKey: true, // Chave primária
    },
    nome: {
      type: DataTypes.STRING, // Tipo string
      allowNull: false, // Não permite valor nulo
    },
    email: {
      type: DataTypes.STRING, // Tipo string
      allowNull: false, // Não permite valor nulo
      unique: true, // Valor único
    },
    password: {
      type: DataTypes.STRING, // Tipo string
      allowNull: false, // Não permite valor nulo
    },
  },
  {
    sequelize: db, // Instância do banco de dados
    modelName: 'Usuario', // Nome do modelo
    freezeTableName: true, // Congela o nome da tabela
    timestamps: false, // Desativa timestamps
  }
);

export default Usuario;
