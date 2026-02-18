import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const conexionUsuario = {
    user: process.env.BD_USUARIO,
    password: process.env.BD_CONTRASENIA,
    server: process.env.BD_SERVIDOR,
    database: process.env.BD_BASEDEDATOS,
    port: parseInt(process.env.BD_PUERTO),
    options:{
        encrypt: process.env.BD_ENCRIPTADO === 'true',
        trustServerCertificate: process.env.BD_CONFIAR_SERVIDOR === 'true'
    },
    requestTimeout: 60000
};

export async function obtenerConexion() {
    try {
    const pool = await sql.connect(conexionUsuario);
    console.log('Conexión a SQL Server exitosa');
    return pool;
  } catch (err) {
    console.error('Error al conectar a la BD:', err);
    throw err;
  }
}

export{ sql };