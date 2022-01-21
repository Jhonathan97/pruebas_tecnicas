'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Follow_Infeteds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_reporte: {
        type: Sequelize.DATE
      },
      fecha_notificacion: {
        type: Sequelize.DATE
      },
      fecha_sintomas: {
        type: Sequelize.DATE
      },
      fecha_diagnostico: {
        type: Sequelize.DATE
      },
      fecha_recuperacion: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Follow_Infeteds');
  }
};