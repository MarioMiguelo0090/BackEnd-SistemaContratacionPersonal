'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeguimientoHermes', {
      idSeguimiento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      folio: {
        type: Sequelize.TEXT
      },
      fechaRecepcion: {
        type: Sequelize.TEXT
      },
      importancia: {
        type: Sequelize.TEXT
      },
      tipoEnvio: {
        type: Sequelize.TEXT
      },
      requiereRespuesta: {
        type: Sequelize.BOOLEAN
      },
      solicita: {
        type: Sequelize.TEXT
      },
      entidadDependencia: {
        type: Sequelize.TEXT
      },
      asunto: {
        type: Sequelize.TEXT
      },
      estatus: {
        type: Sequelize.TEXT
      },
      acciones: {
        type: Sequelize.TEXT
      },
      estadoArchivado: {
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
    await queryInterface.dropTable('SeguimientoHermes');
  }
};