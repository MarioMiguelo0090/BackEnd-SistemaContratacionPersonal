'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.DetalleCedulaCompetencia, { foreignKey: 'FKIdCompetencia', as: 'evaluacionesCedula' });
      this.hasMany(models.DetalleClasificacionCedulaCompetencia, { foreignKey: 'FKIdCompetencia', as: 'perfilesClasificacion' });
    }
  }
  Competencia.init({
    idCompetencia: DataTypes.INTEGER,
    nombre: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Competencia',
  });
  return Competencia;
};