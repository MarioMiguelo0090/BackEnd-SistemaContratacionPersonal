'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleCedulaCompetencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cedula, { foreignKey: 'FKIdCedula', as: 'cedula' });
      this.belongsTo(models.Competencia, { foreignKey: 'FKIdCompetencia', as: 'competencia' });
    }
  }
  DetalleCedulaCompetencia.init({
    idDetalleCedulaCompetencia: DataTypes.INTEGER,
    FKIdCedula: DataTypes.INTEGER,
    FKIdCompetencia: DataTypes.INTEGER,
    psicometria: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'DetalleCedulaCompetencia',
  });
  return DetalleCedulaCompetencia;
};