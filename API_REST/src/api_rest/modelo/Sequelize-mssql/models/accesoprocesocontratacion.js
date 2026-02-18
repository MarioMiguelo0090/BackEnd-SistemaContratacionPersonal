'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccesoProcesoContratacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AccesoProcesoContratacion.init({
    dAccesoProcesoContratacion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AccesoProcesoContratacion',
  });
  return AccesoProcesoContratacion;
};