'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleCedulaCompetencia', {
      idDetalleCedulaCompetencia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FKIdCedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Cedulas', key: 'idCedula' }
      },
      FKIdCompetencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Competencias', key: 'idCompetencia' }
      },
      psicometria: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('DetalleCedulaCompetencia');
  }
};