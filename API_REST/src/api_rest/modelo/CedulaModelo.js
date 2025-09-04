import sql from 'mssql';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';
import { MensajeGeneralesBD,MensajeCedula } from '../utilidades/Constantes.js';

export class ModeloCedula
{
    static async InsertarNuevaCedula({datos})
    {
        let resultadoInsercion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {                
                FKIdTipoCedula,
                FKIdProceso,
                fechaCedulaInterna,
                fechaCedulaResultados,
                edad,
                educacionFormal,
                referidoPor,
                antecedentesFamiliaresUV,
                expectativaLaboral,
                experienciaRelacionada,
                experiencia,
                conclusiones,
                resultado,
                efectoContratacion,
                competenciaReforzar,
                competenciaDesarrollar,
                FKIdClasificacionCedula,
                FKIdResultado,
                motivoCedulaInterna,
                motivoCedulaResultados,
                puesto
            } = datos;
            const Solicitud = await conexion.request()
            .input('FKIdTipoCedula', sql.Int, FKIdTipoCedula)
            .input('FKIdProceso', sql.Int, FKIdProceso)
            .input('fechaCedulaInterna', sql.Date, fechaCedulaInterna)
            .input('fechaCedulaResultados', sql.Date, fechaCedulaResultados)
            .input('edad', sql.VarChar(3), edad)
            .input('educacionFormal', sql.VarChar(sql.MAX), educacionFormal)
            .input('referidoPor', sql.VarChar(sql.MAX), referidoPor)
            .input('antecedentesFamiliaresUV', sql.VarChar(sql.MAX), antecedentesFamiliaresUV)
            .input('expectativaLaboral', sql.VarChar(sql.MAX), expectativaLaboral)
            .input('experienciaRelacionada', sql.VarChar(sql.MAX), experienciaRelacionada)
            .input('experiencia', sql.VarChar(sql.MAX), experiencia)
            .input('conclusiones', sql.VarChar(sql.MAX), conclusiones)
            .input('resultado', sql.VarChar(50), resultado)
            .input('efectoContratacion', sql.VarChar(sql.MAX), efectoContratacion)
            .input('competenciaReforzar', sql.VarChar(sql.MAX), competenciaReforzar)
            .input('competenciaDesarrollar', sql.VarChar(sql.MAX), competenciaDesarrollar)
            .input('FKIdClasificacionCedula', sql.Int, FKIdClasificacionCedula)
            .input('FKIdResultado', sql.Int, FKIdResultado)
            .input('motivoCedulaInterna', sql.VarChar(sql.MAX), motivoCedulaInterna)
            .input('motivoCedulaResultados', sql.VarChar(sql.MAX), motivoCedulaResultados)
            .input('puesto', sql.VarChar(sql.MAX), puesto)
            .execute('sp_RegistrarCedula');
            const ResultadoCedula = Solicitud.recordset;
            if(ResultadoCedula.length>0){
                const CedulaRegistrada = ResultadoCedula[0];
                if(CedulaRegistrada.idCedula>0){
                    resultadoInsercion = {
                        ...MensajeCedula.REGISTRO_EXITOSO,
                        estado:MensajeCedula.REGISTRO_EXITOSO.resultado
                    };
                }else if(CedulaRegistrada.idCedula==-2){
                    resultadoInsercion = {
                        ...MensajeCedula.CEDULA_DUPLICADA,
                        estado:MensajeCedula.CEDULA_DUPLICADA.resultado
                    };
                }else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: MensajeGeneralesBD.ERROR_DB.resultado
                    };
                }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
        }
        return resultadoInsercion;
    }

    static async EditarCedula({datos})
    {
        let resultadoEdicion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {  
                idCedula,              
                FKIdTipoCedula,
                FKIdProceso,
                fechaCedulaInterna,
                fechaCedulaResultados,
                edad,
                educacionFormal,
                referidoPor,
                antecedentesFamiliaresUV,
                expectativaLaboral,
                experienciaRelacionada,
                experiencia,
                conclusiones,
                resultado,
                efectoContratacion,
                competenciaReforzar,
                competenciaDesarrollar,
                FKIdClasificacionCedula,
                FKIdResultado,
                motivoCedulaInterna,
                motivoCedulaResultados,
                puesto
            } = datos;
            const Solicitud = await conexion.request()
            .input('idCedula',sql.Int,idCedula)
            .input('FKIdTipoCedula', sql.Int, FKIdTipoCedula)
            .input('FKIdProceso', sql.Int, FKIdProceso)
            .input('fechaCedulaInterna', sql.Date, fechaCedulaInterna)
            .input('fechaCedulaResultados', sql.Date, fechaCedulaResultados)
            .input('edad', sql.VarChar(3), edad)
            .input('educacionFormal', sql.VarChar(sql.MAX), educacionFormal)
            .input('referidoPor', sql.VarChar(sql.MAX), referidoPor)
            .input('antecedentesFamiliaresUV', sql.VarChar(sql.MAX), antecedentesFamiliaresUV)
            .input('expectativaLaboral', sql.VarChar(sql.MAX), expectativaLaboral)
            .input('experienciaRelacionada', sql.VarChar(sql.MAX), experienciaRelacionada)
            .input('experiencia', sql.VarChar(sql.MAX), experiencia)
            .input('conclusiones', sql.VarChar(sql.MAX), conclusiones)
            .input('resultado', sql.VarChar(50), resultado)
            .input('efectoContratacion', sql.VarChar(sql.MAX), efectoContratacion)
            .input('competenciaReforzar', sql.VarChar(sql.MAX), competenciaReforzar)
            .input('competenciaDesarrollar', sql.VarChar(sql.MAX), competenciaDesarrollar)
            .input('FKIdClasificacionCedula', sql.Int, FKIdClasificacionCedula)
            .input('FKIdResultado', sql.Int, FKIdResultado)
            .input('motivoCedulaInterna', sql.VarChar(sql.MAX), motivoCedulaInterna)
            .input('motivoCedulaResultados', sql.VarChar(sql.MAX), motivoCedulaResultados)
            .input('puesto', sql.VarChar(sql.MAX), puesto)
            .execute('sp_ActualizarCedula');
            const ResultadoSP = Solicitud.recordset[0]?.Resultado;
            if(ResultadoSP === 1){
                resultadoEdicion = {
                    ...MensajeCedula.ACTUALIZACION_EXITOSA,
                    estado: MensajeCedula.ACTUALIZACION_EXITOSA.resultado
                };
            }else if (ResultadoSP === 2){
                resultadoEdicion = {
                    ...MensajeCedula.CEDULA_INEXISTENTE,
                    estado: MensajeCedula.CEDULA_INEXISTENTE.resultado
                };
            }else{
                resultadoEdicion = {
                    ...MensajeGeneralesBD.ERROR_DB,
                    estado: MensajeGeneralesBD.ERROR_DB.resultado                        
                };
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
        }
        return resultadoEdicion;   
    }
}