'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TemporalDefinitiva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProcesoContratacion, { foreignKey: 'FKIdTemporalDefinitiva' });
    }
  }
  TemporalDefinitiva.init({
    idTemporalDefinitiva: DataTypes.INTEGER,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TemporalDefinitiva',
  });
  return TemporalDefinitiva;
};