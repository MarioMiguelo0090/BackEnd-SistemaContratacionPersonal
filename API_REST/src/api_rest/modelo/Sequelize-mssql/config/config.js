import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const opciones = {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
}

export const sequelize = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIO,
    process.env.BD_CONTRASENIA,
    { host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones }
);
    
export const sequelizeAdministrador = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIOADMINISTRADOR,
    process.env.BD_USUARIOADMINISTRADORPASS,
    {host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones}
);

export const sequelizeAnalista = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIOANALISTA,
    process.env.BD_USUARIOANALISTAPASS,
    {host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones}
);

export const sequelizeGestorDeSolicitudes = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIOGESTORSOLICITUDES,
    process.env.BD_USUARIOGESTORSOLICITUDESPASS,
    {host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones}
);

export const sequelizeJefeDeDepartamento = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIOJEFEDEPARTAMENTO,
    process.env.BD_USUARIOJEFEDEPARTAMENTOPASS,
    {host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones}
);

export const sequelizeInicioDeSesion= new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIOLOGIN,
    process.env.BD_USUARIOLOGINPASS,
    {host: process.env.BD_SERVIDOR, port: process.env.BD_PUERTO, ...opciones}
);

export const obtenerConexion = (IdTipoDeAcceso) => {
    const conexiones = {
        'Administrador': sequelizeAdministrador,
        'Analista': sequelizeAnalista,
        'Gestor de solicitudes': sequelizeGestorDeSolicitudes,
        'Jefe de departamento': sequelizeJefeDeDepartamento
    };
    return conexiones[IdTipoDeAcceso] ?? sequelizeInicioDeSesion;
}