'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cedulas', {
      idCedula: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      FKIdTipoCedula: {
        type: Sequelize.INTEGER,
        references: { model: 'TipoCedulas', key: 'idTipoCedula' }
      },
      FKIdProceso: {
        type: Sequelize.INTEGER,
        references: { model: 'ProcesoContratacions', key: 'idProceso' }
      },
      fechaCedulaInterna: {
        type: Sequelize.DATE
      },
      fechaCedulaResultados: {
        type: Sequelize.DATE
      },
      edad: {
        type: Sequelize.STRING
      },
      educacionFormal: {
        type: Sequelize.TEXT
      },
      referidoPor: {
        type: Sequelize.TEXT
      },
      antecedentesFamiliaresUV: {
        type: Sequelize.TEXT
      },
      expectativaLaboral: {
        type: Sequelize.TEXT
      },
      experienciaRelacionada: {
        type: Sequelize.TEXT
      },
      experiencia: {
        type: Sequelize.TEXT
      },
      conclusiones: {
        type: Sequelize.TEXT
      },
      resultado: {
        type: Sequelize.STRING
      },
      efectoContratacion: {
        type: Sequelize.TEXT
      },
      competenciaReforzar: {
        type: Sequelize.TEXT
      },
      competenciaDesarrollar: {
        type: Sequelize.TEXT
      },
      FKIdClasificacionCedula: {
        type: Sequelize.INTEGER,
        references: { model: 'ClasificacionCedulas', key: 'idClasificacionCedulas' }
      },
      FKIdResultado: {
        type: Sequelize.INTEGER,
        references: { model: 'Resultados', key: 'idResultado' }
      },
      motivoCedulaInterna: {
        type: Sequelize.TEXT
      },
      motivoCedulaResultados: {
        type: Sequelize.TEXT
      },
      puesto: {
        type: Sequelize.TEXT
      },
      plaza: {
        type: Sequelize.TEXT
      },
      oficioAutorizacionDeOcupacion: {
        type: Sequelize.TEXT
      },
      evaluacionConocimientos: {
        type: Sequelize.TEXT
      },
      competenciasSobresaliente: {
        type: Sequelize.TEXT
      },
      descripcionDesarrollar: {
        type: Sequelize.TEXT
      },
      descripcionReforzar: {
        type: Sequelize.TEXT
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      aprobadoJefeOficina: {
        type: Sequelize.BOOLEAN
      },
      aprobadoDireccion: {
        type: Sequelize.BOOLEAN
      },
      archivoAdjunto: {
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
    await queryInterface.dropTable('Cedulas');
  }
};