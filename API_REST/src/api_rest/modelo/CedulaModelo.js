import sql from 'mssql';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';
import { MensajeGeneralesBD,MensajeCedula, MensajeResultado } from '../utilidades/Constantes.js';

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
            .input('plaza',sql.VarChar(sql.MAX), plaza)
            .input('oficioAutorizacionDeOcupacion',sql.VarChar,(sql.MAX),oficioAutorizacionDeOcupacion)
            .input('evaluacionConocimientos',sql.VarChar(sql.MAX),evaluacionConocimientos)
            .execute('sp_RegistrarCedula');
            const ResultadoCedula = Solicitud.recordset;
            if(ResultadoCedula.length>0){
                const CedulaRegistrada = ResultadoCedula[0];
                if(CedulaRegistrada.idCedula>0){
                    resultadoInsercion = {
                        ...MensajeCedula.REGISTRO_EXITOSO,
                        estado:MensajeCedula.REGISTRO_EXITOSO.resultado,
                        idCedula: CedulaRegistrada.idCedula
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
            .input('plaza',sql.VarChar(sql.MAX), plaza)
            .input('oficioAutorizacionDeOcupacion',sql.VarChar,(sql.MAX),oficioAutorizacionDeOcupacion)
            .input('evaluacionConocimientos',sql.VarChar(sql.MAX),evaluacionConocimientos)
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

    static async ObtenerCedulaPorIdProceso({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdProceso} = datos;
            const Solicitud = await conexion.request()
            .input('idProceso',sql.Int,FKIdProceso)
            .execute('sp_ObtenerCedulaPorIdProceso');
            const ResultadoQueryCedula = Solicitud.recordset;
            if(ResultadoQueryCedula.length>0){
                const cedulaConsultada=ResultadoQueryCedula[0];
                if(cedulaConsultada.idCedula>0){
                    resultadoConsulta = {estado: 200, cedula:ResultadoQueryCedula}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.CEDULA_INEXISTENTE};
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

    static async ObtenerCompetenciasPorClasificacionCedula({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdClasificacionCedula} = datos;
            const Solicitud = await conexion.request()
            .input('idClasificacionCedula',sql.Int,FKIdClasificacionCedula)
            .execute('sp_ObtenerCompetenciasPorClasificacionCedula');
            const ResultadoQueryCompetencias = Solicitud.recordset;
            if(ResultadoQueryCompetencias.length>0){
                const competencia=ResultadoQueryCompetencias[0];
                if(competencia.idCompetencia>0){
                    resultadoConsulta = {estado: 200, competencias:ResultadoQueryCompetencias}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.COMPETENCIA_INEXISTENTE};
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

    static async InsertarNuevoResultado({datos})
    {
        let resultadoInsercion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {
                FKIdCedula,
                psicometriaComunicacion,
                psicometriaTrabajoEnEquipo,
                psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos,
                psicometriaPlaneacionOrganizacion,
                psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados,
                psicometriaControlActividades,
                psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales,
                psicometriaLiderazgo,
                psicometriaTomaDecisiones,
                psicometriaDinamismo,
                psicometriaInnovacion,
                psicometriaPensamientoEstrategico,
                psicometriaNegociacion
            } = datos;
            const Solicitud = await conexion.request()
            .input('FKIdCedula', sql.Int, FKIdCedula)
            .input('psicometriaComunicacion', sql.Float, psicometriaComunicacion)
            .input('psicometriaTrabajoEnEquipo', sql.Float, psicometriaTrabajoEnEquipo)
            .input('psicometriaOrientacionAlServicio', sql.Float, psicometriaOrientacionAlServicio)
            .input('psicometriaSensibilidadALineamientos', sql.Float, psicometriaSensibilidadALineamientos)
            .input('psicometriaPlaneacionOrganizacion', sql.Float, psicometriaPlaneacionOrganizacion)
            .input('psicometriaAnalisisProblemas', sql.Float, psicometriaAnalisisProblemas)
            .input('psicometriaEnfoqueResultados', sql.Float, psicometriaEnfoqueResultados)
            .input('psicometriaControlActividades', sql.Float, psicometriaControlActividades)
            .input('psicometriaEnfoqueCalidad', sql.Float, psicometriaEnfoqueCalidad)
            .input('psicometriaRelacionesInterpersonales', sql.Float, psicometriaRelacionesInterpersonales)
            .input('psicometriaLiderazgo', sql.Float, psicometriaLiderazgo)
            .input('psicometriaTomaDecisiones', sql.Float, psicometriaTomaDecisiones)
            .input('psicometriaDinamismo', sql.Float, psicometriaDinamismo)
            .input('psicometriaInnovacion', sql.Float, psicometriaInnovacion)
            .input('psicometriaPensamientoEstrategico', sql.Float, psicometriaPensamientoEstrategico)
            .input('psicometriaNegociacion', sql.Float, psicometriaNegociacion)
            .execute('sp_RegistrarResultado');
            const Resultado = Solicitud.recordset;
            if(Resultado.length>0){
                const Registro = Resultado[0];
                if(Registro.idResultado > 0){
                    resultadoInsercion ={
                        ...MensajeResultado.REGISTRO_EXITOSO,
                        estado: MensajeResultado.REGISTRO_EXITOSO.resultado
                    };
                }else{
                    resultadoInsercion = {
                        ...MensajeResultado.RESULTADO_INEXISTENTE,
                        estado: MensajeResultado.RESULTADO_INEXISTENTE.resultado
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

    static async EditarResultadoExistente({datos})
    {
        let resultadoEdicion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {
                idResultado,
                psicometriaComunicacion,
                psicometriaTrabajoEnEquipo,
                psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos,
                psicometriaPlaneacionOrganizacion,
                psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados,
                psicometriaControlActividades,
                psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales,
                psicometriaLiderazgo,
                psicometriaTomaDecisiones,
                psicometriaDinamismo,
                psicometriaInnovacion,
                psicometriaPensamientoEstrategico,
                psicometriaNegociacion
            } = datos;
            const Solicitud = await conexion.request()
            .input('idResultado', sql.Int, idResultado)
            .input('psicometriaComunicacion', sql.Float, psicometriaComunicacion)
            .input('psicometriaTrabajoEnEquipo', sql.Float, psicometriaTrabajoEnEquipo)
            .input('psicometriaOrientacionAlServicio', sql.Float, psicometriaOrientacionAlServicio)
            .input('psicometriaSensibilidadALineamientos', sql.Float, psicometriaSensibilidadALineamientos)
            .input('psicometriaPlaneacionOrganizacion', sql.Float, psicometriaPlaneacionOrganizacion)
            .input('psicometriaAnalisisProblemas', sql.Float, psicometriaAnalisisProblemas)
            .input('psicometriaEnfoqueResultados', sql.Float, psicometriaEnfoqueResultados)
            .input('psicometriaControlActividades', sql.Float, psicometriaControlActividades)
            .input('psicometriaEnfoqueCalidad', sql.Float, psicometriaEnfoqueCalidad)
            .input('psicometriaRelacionesInterpersonales', sql.Float, psicometriaRelacionesInterpersonales)
            .input('psicometriaLiderazgo', sql.Float, psicometriaLiderazgo)
            .input('psicometriaTomaDecisiones', sql.Float, psicometriaTomaDecisiones)
            .input('psicometriaDinamismo', sql.Float, psicometriaDinamismo)
            .input('psicometriaInnovacion', sql.Float, psicometriaInnovacion)
            .input('psicometriaPensamientoEstrategico', sql.Float, psicometriaPensamientoEstrategico)
            .input('psicometriaNegociacion', sql.Float, psicometriaNegociacion)
            .execute('sp_ActualizarResultado');
            const ResultadoSP = Solicitud.recordset[0]?.actualizado;
            if(ResultadoSP === 1){
                resultadoEdicion = {
                    ...MensajeCedula.ACTUALIZACION_EXITOSA,
                    estado: MensajeCedula.ACTUALIZACION_EXITOSA.resultado
                };
            }else if (ResultadoSP === 0){
                resultadoEdicion = {
                    ...MensajeResultado.RESULTADO_INEXISTENTE,
                    estado: MensajeResultado.RESULTADO_INEXISTENTE.resultado
                };
            }else {
                resultadoEdicion={
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

    static async ObtenerResultadosPorIdCedula({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdCedula} = datos;
            const Solicitud = await conexion.request()
            .input('idCedula',sql.Int,FKIdCedula)
            .execute('sp_ObtenerResultadosPorIdCedula');
            const ResultadoQueryResultado = Solicitud.recordset;
            if(ResultadoQueryResultado.length>0){
                const resultadoConsultado=ResultadoQueryResultado[0];
                if(resultadoConsultado.idResultado>0){
                    resultadoConsulta = {estado: 200, resultados:ResultadoQueryResultado}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else {
                resultadoConsulta = { estado: 404, mensaje: MensajeResultado.RESULTADO_INEXISTENTE};
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

    static async ObtenerTodasCedulas()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .execute('sp_ObtenerTodasCedulas');
            const cedulas = Solicitud.recordset;
            if(cedulas.length > 0){
                resultadoConsulta = {estado: 200, cedulas};
            }else{
                resultadoConsulta = {estado: 400, mensaje:MensajeCedula.CEDULA_INEXISTENTE};
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

    static async ObtenerCedulaPorHermes({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {hermesNotificacion} = datos;
            const Solicitud = await conexion.request()
            .input('hermesNotificacion',sql.VarChar(sql.MAX),hermesNotificacion)
            .execute('sp_ObtenerCedulaPorHermesNotificacion');
            const ResultadoQueryCedula = Solicitud.recordset;
            if(ResultadoQueryCedula.length>0){
                const cedulaConsultada=ResultadoQueryCedula[0];
                if(cedulaConsultada.idCedula>0){
                    resultadoConsulta = {estado: 200, cedula:ResultadoQueryCedula}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.CEDULA_INEXISTENTE};
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