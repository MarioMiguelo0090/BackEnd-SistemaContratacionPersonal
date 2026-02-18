'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleClasificacionCedulaCompetencia', {
      IdDetalleClasificacionCedulaCompetencia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FKIdClasificacionCedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ClasificacionCedulas', key: 'idClasificacionCedulas' }
      },
      FKIdCompetencia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Competencias', key: 'idCompetencia' }
      },
      perfil: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('DetalleClasificacionCedulaCompetencia');
  }
};