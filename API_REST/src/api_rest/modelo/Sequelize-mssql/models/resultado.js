'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resultado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cedula, { foreignKey: 'FKIdCedula', as: 'cedula' });
    }
  }
  Resultado.init({
    idResultado: DataTypes.INTEGER,
    FKIdCedula: DataTypes.INTEGER,
    psicometriaComunicacion: DataTypes.FLOAT,
    psicometriaTrabajoEnEquipo: DataTypes.FLOAT,
    psicometriaOrientacionAlServicio: DataTypes.FLOAT,
    psicometriaSensibilidadALineamientos: DataTypes.FLOAT,
    psicometriaPlaneacionOrganizacion: DataTypes.FLOAT,
    psicometriaAnalisisProblemas: DataTypes.FLOAT,
    psicometriaEnfoqueResultados: DataTypes.FLOAT,
    psicometriaControlActividades: DataTypes.FLOAT,
    psicometriaEnfoqueCalidad: DataTypes.FLOAT,
    psicometriaRelacionesInterpersonales: DataTypes.FLOAT,
    psicometriaLiderazgo: DataTypes.FLOAT,
    psicometriaTomaDecisiones: DataTypes.FLOAT,
    psicometriaDinamismo: DataTypes.FLOAT,
    psicometriaInnovacion: DataTypes.FLOAT,
    psicometriaPensamientoEstrategico: DataTypes.FLOAT,
    psicometriaNegociacion: DataTypes.FLOAT,
    resultadoPorcentaje: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resultado',
  });
  return Resultado;
};