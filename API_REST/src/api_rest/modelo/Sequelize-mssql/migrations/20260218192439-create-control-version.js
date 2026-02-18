'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ControlVersions', {
      idControlVersion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FKIdProceso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ProcesoContratacions', key: 'idProceso'}
      },
      nombreCompleto: {
        type: Sequelize.TEXT
      },
      jsonDatos: {
        type: Sequelize.TEXT
      },
      fechaModificacion: {
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
    await queryInterface.dropTable('ControlVersions');
  }
};