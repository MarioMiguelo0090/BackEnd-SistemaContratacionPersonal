'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Resultados', {
      idResultado: {
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
      psicometriaComunicacion: {
        type: Sequelize.FLOAT
      },
      psicometriaTrabajoEnEquipo: {
        type: Sequelize.FLOAT
      },
      psicometriaOrientacionAlServicio: {
        type: Sequelize.FLOAT
      },
      psicometriaSensibilidadALineamientos: {
        type: Sequelize.FLOAT
      },
      psicometriaPlaneacionOrganizacion: {
        type: Sequelize.FLOAT
      },
      psicometriaAnalisisProblemas: {
        type: Sequelize.FLOAT
      },
      psicometriaEnfoqueResultados: {
        type: Sequelize.FLOAT
      },
      psicometriaControlActividades: {
        type: Sequelize.FLOAT
      },
      psicometriaEnfoqueCalidad: {
        type: Sequelize.FLOAT
      },
      psicometriaRelacionesInterpersonales: {
        type: Sequelize.FLOAT
      },
      psicometriaLiderazgo: {
        type: Sequelize.FLOAT
      },
      psicometriaTomaDecisiones: {
        type: Sequelize.FLOAT
      },
      psicometriaDinamismo: {
        type: Sequelize.FLOAT
      },
      psicometriaInnovacion: {
        type: Sequelize.FLOAT
      },
      psicometriaPensamientoEstrategico: {
        type: Sequelize.FLOAT
      },
      psicometriaNegociacion: {
        type: Sequelize.FLOAT
      },
      resultadoPorcentaje: {
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
    await queryInterface.dropTable('Resultados');
  }
};