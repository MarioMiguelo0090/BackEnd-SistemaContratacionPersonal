'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoProceso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProcesoContratacion, { foreignKey: 'FKIdTipoProceso' });
    }
  }
  TipoProceso.init({
    idTipoProceso: DataTypes.INTEGER,
    proceso: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoProceso',
  });
  return TipoProceso;
};