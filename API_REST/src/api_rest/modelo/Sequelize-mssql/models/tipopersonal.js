'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoPersonal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProcesoContratacion, { foreignKey: 'FKIdTipoPersonal' });
    }
  }
  TipoPersonal.init({
    idTipoPersonal: DataTypes.INTEGER,
    personal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoPersonal',
  });
  return TipoPersonal;
};