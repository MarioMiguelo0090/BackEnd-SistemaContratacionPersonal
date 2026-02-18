'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClasificacionCedula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cedula, { foreignKey: 'FKIdClasificacionCedula', as: 'cedulas' });
      this.hasMany(models.DetalleClasificacionCedulaCompetencia, { foreignKey: 'FKIdClasificacionCedula', as: 'competenciasRequeridas' });
    }
  }
  ClasificacionCedula.init({
    idClasificacionCedulas: DataTypes.INTEGER,
    numCedula: DataTypes.INTEGER,
    nombre: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ClasificacionCedula',
  });
  return ClasificacionCedula;
};