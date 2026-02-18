'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Dependencia', {
      idDependencia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numDependencia: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.TEXT
      },
      area: {
        type: Sequelize.TEXT
      },
      zona: {
        type: Sequelize.STRING
      },
      subzona: {
        type: Sequelize.STRING
      },
      areaOrganizacional: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Dependencia');
  }
};