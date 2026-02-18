'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Acceso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TipoAcceso, { foreignKey: 'FKIdTipoAcceso', as: 'tipoAcceso' });
      this.hasMany(models.ProcesoContratacion, { foreignKey: 'FKIdAcceso', as: 'procesosCreados' });
      this.hasMany(models.RelacionAccesoProcesoContratacion, { foreignKey: 'FKIdAcceso', as: 'asignaciones' });
    }
  }
  Acceso.init({
    idAcceso: DataTypes.INTEGER,
    usuario: DataTypes.STRING,
    contrasenia: DataTypes.STRING,
    FKIdTipoAcceso: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    primerApellido: DataTypes.STRING,
    segundoApellido: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Acceso',
  });
  return Acceso;
};