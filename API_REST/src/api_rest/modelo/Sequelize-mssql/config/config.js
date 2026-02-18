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