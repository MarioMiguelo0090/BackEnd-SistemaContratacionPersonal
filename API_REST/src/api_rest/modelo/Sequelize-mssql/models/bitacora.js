import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

class Bitacora extends Model {
    static associate(models) {}
}

Bitacora.init({
    idBitacora: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha:   {
      type: DataTypes.STRING
    },
    ip:      DataTypes.STRING,
    usuario: DataTypes.STRING,
    tipoDeUsuario: DataTypes.STRING,
    accion:  DataTypes.STRING
}, {
    sequelize,
    modelName: 'Bitacora',
    tableName: 'Bitacora',
    timestamps: false
});

export { Bitacora };