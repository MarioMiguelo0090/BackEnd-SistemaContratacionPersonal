'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ControlVersion.init({
    idControlVersion: DataTypes.INTEGER,
    FKIdProceso: DataTypes.INTEGER,
    nombreCompleto: DataTypes.TEXT,
    jsonDatos: DataTypes.TEXT,
    fechaModificacion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ControlVersion',
  });
  return ControlVersion;
};