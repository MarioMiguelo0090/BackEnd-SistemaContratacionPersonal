'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProcesoContratacions', {
      idProceso: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      folio: {
        type: Sequelize.TEXT
      },
      numPlaza: {
        type: Sequelize.STRING
      },
      fechaRecibido: {
        type: Sequelize.DATE
      },
      fechaEntrevista: {
        type: Sequelize.DATE
      },
      resultadoEvaluacionConocimiento: {
        type: Sequelize.TEXT
      },
      fechaEnvioDEyDP: {
        type: Sequelize.DATE
      },
      fechaNotificacion: {
        type: Sequelize.DATE
      },
      categoriaPuestoOrigen: {
        type: Sequelize.STRING
      },
      diasProceso: {
        type: Sequelize.STRING
      },
      beneficiado: {
        type: Sequelize.BOOLEAN
      },
      FKIdTipoProceso: {
        type: Sequelize.INTEGER,
        references: { model: 'TipoProcesos', key: 'idTipoProceso' }
      },
      FKIdTipoPersonal: {
        type: Sequelize.INTEGER,
        references: { model: 'TipoPersonals', key: 'idTipoPersonal' }
      },
      FKIdEstadoProcesoContratacion: {
        type: Sequelize.INTEGER,
        references: { model: 'EstadoProcesoContratacions', key: 'idEstadoProcesoContratacion' }
      },
      FKIdTemporalDefinitiva: {
        type: Sequelize.INTEGER,
        references: { model: 'TemporalDefinitivas', key: 'idTemporalDefinitiva' }
      },
      FKIdDependencia: {
        type: Sequelize.INTEGER,
        references: { model: 'Dependencias', key: 'idDependencia' }
      },
      hermesNotificacion: {
        type: Sequelize.TEXT
      },
      titularPlaza: {
        type: Sequelize.TEXT
      },
      lineamientoOficioContinuidad: {
        type: Sequelize.TEXT
      },
      motivo: {
        type: Sequelize.TEXT
      },
      fechaElaboracionPropuesta: {
        type: Sequelize.DATE
      },
      fechaLiberacionOficio: {
        type: Sequelize.DATE
      },
      periodoAutorizadoOficioInicio: {
        type: Sequelize.DATE
      },
      periodoAutorizadoOficioFin: {
        type: Sequelize.DATE
      },
      categoriaAutorizadaOficio: {
        type: Sequelize.TEXT
      },
      observaciones: {
        type: Sequelize.TEXT
      },
      numCarpeta: {
        type: Sequelize.STRING
      },
      nombreCandidato: {
        type: Sequelize.STRING
      },
      funcionDesempeniar: {
        type: Sequelize.TEXT
      },
      familiaFuncional: {
        type: Sequelize.TEXT
      },
      fechaEvaluacionCompetencias: {
        type: Sequelize.DATE
      },
      fechaInicioProcesamiento: {
        type: Sequelize.DATE
      },
      resultadoEvaluacionCompetencias: {
        type: Sequelize.STRING
      },
      experienciaLaboralSolicitada: {
        type: Sequelize.STRING
      },
      resultadoReferenciasLaborales: {
        type: Sequelize.STRING
      },
      fechaEnvioEvaluacionDesempenio: {
        type: Sequelize.DATE
      },
      fechaEntregaEvaluacionDesempenio: {
        type: Sequelize.DATE
      },
      resultadoEvaluacionDesempenio: {
        type: Sequelize.STRING
      },
      resultadoHabilidadesWord: {
        type: Sequelize.STRING
      },
      resultadoHabilidadesExcel: {
        type: Sequelize.STRING
      },
      resultadoOrtografia: {
        type: Sequelize.STRING
      },
      resultadoProcesoEvaluacion: {
        type: Sequelize.STRING
      },
      fechaRevisionOfiEval: {
        type: Sequelize.DATE
      },
      observacionesAnalista: {
        type: Sequelize.TEXT
      },
      consecutivoExpediente: {
        type: Sequelize.STRING
      },
      seguimientoEvaluacionDesempenio: {
        type: Sequelize.BOOLEAN
      },
      fechaEvaluacionDesempenio: {
        type: Sequelize.DATE
      },
      resultadoSeguimientoEvaluacionDesempenio: {
        type: Sequelize.STRING
      },
      FKIdAcceso: {
        type: Sequelize.INTEGER,
        references: { model: 'Accesos', key: 'idAcceso' }
      },
      autorizacion: {
        type: Sequelize.BOOLEAN
      },
      educacionFormal: {
        type: Sequelize.TEXT
      },
      avaladoPor: {
        type: Sequelize.TEXT
      },
      fechaAsignacionAnalista: {
        type: Sequelize.DATE
      },
      capacitado: {
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
    await queryInterface.dropTable('ProcesoContratacions');
  }
};