'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelacionAccesoProcesoContratacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ProcesoContratacion, { foreignKey: 'FKIdProceso', as: 'proceso' });
      this.belongsTo(models.Acceso, { foreignKey: 'FKIdAcceso', as: 'usuario' });
    }
  }
  RelacionAccesoProcesoContratacion.init({
    IdRelacionAccesoProcesoContratacion: DataTypes.INTEGER,
    FKIdProceso: DataTypes.INTEGER,
    FKIdAcceso: DataTypes.INTEGER,
    asignado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RelacionAccesoProcesoContratacion',
  });
  return RelacionAccesoProcesoContratacion;
};