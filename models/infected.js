'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Infected extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      Infected.belongsTo(models.City, {
        foreignKey: 'ciudadId',
      })
      Infected.belongsTo(models.Follow_Infeted, {
        foreignKey: 'follow_infetedId',
      })
    }
  }
  Infected.init({
    id_caso: DataTypes.STRING,
    sexo: DataTypes.STRING,
    estado: DataTypes.STRING,
    ubicacion: DataTypes.STRING,
    ciudadId: DataTypes.INTEGER,
    follow_infetedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Infected',
  });
  return Infected;
};