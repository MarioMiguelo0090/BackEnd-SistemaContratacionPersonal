'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeguimientoHermes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeguimientoHermes.init({
    idSeguimiento: DataTypes.INTEGER,
    folio: DataTypes.TEXT,
    fechaRecepcion: DataTypes.TEXT,
    importancia: DataTypes.TEXT,
    tipoEnvio: DataTypes.TEXT,
    requiereRespuesta: DataTypes.BOOLEAN,
    solicita: DataTypes.TEXT,
    entidadDependencia: DataTypes.TEXT,
    asunto: DataTypes.TEXT,
    estatus: DataTypes.TEXT,
    acciones: DataTypes.TEXT,
    estadoArchivado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SeguimientoHermes',
  });
  return SeguimientoHermes;
};