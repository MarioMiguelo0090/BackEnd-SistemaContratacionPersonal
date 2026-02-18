'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProcesoContratacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TipoProceso, { foreignKey: 'FKIdTipoProceso', as: 'tipoProceso' });
      this.belongsTo(models.TipoPersonal, { foreignKey: 'FKIdTipoPersonal', as: 'tipoPersonal' });
      this.belongsTo(models.EstadoProcesoContratacion, { foreignKey: 'FKIdEstadoProcesoContratacion', as: 'estadoProceso' });
      this.belongsTo(models.TemporalDefinitiva, { foreignKey: 'FKIdTemporalDefinitiva', as: 'temporalidad' });
      this.belongsTo(models.Dependencia, { foreignKey: 'FKIdDependencia', as: 'dependencia' });
      this.belongsTo(models.Acceso, { foreignKey: 'FKIdAcceso', as: 'analistaResponsable' });
      this.hasMany(models.Cedula, { foreignKey: 'FKIdProceso', as: 'cedulas' });
      this.hasMany(models.ControlVersion, { foreignKey: 'FKIdProceso', as: 'historialVersiones' });
      this.hasMany(models.RelacionAccesoProcesoContratacion, { foreignKey: 'FKIdProceso', as: 'analistasAsignados' });
    }
  }
  ProcesoContratacion.init({
    idProceso: DataTypes.INTEGER,
    folio: DataTypes.TEXT,
    numPlaza: DataTypes.STRING,
    fechaRecibido: DataTypes.DATE,
    fechaEntrevista: DataTypes.DATE,
    resultadoEvaluacionConocimiento: DataTypes.TEXT,
    fechaEnvioDEyDP: DataTypes.DATE,
    fechaNotificacion: DataTypes.DATE,
    categoriaPuestoOrigen: DataTypes.STRING,
    diasProceso: DataTypes.STRING,
    beneficiado: DataTypes.BOOLEAN,
    FKIdTipoProceso: DataTypes.INTEGER,
    FKIdTipoPersonal: DataTypes.INTEGER,
    FKIdEstadoProcesoContratacion: DataTypes.INTEGER,
    FKIdTemporalDefinitiva: DataTypes.INTEGER,
    FKIdDependencia: DataTypes.INTEGER,
    hermesNotificacion: DataTypes.TEXT,
    titularPlaza: DataTypes.TEXT,
    lineamientoOficioContinuidad: DataTypes.TEXT,
    motivo: DataTypes.TEXT,
    fechaElaboracionPropuesta: DataTypes.DATE,
    fechaLiberacionOficio: DataTypes.DATE,
    periodoAutorizadoOficioInicio: DataTypes.DATE,
    periodoAutorizadoOficioFin: DataTypes.DATE,
    categoriaAutorizadaOficio: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    numCarpeta: DataTypes.STRING,
    nombreCandidato: DataTypes.STRING,
    funcionDesempeniar: DataTypes.TEXT,
    familiaFuncional: DataTypes.TEXT,
    fechaEvaluacionCompetencias: DataTypes.DATE,
    fechaInicioProcesamiento: DataTypes.DATE,
    resultadoEvaluacionCompetencias: DataTypes.STRING,
    experienciaLaboralSolicitada: DataTypes.STRING,
    resultadoReferenciasLaborales: DataTypes.STRING,
    fechaEnvioEvaluacionDesempenio: DataTypes.DATE,
    fechaEntregaEvaluacionDesempenio: DataTypes.DATE,
    resultadoEvaluacionDesempenio: DataTypes.STRING,
    resultadoHabilidadesWord: DataTypes.STRING,
    resultadoHabilidadesExcel: DataTypes.STRING,
    resultadoOrtografia: DataTypes.STRING,
    resultadoProcesoEvaluacion: DataTypes.STRING,
    fechaRevisionOfiEval: DataTypes.DATE,
    observacionesAnalista: DataTypes.TEXT,
    consecutivoExpediente: DataTypes.STRING,
    seguimientoEvaluacionDesempenio: DataTypes.BOOLEAN,
    fechaEvaluacionDesempenio: DataTypes.DATE,
    resultadoSeguimientoEvaluacionDesempenio: DataTypes.STRING,
    FKIdAcceso: DataTypes.INTEGER,
    autorizacion: DataTypes.BOOLEAN,
    educacionFormal: DataTypes.TEXT,
    avaladoPor: DataTypes.TEXT,
    fechaAsignacionAnalista: DataTypes.DATE,
    capacitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ProcesoContratacion',
  });
  return ProcesoContratacion;
};