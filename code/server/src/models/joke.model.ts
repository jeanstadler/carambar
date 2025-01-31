import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Joke extends Model {
  public id!: number;
  public question!: string;
  public answer!: string;
}

Joke.init(
  {
    // on défini la structure 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // connexion à la base de données !!!
    modelName: 'Joke',
  }
);

export default Joke;