'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cedula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TipoCedula, { foreignKey: 'FKIdTipoCedula', as: 'tipoCedula' });
      this.belongsTo(models.ProcesoContratacion, { foreignKey: 'FKIdProceso', as: 'proceso' });
      this.belongsTo(models.ClasificacionCedula, { foreignKey: 'FKIdClasificacionCedula', as: 'clasificacion' });
      this.hasMany(models.DetalleCedulaCompetencia, { foreignKey: 'FKIdCedula', as: 'detallesCompetencias' });
      this.hasMany(models.Documento, { foreignKey: 'FKIdCedula', as: 'documentos' });
      this.hasOne(models.Resultado, { foreignKey: 'FKIdCedula', as: 'resultadoPsicometrico' });
    }
  }
  Cedula.init({
    idCedula: DataTypes.INTEGER,
    FKIdTipoCedula: DataTypes.INTEGER,
    FKIdProceso: DataTypes.INTEGER,
    fechaCedulaInterna: DataTypes.DATE,
    fechaCedulaResultados: DataTypes.DATE,
    edad: DataTypes.STRING,
    educacionFormal: DataTypes.TEXT,
    referidoPor: DataTypes.TEXT,
    antecedentesFamiliaresUV: DataTypes.TEXT,
    expectativaLaboral: DataTypes.TEXT,
    experienciaRelacionada: DataTypes.TEXT,
    experiencia: DataTypes.TEXT,
    conclusiones: DataTypes.TEXT,
    resultado: DataTypes.STRING,
    efectoContratacion: DataTypes.TEXT,
    competenciaReforzar: DataTypes.TEXT,
    competenciaDesarrollar: DataTypes.TEXT,
    FKIdClasificacionCedula: DataTypes.INTEGER,
    FKIdResultado: DataTypes.INTEGER,
    motivoCedulaInterna: DataTypes.TEXT,
    motivoCedulaResultados: DataTypes.TEXT,
    puesto: DataTypes.TEXT,
    plaza: DataTypes.TEXT,
    oficioAutorizacionDeOcupacion: DataTypes.TEXT,
    evaluacionConocimientos: DataTypes.TEXT,
    competenciasSobresaliente: DataTypes.TEXT,
    descripcionDesarrollar: DataTypes.TEXT,
    descripcionReforzar: DataTypes.TEXT,
    estado: DataTypes.BOOLEAN,
    aprobadoJefeOficina: DataTypes.BOOLEAN,
    aprobadoDireccion: DataTypes.BOOLEAN,
    archivoAdjunto: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cedula',
  });
  return Cedula;
};