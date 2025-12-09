import sql from 'mssql';
import { MensajeGeneralesBD, MensajeProcesoContratacion } from '../utilidades/Constantes.js';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';

export class ModeloProcesoContratacion
{
    static async InsertarNuevoProcesoContratacion({datos})
    {
        let resultadoInsercion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const{
                folio,
                numPlaza,
                fechaRecibido,
                fechaEntrevista,
                resultadoEvaluacionConocimiento,
                fechaEnvioDEyDP,
                fechaNotificacion,
                categoriaPuestoOrigen,
                diasProceso,
                beneficiado,
                FKIdTipoProceso,
                FKIdTipoPersonal,
                FKIdEstadoProcesoContratacion,
                FKIdTemporalDefinitiva,
                FKIdDependencia,
                hermesNotificacion,
                titularPlaza,
                lineamientoOficioContinuidad,
                motivo,
                fechaElaboracionPropuesta,
                fechaLiberacionOficio,
                periodoAutorizadoOficioInicio,
                periodoAutorizadoOficioFin,
                categoriaAutorizadaOficio,
                observaciones,
                numCarpeta,
                nombreCandidato,
                funcionDesempeniar,
                familiaFuncional,
                fechaEvaluacionCompetencias,
                fechaInicioProcesamiento,
                resultadoEvaluacionCompetencias,
                experienciaLaboralSolicitada,
                resultadoReferenciasLaborales,
                fechaEnvioEvaluacionDesempenio,
                resultadoHabilidadesWord,
                resultadoHabilidadesExcel,
                resultadoOrtografia,
                resultadoProcesoEvaluacion,
                fechaRevisionOfiEval,
                observacionesAnalista,
                consecutivoExpediente,
                resultadoSeguimientoEvaluacionDesempenio,
                FKIdAcceso,
                autorizacion,
            } = datos;            
            const Solicitud = await conexion.request()
            .input('folio', sql.VarChar(sql.MAX), folio)
            .input('numPlaza', sql.VarChar(10), numPlaza)
            .input('fechaRecibido', sql.Date, fechaRecibido)
            .input('fechaEntrevista', sql.Date, fechaEntrevista)
            .input('resultadoEvaluacionConocimiento', sql.VarChar(sql.MAX), resultadoEvaluacionConocimiento)
            .input('fechaEnvioDEyDP', sql.Date, fechaEnvioDEyDP)
            .input('fechaNotificacion', sql.Date, fechaNotificacion)
            .input('categoriaPuestoOrigen', sql.VarChar(50), categoriaPuestoOrigen)
            .input('diasProceso', sql.VarChar(3), diasProceso)
            .input('beneficiado', sql.Bit, beneficiado)
            .input('FKIdTipoProceso', sql.Int, FKIdTipoProceso)
            .input('FKIdTipoPersonal', sql.Int, FKIdTipoPersonal)
            .input('FKIdEstadoProcesoContratacion', sql.Int, FKIdEstadoProcesoContratacion)
            .input('FKIdTemporalDefinitiva', sql.Int, FKIdTemporalDefinitiva)
            .input('FKIdDependencia', sql.Int, FKIdDependencia)
            .input('hermesNotificacion', sql.VarChar(sql.MAX), hermesNotificacion)
            .input('titularPlaza', sql.VarChar(sql.MAX), titularPlaza)
            .input('lineamientoOficioContinuidad', sql.VarChar(20), lineamientoOficioContinuidad)
            .input('motivo', sql.VarChar(sql.MAX), motivo)
            .input('fechaElaboracionPropuesta', sql.Date, fechaElaboracionPropuesta)
            .input('fechaLiberacionOficio', sql.Date, fechaLiberacionOficio)
            .input('periodoAutorizadoOficioInicio', sql.Date, periodoAutorizadoOficioInicio)
            .input('periodoAutorizadoOficioFin', sql.Date, periodoAutorizadoOficioFin)
            .input('categoriaAutorizadaOficio',sql.VarChar(sql.MAX), categoriaAutorizadaOficio)
            .input('observaciones', sql.VarChar(sql.MAX), observaciones)
            .input('numCarpeta', sql.VarChar(10), numCarpeta)
            .input('nombreCandidato', sql.VarChar(100), nombreCandidato)
            .input('funcionDesempeniar', sql.VarChar(sql.MAX), funcionDesempeniar)
            .input('familiaFuncional', sql.VarChar(sql.MAX), familiaFuncional)
            .input('fechaEvaluacionCompetencias', sql.Date, fechaEvaluacionCompetencias)
            .input('fechaInicioProcesamiento', sql.Date, fechaInicioProcesamiento)
            .input('resultadoEvaluacionCompetencias', sql.VarChar(6), resultadoEvaluacionCompetencias)
            .input('experienciaLaboralSolicitada', sql.VarChar(50), experienciaLaboralSolicitada)
            .input('resultadoReferenciasLaborales', sql.VarChar(50), resultadoReferenciasLaborales)
            .input('fechaEnvioEvaluacionDesempenio', sql.Date, fechaEnvioEvaluacionDesempenio)
            .input('resultadoHabilidadesWord', sql.VarChar(5), resultadoHabilidadesWord)
            .input('resultadoHabilidadesExcel', sql.VarChar(5), resultadoHabilidadesExcel)
            .input('resultadoOrtografia', sql.VarChar(5), resultadoOrtografia)
            .input('resultadoProcesoEvaluacion', sql.VarChar(50), resultadoProcesoEvaluacion)
            .input('fechaRevisionOfiEval', sql.Date, fechaRevisionOfiEval)
            .input('observacionesAnalista', sql.VarChar(sql.MAX), observacionesAnalista)
            .input('consecutivoExpediente', sql.VarChar(10), consecutivoExpediente)
            .input('resultadoSeguimientoEvaluacionDesempenio', sql.VarChar(10), resultadoSeguimientoEvaluacionDesempenio)
            .input('FKIdAcceso', sql.Int, FKIdAcceso)
            .input('autorizacion', sql.Bit, autorizacion)
            .execute('sp_RegistrarProcesoContratacion');
            const ResultadoProcesoContratacion = Solicitud.recordset;
            if(ResultadoProcesoContratacion.length>0){
                const ProcesoContratacion = ResultadoProcesoContratacion[0];
                if(ProcesoContratacion.idProceso>0){
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado:MensajeProcesoContratacion.REGISTRO_EXITOSO.resultado
                    };
                }else if (ProcesoContratacion.idProceso ==-2){
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_DUPLICADO,
                        estado: MensajeProcesoContratacion.REGISTRO_DUPLICADO.resultado
                    };
                }else{    
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

    static async EditarProcesoContratacion({datos})
    {
        let resultadoEdicion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const{
                idProceso,
                folio,
                numPlaza,
                fechaRecibido,
                fechaEntrevista,
                resultadoEvaluacionConocimiento,
                fechaEnvioDEyDP,
                fechaNotificacion,
                categoriaPuestoOrigen,
                diasProceso,
                beneficiado,
                FKIdTipoProceso,
                FKIdTipoPersonal,
                FKIdEstadoProcesoContratacion,
                FKIdTemporalDefinitiva,
                FKIdDependencia,
                hermesNotificacion,
                titularPlaza,
                lineamientoOficioContinuidad,
                motivo,
                fechaElaboracionPropuesta,
                fechaLiberacionOficio,
                periodoAutorizadoOficioInicio,
                periodoAutorizadoOficioFin,
                categoriaAutorizadaOficio,
                observaciones,
                numCarpeta,
                nombreCandidato,
                funcionDesempeniar,
                familiaFuncional,
                fechaEvaluacionCompetencias,
                fechaInicioProcesamiento,
                resultadoEvaluacionCompetencias,
                experienciaLaboralSolicitada,
                resultadoReferenciasLaborales,
                fechaEnvioEvaluacionDesempenio,
                resultadoHabilidadesWord,
                resultadoHabilidadesExcel,
                resultadoOrtografia,
                resultadoProcesoEvaluacion,
                fechaRevisionOfiEval,
                observacionesAnalista,
                consecutivoExpediente,
                resultadoSeguimientoEvaluacionDesempenio,
                FKIdAcceso,
                seguimientoEvaluacionDesempenio,
                educacionFormal,
                avaladoPor,
                fechaAsignacionAnalista,
                capacitado,  
                citaVirtual,
                atendioCita,              
            } = datos;
            const Solicitud = await conexion.request()
            .input('idProceso',sql.Int,idProceso)
            .input('folio', sql.VarChar(sql.MAX), folio)
            .input('numPlaza', sql.VarChar(10), numPlaza)
            .input('fechaRecibido', sql.Date, fechaRecibido)
            .input('fechaEntrevista', sql.Date, fechaEntrevista)
            .input('resultadoEvaluacionConocimiento', sql.VarChar(sql.MAX), resultadoEvaluacionConocimiento)
            .input('fechaEnvioDEyDP', sql.Date, fechaEnvioDEyDP)
            .input('fechaNotificacion', sql.Date, fechaNotificacion)
            .input('categoriaPuestoOrigen', sql.VarChar(50), categoriaPuestoOrigen)
            .input('diasProceso', sql.VarChar(3), diasProceso)
            .input('beneficiado', sql.Bit, beneficiado ? 1 : 0)
            .input('FKIdTipoProceso', sql.Int, FKIdTipoProceso)
            .input('FKIdTipoPersonal', sql.Int, FKIdTipoPersonal)
            .input('FKIdEstadoProcesoContratacion', sql.Int, FKIdEstadoProcesoContratacion)
            .input('FKIdTemporalDefinitiva', sql.Int, FKIdTemporalDefinitiva)
            .input('FKIdDependencia', sql.Int, FKIdDependencia)
            .input('hermesNotificacion', sql.VarChar(sql.MAX), hermesNotificacion)
            .input('titularPlaza', sql.VarChar(sql.MAX), titularPlaza)
            .input('lineamientoOficioContinuidad', sql.VarChar(20), lineamientoOficioContinuidad)
            .input('motivo', sql.VarChar(sql.MAX), motivo)
            .input('fechaElaboracionPropuesta', sql.Date, fechaElaboracionPropuesta)
            .input('fechaLiberacionOficio', sql.Date, fechaLiberacionOficio)
            .input('periodoAutorizadoOficioInicio', sql.Date, periodoAutorizadoOficioInicio)
            .input('periodoAutorizadoOficioFin', sql.Date, periodoAutorizadoOficioFin)
            .input('categoriaAutorizadaOficio',sql.VarChar(sql.MAX),categoriaAutorizadaOficio)
            .input('observaciones', sql.VarChar(sql.MAX), observaciones)
            .input('numCarpeta', sql.VarChar(10), numCarpeta)
            .input('nombreCandidato', sql.VarChar(100), nombreCandidato)
            .input('funcionDesempeniar', sql.VarChar(sql.MAX), funcionDesempeniar)
            .input('familiaFuncional', sql.VarChar(sql.MAX), familiaFuncional)
            .input('fechaEvaluacionCompetencias', sql.Date, fechaEvaluacionCompetencias)
            .input('fechaInicioProcesamiento', sql.Date, fechaInicioProcesamiento)
            .input('resultadoEvaluacionCompetencias', sql.VarChar(6), resultadoEvaluacionCompetencias)
            .input('experienciaLaboralSolicitada', sql.VarChar(50), experienciaLaboralSolicitada)
            .input('resultadoReferenciasLaborales', sql.VarChar(50), resultadoReferenciasLaborales)
            .input('fechaEnvioEvaluacionDesempenio', sql.Date, fechaEnvioEvaluacionDesempenio)
            .input('resultadoHabilidadesWord', sql.VarChar(5), resultadoHabilidadesWord)
            .input('resultadoHabilidadesExcel', sql.VarChar(5), resultadoHabilidadesExcel)
            .input('resultadoOrtografia', sql.VarChar(5), resultadoOrtografia)
            .input('resultadoProcesoEvaluacion', sql.VarChar(50), resultadoProcesoEvaluacion)
            .input('fechaRevisionOfiEval', sql.Date, fechaRevisionOfiEval)
            .input('observacionesAnalista', sql.VarChar(sql.MAX), observacionesAnalista)
            .input('consecutivoExpediente', sql.VarChar(10), consecutivoExpediente)
            .input('seguimientoEvaluacionDesempenio', sql.Bit, seguimientoEvaluacionDesempenio ? 1:0)
            .input('resultadoSeguimientoEvaluacionDesempenio', sql.VarChar(10), resultadoSeguimientoEvaluacionDesempenio)
            .input('FKIdAcceso', sql.Int, FKIdAcceso)
            .input('educacionFormal',sql.VarChar(sql.MAX),educacionFormal)
            .input('avaladoPor',sql.VarChar(sql.MAX), avaladoPor)    
            .input('fechaAsignacionAnalista',sql.Date,fechaAsignacionAnalista)  
            .input('capacitado', sql.Bit, capacitado ? 1 : 0)      
            .input('citaVirtual', sql.Bit, citaVirtual ? 1 : 0)
            .input('atendioCita', sql.Bit, atendioCita ? 1 : 0)
            .execute('sp_ActualizarProcesoContratacion');
            const ResultadoSP = Solicitud.recordset[0]?.Resultado;
            if (ResultadoSP === 1) {
                resultadoEdicion = { 
                    ...MensajeProcesoContratacion.ACTUALIZACION_EXITOSA, 
                    estado: MensajeProcesoContratacion.ACTUALIZACION_EXITOSA.resultado };
            }else if(ResultadoSP == 2){
                resultadoEdicion = { 
                    ...MensajeProcesoContratacion.PROCESO_INEXISTENTE, 
                    estado: MensajeProcesoContratacion.PROCESO_INEXISTENTE.resultado };
            } else  {
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

    static async ObtenerProcesoContratacionPorIdProceso({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {idProceso} = datos;
            const Solicitud = await conexion.request()
            .input('idProceso',sql.Int,idProceso)            
            .execute('sp_ObtenerProcesoPorIdProceso');
            const ResultadoQueryProceso = Solicitud.recordset;
            if(ResultadoQueryProceso.length > 0){
                const procesoContratacionConsultado = ResultadoQueryProceso[0];
                if(procesoContratacionConsultado.idProceso>0){
                    resultadoConsulta = {estado: 200, procesoContratacion:ResultadoQueryProceso}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else{
                resultadoConsulta = {estado: 404, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
            return resultadoConsulta;
        }
    }

    static async ObtenerProcesosPorIdAcceso({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdAcceso} = datos;
            const Solicitud = await conexion.request()
            .input('FKIdAcceso',sql.Int,FKIdAcceso)
            .execute('sp_ObtenerProcesosPorIdAcceso');
            const ResultadoQueryProceso = Solicitud.recordset;
            if(ResultadoQueryProceso.length > 0){
                const procesoContratacionConsultado = ResultadoQueryProceso[0];
                if(procesoContratacionConsultado.idProceso>0){
                    resultadoConsulta = {estado: 200, procesoContratacion:ResultadoQueryProceso}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else{
                resultadoConsulta = {estado: 404, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
            return resultadoConsulta;
        }
    }

    static async ObtenerProcesosPorIdEstado({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdEstadoProcesoContratacion} = datos;
            const Solicitud = await conexion.request()
            .input('FKIdEstadoProcesoContratacion',sql.Int,FKIdEstadoProcesoContratacion)
            .execute('sp_ObtenerProcesosPorIdEstado');
            const ResultadoQueryProceso = Solicitud.recordset;
            if(ResultadoQueryProceso.length > 0){
                const procesoContratacionConsultado = ResultadoQueryProceso[0];
                if(procesoContratacionConsultado.idProceso>0){
                    resultadoConsulta = {estado: 200, procesoContratacion:ResultadoQueryProceso}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else{
                resultadoConsulta = {estado: 404, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close(); 
            }
            return resultadoConsulta;
        }
    }

    static async ObtenerTodosLosProcesosContratacion()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .execute('sp_ObtenerTodosProcesosContratacion');
            const procesos = Solicitud.recordset;
            if(procesos.length > 0){
                resultadoConsulta = {estado: 200, procesos};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
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

    static async ObtenerNoBeneficiados()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .execute('sp_ObtenerProcesosNoBeneficiadosBolsa');
            const procesos = Solicitud.recordset;
            if(procesos.length > 0){
                resultadoConsulta = {estado: 200, procesos};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
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

    static async ObtenerDatosAnalistaParaEstadistica({datos})
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const {FKIdAcceso} = datos;
            const Solicitud = await conexion.request()
            .input('FKIdAcceso',sql.Int,FKIdAcceso)
            .execute('sp_ObtenerProcesosPorIdAccesoParaEstadistica');
            const evaluacionesAnalista = Solicitud.recordset;
            if(evaluacionesAnalista.length > 0){
                resultadoConsulta = {estado: 200, evaluacionesAnalista};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
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
    
    static async RegistrarControlVersion({datos})
    {
        let resultadoInsercion;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const{
                FKIdProceso,
                nombreCompleto,
                jsonDatos,                
            } = datos;            
            const Solicitud = await conexion.request()
            .input('FKIdProceso', sql.Int, FKIdProceso)
            .input('nombreCompleto', sql.VarChar(sql.MAX), nombreCompleto)
            .input('jsonDatos', sql.VarChar(sql.MAX), jsonDatos)            
            .execute('sp_RegistrarControlVersion');
            const ResultadoRegistroControlVersion = Solicitud.recordset;
            if(ResultadoRegistroControlVersion.length>0){
                const ControlVersion = ResultadoRegistroControlVersion[0];
                if(ControlVersion.idControlVersion>0){
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado:MensajeProcesoContratacion.REGISTRO_EXITOSO.resultado
                    };                
                }else{    
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
    
    static async ObtenerControlVersionesPorFKIdProceso(FKIdProceso)
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();            
            const Solicitud = await conexion.request()
            .input('FKIdProceso',sql.Int,FKIdProceso)
            .execute('sp_ObtenerControlVersionPorProceso');
            const ControlVersionQueryResultado = Solicitud.recordset;
            if(ControlVersionQueryResultado.length>0){
                const controlVersion=ControlVersionQueryResultado[0];
                if(controlVersion.idControlVersion>0){
                    resultadoConsulta = {estado: 200, controlesVersiones:ControlVersionQueryResultado}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: controlVersion.mensajeError || MensajeGeneralesBD.ERROR_DB };
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

    static async EliminarProcesoContratacionPorIdProceso(idProceso) {
        let resultadoEliminacion;
        let conexion;
        try {
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .input('idProceso', sql.Int, idProceso)
            .execute('sp_EliminarProcesoContratacion');
            const registro = Solicitud.recordset[0];
            if(registro.idProceso>0){
                resultadoEliminacion = {
                    estado: 200,
                    mensaje: MensajeProcesoContratacion.ELIMINACION_EXITOSA
                };
            }else if (registro.idProceso === -1) {                
                resultadoEliminacion = {
                    estado: 500,
                    mensaje: MensajeGeneralesBD.ERROR_DB
                };                                              
            } else {  
                resultadoEliminacion = {
                    estado: 404,
                    mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE
                };                
            }
        } catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoEliminacion;
    }

    static async RegistrarActualizarOficio({datos}){
        let resultadoInsercion;
        let conexion;
        try{
            conexion = await obtenerConexion();
            const {
                idOficio,
                FKIdProcesoContratacion,
                folio,
                fecha,
                dirigido,
                puestoDirigido,
                machote,
                piePagina,
                tipo,
            } = datos;
            const Solicitud = await conexion.request()
            .input('idOficio', sql.Int, idOficio)
            .input('FKIdProcesoContratacion', sql.Int,FKIdProcesoContratacion)
            .input('folio',sql.VarChar(sql.MAX),folio)
            .input('fecha',sql.VarChar(sql.MAX),fecha)
            .input('dirigido',sql.VarChar(sql.MAX),dirigido)
            .input('puestoDirigido', sql.VarChar(sql.MAX),puestoDirigido)
            .input('machote',sql.VarChar(sql.MAX),machote)
            .input('piePagina',sql.VarChar(sql.MAX),piePagina)
            .input('tipo',sql.VarChar(sql.MAX),tipo)
            .execute('sp_GuardarOficioConProceso');
            const Resultado = Solicitud.recordset;
            if(Resultado.length>0){
                const Registro = Resultado[0];
                if(Registro.Resultado > 0){
                    resultadoInsercion ={
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado:MensajeProcesoContratacion.REGISTRO_EXITOSO.resultado
                    };
                }else{
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: MensajeGeneralesBD.ERROR_DB.resultado
                    };
                }
            }
        }catch (error){
            throw error;
        }finally {
            if(conexion){
                conexion.close();
            }
        }
        return resultadoInsercion;
    }

    static async ObtenerOficiosPorIdProceso(FKIdProcesoContratacion)
    {
        let resultadoConsulta;
        let conexion;
        try{
            conexion = await obtenerConexion();
            const Solicitud = await conexion.request()
            .input('FKIdProcesoContratacion',sql.Int,FKIdProcesoContratacion)
            .execute('sp_ObtenerOficiosPorProceso');
            const ResultadoQueryResultado = Solicitud.recordset;
            if(ResultadoQueryResultado.length>0){
                const resultadoConsultado=ResultadoQueryResultado[0];
                if(resultadoConsultado.Resultado>0){
                    resultadoConsulta = {estado: 200, oficios:ResultadoQueryResultado}
                }else{
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            }else {
                resultadoConsulta = { estado: 404, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE};
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