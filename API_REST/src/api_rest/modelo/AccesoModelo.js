import sql from 'mssql';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';
import { MensajesAcceso } from '../utilidades/Constantes.js';

export class ModeloAcceso{
    static async InsertarNuevaCuenta({datos})
    {
        let resultadoInsercion;        
        let conexion;
        try{
            conexion = await obtenerConexion();
            const{
                usuario,
                contrasenia,
                FKIdTipoAcceso,
                nombre,
                primerApellido,
                segundoApellido
            } = datos;
            const Solicitud = conexion.request();
            const ResultadoSolicitud = await Solicitud.input('usuario', sql.VarChar, usuario)
            .input('contrasenia', sql.VarChar, contrasenia)
            .input('FKidTipoAcceso', sql.Int, FKIdTipoAcceso)
            .input('nombre', sql.VarChar, nombre)
            .input('primerApellido', sql.VarChar, primerApellido)
            .input('segundoApellido', sql.VarChar, segundoApellido)
            .output('idAcceso', sql.Int)
            .execute('sp_RegistrarAcceso');
            const idAcceso = ResultadoSolicitud.output.idAcceso;            
            if (idAcceso === -1) {
                resultadoInsercion = MensajesAcceso.ERROR_DB;
            } else if (idAcceso === -2){
                resultadoInsercion = MensajesAcceso.USUARIO_DUPLICADO;
            } else {
                resultadoInsercion = MensajesAcceso.REGISTRO_EXITOSO;
            }
            } catch (error) {
                throw error;
            } finally {
                if (conexion) {
                    conexion.close(); 
                }
            }
        return resultadoInsercion;
    }

    static async EditarAcceso ({datos})
    {
        let resultadoEdicion;
        let conexion;
        try
        {
            conexion= obtenerConexion();
            const{
                idAcceso,
                usuario,
                contrasenia,
                FKIdTipoAcceso,
                nombre,
                primerApellido,
                segundoApellido,
                estado
            } = datos;
            const Solicitud = await conexion.request();
            const ResultadoSolicitud = await Solicitud.input('idAcceso',sql.Int,idAcceso)
            .input('usuario', sql.VarChar, usuario)
            .input('contrasenia', sql.VarChar, contrasenia)
            .input('FKidTipoAcceso', sql.Int, FKIdTipoAcceso)
            .input('nombre', sql.VarChar, nombre)
            .input('primerApellido', sql.VarChar, primerApellido)
            .input('segundoApellido', sql.VarChar, segundoApellido)
            .input('estado',sql.Bit, estado)
            .output('resultado',sql.Int)
            .execute('sp_ActualizarAcceso');
            const resultadoProcedimiento=ResultadoSolicitud.output.resultado;
             if (resultadoProcedimiento === -1) {
                resultadoEdicion = MensajesAcceso.ERROR_DB;
            } else if (resultadoProcedimiento === -2){
                resultadoEdicion = MensajesAcceso.USUARIO_DUPLICADO;
            } else if (resultadoProcedimiento === 1) {
                resultadoEdicion = MensajesAcceso.ACTUALIZACION_EXITOSA;
            }
            } catch (error) {
                throw error;
            } finally {
                if (conexion) {
                    conexion.close(); 
                }
            }
            return resultadoEdicion;
    }
}
