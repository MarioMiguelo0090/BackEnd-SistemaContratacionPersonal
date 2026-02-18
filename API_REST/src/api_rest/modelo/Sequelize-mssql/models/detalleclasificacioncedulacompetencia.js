'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleClasificacionCedulaCompetencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetalleClasificacionCedulaCompetencia.init({
    FKIdClasificacionCedula: DataTypes.INTEGER,
    FKIdCompetencia: DataTypes.INTEGER,
    perfil: DataTypes.INTEGER,
    IdDetalleClasificacionCedulaCompetencia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleClasificacionCedulaCompetencia',
  });
  return DetalleClasificacionCedulaCompetencia;
};