'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow_Infeted extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Follow_Infeted.init({
    fecha_reporte: DataTypes.DATE,
    fecha_notificacion: DataTypes.DATE,
    fecha_sintomas: DataTypes.DATE,
    fecha_diagnostico: DataTypes.DATE,
    fecha_recuperacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Follow_Infeted',
  });
  return Follow_Infeted;
};