'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoCedula extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cedula, { foreignKey: 'FKIdTipoCedula' });
    }
  }
  TipoCedula.init({
    idTipoCedula: DataTypes.INTEGER,
    cedula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TipoCedula',
  });
  return TipoCedula;
};