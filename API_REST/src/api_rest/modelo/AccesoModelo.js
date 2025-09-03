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
            conexion= await obtenerConexion();
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
            .input('estado', sql.Bit, Boolean(estado))
            .output('resultado',sql.Int)
            .execute('sp_ActualizarAcceso');            
            const resultadoProcedimiento=ResultadoSolicitud.output.resultado;
            if (resultadoProcedimiento === -1) {
                resultadoEdicion = { estado: 500, mensaje: MensajesAcceso.ERROR_DB };                
            } else if (resultadoProcedimiento === -2){
                resultadoEdicion = { estado: 409, mensaje: MensajesAcceso.USUARIO_DUPLICADO };
            } else if(resultadoProcedimiento === 1) {
                resultadoEdicion = { estado: 200, mensaje: MensajesAcceso.ACTUALIZACION_EXITOSA };
            } else {
                resultadoEdicion = { estado: 500, mensaje: MensajesAcceso.ERROR_DB };                
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

    static async BuscarUsuarioPorId({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion= await obtenerConexion();
            const {idAcceso} = datos;
            const Solicitud = await conexion.request()
            .input('idAcceso',sql.Int,idAcceso)
            .execute('sp_ObtenerAccesoPorId');
            const ResultadoQueryAcceso = Solicitud.recordset;
            if(ResultadoQueryAcceso.length > 0){
                const usuario = ResultadoQueryAcceso[0];                
                if(usuario.idAcceso>0){
                    resultadoConsulta = {estado: 200, usuarioEncontrado:ResultadoQueryAcceso}
                }else if(usuario.idAcceso==-1){
                    resultadoConsulta = { estado: 500, mensaje: MensajesAcceso.ERROR_DB };
                }else{
                    resultadoConsulta = {estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO};        
                }
            }else{
                resultadoConsulta = {estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO};
            }
        }
        catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
            return resultadoConsulta;
        }
    }
}
