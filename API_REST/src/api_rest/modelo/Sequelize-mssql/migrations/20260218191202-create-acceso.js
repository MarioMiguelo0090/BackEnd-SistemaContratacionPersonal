'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accesos', {
      idAcceso: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario: {
        type: Sequelize.STRING
      },
      contrasenia: {
        type: Sequelize.STRING
      },
      FKIdTipoAcceso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TipoAccesos',
          key: 'idTipoAcceso'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      },
      nombre: {
        type: Sequelize.STRING
      },
      primerApellido: {
        type: Sequelize.STRING
      },
      segundoApellido: {
        type: Sequelize.STRING
      },
      estado: {
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
    await queryInterface.dropTable('Accesos');
  }
};