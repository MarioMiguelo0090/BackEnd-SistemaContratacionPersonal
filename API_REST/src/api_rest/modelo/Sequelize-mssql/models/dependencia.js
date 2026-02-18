'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dependencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ProcesoContratacion, { foreignKey: 'FKIdDependencia' });
    }
  }
  Dependencia.init({
    idDependencia: DataTypes.INTEGER,
    numDependencia: DataTypes.STRING,
    nombre: DataTypes.TEXT,
    area: DataTypes.TEXT,
    zona: DataTypes.STRING,
    subzona: DataTypes.STRING,
    areaOrganizacional: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Dependencia',
  });
  return Dependencia;
};