import sql from 'mssql';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';
import { MensajesAcceso,MensajeGeneralesBD } from '../utilidades/Constantes.js';

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
                resultadoInsercion = MensajeGeneralesBD.ERROR_DB;
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
                resultadoEdicion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };                
            } else if (resultadoProcedimiento === -2){
                resultadoEdicion = { estado: 409, mensaje: MensajesAcceso.USUARIO_DUPLICADO };
            } else if(resultadoProcedimiento === 1) {
                resultadoEdicion = { estado: 200, mensaje: MensajesAcceso.ACTUALIZACION_EXITOSA };
            } else {
                resultadoEdicion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };                
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
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
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

    static async BuscarUsuarioPorNombreUsuario({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion=await obtenerConexion();
            const {usuario}=datos;
            const Solicitud = await conexion.request()
            .input('usuario',sql.VarChar,usuario)
            .execute('sp_ObtenerAccesoPorUsuario');
            const ResultadoQueryAcceso = Solicitud.recordset;
            if(ResultadoQueryAcceso.length > 0){
                const usuarioConsultado = ResultadoQueryAcceso[0];                
                if(usuarioConsultado.idAcceso>0){
                    resultadoConsulta = {estado: 200, usuarioEncontrado:ResultadoQueryAcceso}
                }else if(usuarioConsultado.idAcceso==-1){
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
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

    static async DesactivarUsuarioPorIdAcceso({datos})
    {
        let resultadoDesactivacion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {idAcceso} = datos;
            const Solicitud = await conexion.request()
            .input('idAcceso',sql.Int,idAcceso)
            .execute('sp_DesactivarUsuario'); 
            const ResultadoQuery = Solicitud.recordset[0];
            if (ResultadoQuery.Resultado === 1){
                resultadoDesactivacion = { estado: 200, mensaje: MensajesAcceso.DESACTIVACION_EXITOSA };
            }else if (ResultadoQuery.Resultado === 0){
                resultadoDesactivacion = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            }else{
                resultadoDesactivacion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoDesactivacion;
    }

    static async LoginAcceso({datos})
    {
        let resultadoDeLogin;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {usuario,contrasenia} = datos;
            const Solicitud = await conexion.request()
            .input('usuario',sql.VarChar,usuario)
            .input('contrasenia',sql.VarChar,contrasenia)
            .execute('sp_LoginAcceso');
            const ResultadoQuery = Solicitud.recordset[0];
            if(ResultadoQuery.Resultado === 0)
            {
                resultadoDeLogin = { 
                    estado: 200, 
                    mensaje: MensajesAcceso.LOGIN_EXITOSO,
                    usuario: ResultadoQuery 
                };
            } else if (ResultadoQuery.Resultado === 1){
                resultadoDeLogin = { estado: 404, mensaje: MensajesAcceso.CREDENCIALES_INVALIDAS };
            } else if (ResultadoQuery.Resultado === 2){
                resultadoDeLogin = { estado: 401, mensaje: MensajesAcceso.CREDENCIALES_INVALIDAS };
            } else if (ResultadoQuery.Resultado === 3){
                resultadoDeLogin = { estado: 401, mensaje: MensajesAcceso.USUARIO_INACTIVO };
            }else {
                resultadoDeLogin = { estado: 401, mensaje: MensajeGeneralesBD.ERROR_DB };
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoDeLogin;
    }

    static async ObtenerTodosTiposDeAcceso()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
                .execute('sp_ObtenerTodosTiposAcceso');
            const tiposAcceso = Solicitud.recordset;
            if(tiposAcceso.length > 0){
                resultadoConsulta = {estado: 200, tiposAcceso};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajesAcceso.TIPOS_ACCESO_PERDIDOS}
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        } 
        return resultadoConsulta;
    }

    static async ObtenerTodosLosUsuarios()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .execute('sp_ObtenerTodosAccesos');
            const usuarios = Solicitud.recordset;
            if(usuarios.length > 0){
                resultadoConsulta = {estado: 200, usuarios};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajesAcceso.USUARIO_PERDIDO};
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        } 
        return resultadoConsulta;
    }
    
    static async ObtenerTodosLosAnalistas()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .execute('ObtenerAccesosAnalistas');
            const usuarios = Solicitud.recordset;
            if(usuarios.length > 0){
                resultadoConsulta = {estado: 200, usuarios};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajesAcceso.USUARIO_PERDIDO};
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        } 
        return resultadoConsulta;
    }
}
