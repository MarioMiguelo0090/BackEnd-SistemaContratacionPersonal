'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RelacionAccesoProcesoContratacions', {
      IdRelacionAccesoProcesoContratacion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FKIdProceso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ProcesoContratacions', key: 'idProceso' }
      },
      FKIdAcceso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Accesos', key: 'idAcceso' }
      },
      asignado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('RelacionAccesoProcesoContratacions');
  }
};