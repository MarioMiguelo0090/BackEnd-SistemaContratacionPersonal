'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Documentos', {
      idDocumento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.TEXT
      },
      archivo: {
        type: Sequelize.BLOB
      },
      fechaSubida: {
        type: Sequelize.DATE
      },
      FKIdCedula: {
        type: Sequelize.INTEGER,
        references: { model: 'Cedulas', key: 'idCedula' }
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
    await queryInterface.dropTable('Documentos');
  }
};