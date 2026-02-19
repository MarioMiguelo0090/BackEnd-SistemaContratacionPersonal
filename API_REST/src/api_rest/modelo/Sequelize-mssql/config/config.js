import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
    process.env.BD_BASEDEDATOS,
    process.env.BD_USUARIO,
    process.env.BD_CONTRASENIA,
    {
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, 
                trustServerCertificate: true
            }
        }
    }
    
)

/* 
module.exports = {
    development: {
        username: process.env.BD_USUARIO,
        password: process.env.BD_CONTRASENIA,
        database: process.env.BD_BASEDEDATOS,
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, 
                trustServerCertificate: true
            }
        }
    },
    Administrador: {
        username: process.env.BD_USUARIO,
        password: process.env.BD_CONTRASENIA,
        database: process.env.BD_BASEDEDATOS,
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, 
                trustServerCertificate: true
            }
        }
    },
    Analista: {
        username: process.env.BD_USUARIO,
        password: process.env.BD_CONTRASENIA,
        database: process.env.BD_BASEDEDATOS,
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, 
                trustServerCertificate: true
            }
        }
    },
    GestorDeSolicitudes: {
        username: process.env.BD_USUARIO,
        password: process.env.BD_CONTRASENIA,
        database: process.env.BD_BASEDEDATOS,
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, 
                trustServerCertificate: true
            }
        }
    },
    JefeDeDepartamento: {
        username: process.env.BD_USUARIO,
        password: process.env.BD_CONTRASENIA,
        database: process.env.BD_BASEDEDATOS,
        host: process.env.BD_SERVIDOR,
        port: process.env.BD_PUERTO,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, 
                trustServerCertificate: true
            }
        }
    }
}
*/