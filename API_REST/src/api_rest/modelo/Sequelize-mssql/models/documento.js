'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cedula, { foreignKey: 'FKIdCedula', as: 'cedula' });
    }
  }
  Documento.init({
    idDocumento: DataTypes.INTEGER,
    nombre: DataTypes.TEXT,
    archivo: DataTypes.BLOB,
    fechaSubida: DataTypes.DATE,
    FKIdCedula: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Documento',
  });
  return Documento;
};