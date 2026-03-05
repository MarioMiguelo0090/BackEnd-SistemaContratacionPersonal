import { MensajeGeneralesBD, MensajeProcesoContratacion, MensajeResultado, CodigosDeEstado} from '../../utilidades/Constantes.js';
import { obtenerConexion } from './config/config.js';
import { QueryTypes } from 'sequelize';
import { Cifrar, Descifrar } from '../../utilidades/Cifrado.js';

export class ModeloProcesoContratacion {

    static async InsertarNuevoProcesoContratacion({ datos, bitacoraFn, tipoDeAcceso}) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const {
                folio, numPlaza, fechaRecibido, fechaEntrevista, resultadoEvaluacionConocimiento,
                fechaEnvioDEyDP, fechaNotificacion, categoriaPuestoOrigen, diasProceso, beneficiado,
                FKIdTipoProceso, FKIdTipoPersonal, FKIdEstadoProcesoContratacion, FKIdTemporalDefinitiva,
                FKIdDependencia, hermesNotificacion, titularPlaza, lineamientoOficioContinuidad, motivo,
                fechaElaboracionPropuesta, fechaLiberacionOficio, periodoAutorizadoOficioInicio,
                periodoAutorizadoOficioFin, categoriaAutorizadaOficio, observaciones, numCarpeta,
                nombreCandidato, funcionDesempeniar, familiaFuncional, fechaEvaluacionCompetencias,
                fechaInicioProcesamiento, resultadoEvaluacionCompetencias, experienciaLaboralSolicitada,
                resultadoReferenciasLaborales, fechaEnvioEvaluacionDesempenio, resultadoHabilidadesWord,
                resultadoHabilidadesExcel, resultadoOrtografia, resultadoProcesoEvaluacion,
                fechaRevisionOfiEval, observacionesAnalista, consecutivoExpediente,
                resultadoSeguimientoEvaluacionDesempenio, FKIdAcceso, autorizacion,
            } = datos;

            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_RegistrarProcesoContratacion
                @folio = :folio, @numPlaza = :numPlaza, @fechaRecibido = :fechaRecibido,
                @fechaEntrevista = :fechaEntrevista, @resultadoEvaluacionConocimiento = :resultadoEvaluacionConocimiento,
                @fechaEnvioDEyDP = :fechaEnvioDEyDP, @fechaNotificacion = :fechaNotificacion,
                @categoriaPuestoOrigen = :categoriaPuestoOrigen, @diasProceso = :diasProceso,
                @beneficiado = :beneficiado, @FKIdTipoProceso = :FKIdTipoProceso,
                @FKIdTipoPersonal = :FKIdTipoPersonal, @FKIdEstadoProcesoContratacion = :FKIdEstadoProcesoContratacion,
                @FKIdTemporalDefinitiva = :FKIdTemporalDefinitiva, @FKIdDependencia = :FKIdDependencia,
                @hermesNotificacion = :hermesNotificacion, @titularPlaza = :titularPlaza,
                @lineamientoOficioContinuidad = :lineamientoOficioContinuidad, @motivo = :motivo,
                @fechaElaboracionPropuesta = :fechaElaboracionPropuesta, @fechaLiberacionOficio = :fechaLiberacionOficio,
                @periodoAutorizadoOficioInicio = :periodoAutorizadoOficioInicio, @periodoAutorizadoOficioFin = :periodoAutorizadoOficioFin,
                @categoriaAutorizadaOficio = :categoriaAutorizadaOficio, @observaciones = :observaciones,
                @numCarpeta = :numCarpeta, @nombreCandidato = :nombreCandidato,
                @funcionDesempeniar = :funcionDesempeniar, @familiaFuncional = :familiaFuncional,
                @fechaEvaluacionCompetencias = :fechaEvaluacionCompetencias, @fechaInicioProcesamiento = :fechaInicioProcesamiento,
                @resultadoEvaluacionCompetencias = :resultadoEvaluacionCompetencias, @experienciaLaboralSolicitada = :experienciaLaboralSolicitada,
                @resultadoReferenciasLaborales = :resultadoReferenciasLaborales, @fechaEnvioEvaluacionDesempenio = :fechaEnvioEvaluacionDesempenio,
                @resultadoHabilidadesWord = :resultadoHabilidadesWord, @resultadoHabilidadesExcel = :resultadoHabilidadesExcel,
                @resultadoOrtografia = :resultadoOrtografia, @resultadoProcesoEvaluacion = :resultadoProcesoEvaluacion,
                @fechaRevisionOfiEval = :fechaRevisionOfiEval, @observacionesAnalista = :observacionesAnalista,
                @consecutivoExpediente = :consecutivoExpediente, @resultadoSeguimientoEvaluacionDesempenio = :resultadoSeguimientoEvaluacionDesempenio,
                @FKIdAcceso = :FKIdAcceso, @autorizacion = :autorizacion`,
                {
                    replacements: {
                        folio: Cifrar(folio), numPlaza: Cifrar(numPlaza), fechaRecibido: Cifrar(fechaRecibido), fechaEntrevista: Cifrar(fechaEntrevista), resultadoEvaluacionConocimiento: Cifrar(resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Cifrar(fechaEnvioDEyDP), fechaNotificacion: Cifrar(fechaNotificacion), categoriaPuestoOrigen: Cifrar(categoriaPuestoOrigen), diasProceso: Cifrar(diasProceso),
                        beneficiado: beneficiado ? 1 : 0, FKIdTipoProceso, FKIdTipoPersonal,
                        FKIdEstadoProcesoContratacion, FKIdTemporalDefinitiva, FKIdDependencia,
                        hermesNotificacion: Cifrar(hermesNotificacion), titularPlaza: Cifrar(titularPlaza), lineamientoOficioContinuidad: Cifrar(lineamientoOficioContinuidad), motivo: Cifrar(motivo),
                        fechaElaboracionPropuesta: Cifrar(fechaElaboracionPropuesta), fechaLiberacionOficio: Cifrar(fechaLiberacionOficio), periodoAutorizadoOficioInicio: Cifrar(periodoAutorizadoOficioInicio),
                        periodoAutorizadoOficioFin: Cifrar(periodoAutorizadoOficioFin), categoriaAutorizadaOficio: Cifrar(categoriaAutorizadaOficio), observaciones: Cifrar(observaciones), numCarpeta: Cifrar(numCarpeta),
                        nombreCandidato: Cifrar(nombreCandidato), funcionDesempeniar: Cifrar(funcionDesempeniar), familiaFuncional: Cifrar(familiaFuncional), fechaEvaluacionCompetencias: Cifrar(fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Cifrar(fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Cifrar(resultadoEvaluacionCompetencias), experienciaLaboralSolicitada: Cifrar(experienciaLaboralSolicitada),
                        resultadoReferenciasLaborales: Cifrar(resultadoReferenciasLaborales), fechaEnvioEvaluacionDesempenio: Cifrar(fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Cifrar(resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Cifrar(resultadoHabilidadesExcel), resultadoOrtografia: Cifrar(resultadoOrtografia), resultadoProcesoEvaluacion: Cifrar(resultadoProcesoEvaluacion),
                        fechaRevisionOfiEval: Cifrar(fechaRevisionOfiEval), observacionesAnalista: Cifrar(observacionesAnalista), consecutivoExpediente: Cifrar(consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Cifrar(resultadoSeguimientoEvaluacionDesempenio), FKIdAcceso, autorizacion: autorizacion ? 1 : 0
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoProcesoContratacion = resultadoProcedimiento[0];
            if (ResultadoProcesoContratacion.length > 0) {
                const ProcesoContratacion = ResultadoProcesoContratacion[0];
                if (ProcesoContratacion.idProceso > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha registrado un nuevo proceso de contratacion`)
                    }
                    await transaction.commit();
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado: CodigosDeEstado.OK
                    };
                } else if (ProcesoContratacion.idProceso == -2) {
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_DUPLICADO,
                        estado: CodigosDeEstado.Conflict
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: CodigosDeEstado.InternalServerError
                    };
                }
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarProcesoContratacion({ datos, bitacoraFn, tipoDeAcceso}) {
        let resultadoEdicion;
        let transaction;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            transaction = await sequelize.transaction();
            const {
                idProceso, folio, numPlaza, fechaRecibido, fechaEntrevista, resultadoEvaluacionConocimiento,
                fechaEnvioDEyDP, fechaNotificacion, categoriaPuestoOrigen, diasProceso, beneficiado,
                FKIdTipoProceso, FKIdTipoPersonal, FKIdEstadoProcesoContratacion, FKIdTemporalDefinitiva,
                FKIdDependencia, hermesNotificacion, titularPlaza, lineamientoOficioContinuidad, motivo,
                fechaElaboracionPropuesta, fechaLiberacionOficio, periodoAutorizadoOficioInicio,
                periodoAutorizadoOficioFin, categoriaAutorizadaOficio, observaciones, numCarpeta,
                nombreCandidato, funcionDesempeniar, familiaFuncional, fechaEvaluacionCompetencias,
                fechaInicioProcesamiento, resultadoEvaluacionCompetencias, experienciaLaboralSolicitada,
                resultadoReferenciasLaborales, fechaEnvioEvaluacionDesempenio, resultadoHabilidadesWord,
                resultadoHabilidadesExcel, resultadoOrtografia, resultadoProcesoEvaluacion,
                fechaRevisionOfiEval, observacionesAnalista, consecutivoExpediente,
                resultadoSeguimientoEvaluacionDesempenio, FKIdAcceso, seguimientoEvaluacionDesempenio,
                educacionFormal, avaladoPor, fechaAsignacionAnalista, capacitado, citaVirtual, atendioCita,
            } = datos;

            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ActualizarProcesoContratacion
                @idProceso = :idProceso, @folio = :folio, @numPlaza = :numPlaza,
                @fechaRecibido = :fechaRecibido, @fechaEntrevista = :fechaEntrevista,
                @resultadoEvaluacionConocimiento = :resultadoEvaluacionConocimiento,
                @fechaEnvioDEyDP = :fechaEnvioDEyDP, @fechaNotificacion = :fechaNotificacion,
                @categoriaPuestoOrigen = :categoriaPuestoOrigen, @diasProceso = :diasProceso,
                @beneficiado = :beneficiado, @FKIdTipoProceso = :FKIdTipoProceso,
                @FKIdTipoPersonal = :FKIdTipoPersonal, @FKIdEstadoProcesoContratacion = :FKIdEstadoProcesoContratacion,
                @FKIdTemporalDefinitiva = :FKIdTemporalDefinitiva, @FKIdDependencia = :FKIdDependencia,
                @hermesNotificacion = :hermesNotificacion, @titularPlaza = :titularPlaza,
                @lineamientoOficioContinuidad = :lineamientoOficioContinuidad, @motivo = :motivo,
                @fechaElaboracionPropuesta = :fechaElaboracionPropuesta, @fechaLiberacionOficio = :fechaLiberacionOficio,
                @periodoAutorizadoOficioInicio = :periodoAutorizadoOficioInicio, @periodoAutorizadoOficioFin = :periodoAutorizadoOficioFin,
                @categoriaAutorizadaOficio = :categoriaAutorizadaOficio, @observaciones = :observaciones,
                @numCarpeta = :numCarpeta, @nombreCandidato = :nombreCandidato,
                @funcionDesempeniar = :funcionDesempeniar, @familiaFuncional = :familiaFuncional,
                @fechaEvaluacionCompetencias = :fechaEvaluacionCompetencias, @fechaInicioProcesamiento = :fechaInicioProcesamiento,
                @resultadoEvaluacionCompetencias = :resultadoEvaluacionCompetencias, @experienciaLaboralSolicitada = :experienciaLaboralSolicitada,
                @resultadoReferenciasLaborales = :resultadoReferenciasLaborales, @fechaEnvioEvaluacionDesempenio = :fechaEnvioEvaluacionDesempenio,
                @resultadoHabilidadesWord = :resultadoHabilidadesWord, @resultadoHabilidadesExcel = :resultadoHabilidadesExcel,
                @resultadoOrtografia = :resultadoOrtografia, @resultadoProcesoEvaluacion = :resultadoProcesoEvaluacion,
                @fechaRevisionOfiEval = :fechaRevisionOfiEval, @observacionesAnalista = :observacionesAnalista,
                @consecutivoExpediente = :consecutivoExpediente, @seguimientoEvaluacionDesempenio = :seguimientoEvaluacionDesempenio,
                @resultadoSeguimientoEvaluacionDesempenio = :resultadoSeguimientoEvaluacionDesempenio,
                @FKIdAcceso = :FKIdAcceso, @educacionFormal = :educacionFormal, @avaladoPor = :avaladoPor,
                @fechaAsignacionAnalista = :fechaAsignacionAnalista, @capacitado = :capacitado`,
                {
                    replacements: {
                        idProceso,
                        folio: Cifrar(folio), numPlaza: Cifrar(numPlaza), fechaRecibido: Cifrar(fechaRecibido), fechaEntrevista: Cifrar(fechaEntrevista), resultadoEvaluacionConocimiento: Cifrar(resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Cifrar(fechaEnvioDEyDP), fechaNotificacion: Cifrar(fechaNotificacion), categoriaPuestoOrigen: Cifrar(categoriaPuestoOrigen), diasProceso: Cifrar(diasProceso),
                        beneficiado: beneficiado ? 1 : 0, FKIdTipoProceso, FKIdTipoPersonal,
                        FKIdEstadoProcesoContratacion, FKIdTemporalDefinitiva, FKIdDependencia,
                        hermesNotificacion: Cifrar(hermesNotificacion), titularPlaza: Cifrar(titularPlaza), lineamientoOficioContinuidad: Cifrar(lineamientoOficioContinuidad), motivo: Cifrar(motivo),
                        fechaElaboracionPropuesta: Cifrar(fechaElaboracionPropuesta), fechaLiberacionOficio: Cifrar(fechaLiberacionOficio), periodoAutorizadoOficioInicio: Cifrar(periodoAutorizadoOficioInicio),
                        periodoAutorizadoOficioFin: Cifrar(periodoAutorizadoOficioFin), categoriaAutorizadaOficio: Cifrar(categoriaAutorizadaOficio), observaciones: Cifrar(observaciones), numCarpeta: Cifrar(numCarpeta),
                        nombreCandidato: Cifrar(nombreCandidato), funcionDesempeniar: Cifrar(funcionDesempeniar), familiaFuncional: Cifrar(familiaFuncional), fechaEvaluacionCompetencias: Cifrar(fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Cifrar(fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Cifrar(resultadoEvaluacionCompetencias), experienciaLaboralSolicitada: Cifrar(experienciaLaboralSolicitada),
                        resultadoReferenciasLaborales: Cifrar(resultadoReferenciasLaborales), fechaEnvioEvaluacionDesempenio: Cifrar(fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Cifrar(resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Cifrar(resultadoHabilidadesExcel), resultadoOrtografia: Cifrar(resultadoOrtografia), resultadoProcesoEvaluacion: Cifrar(resultadoProcesoEvaluacion),
                        fechaRevisionOfiEval: Cifrar(fechaRevisionOfiEval), observacionesAnalista: Cifrar(observacionesAnalista), consecutivoExpediente: Cifrar(consecutivoExpediente),
                        seguimientoEvaluacionDesempenio: seguimientoEvaluacionDesempenio ? 1 : 0,
                        resultadoSeguimientoEvaluacionDesempenio: Cifrar(resultadoSeguimientoEvaluacionDesempenio), FKIdAcceso,
                        educacionFormal: Cifrar(educacionFormal), avaladoPor: Cifrar(avaladoPor), fechaAsignacionAnalista: Cifrar(fechaAsignacionAnalista),
                        capacitado: capacitado ? 1 : 0
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoSP = resultadoProcedimiento[0]?.[0]?.Resultado;
            if (ResultadoSP === 1) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha editado el proceso de contratación con ID: ${idProceso}`)
                }
                await transaction.commit();
                resultadoEdicion = {
                    ...MensajeProcesoContratacion.ACTUALIZACION_EXITOSA,
                    estado: CodigosDeEstado.OK
                };
            } else if (ResultadoSP == 2) {
                resultadoEdicion = {
                    ...MensajeProcesoContratacion.PROCESO_INEXISTENTE,
                    estado: CodigosDeEstado.NotFound
                };
            } else {
                resultadoEdicion = {
                    ...MensajeGeneralesBD.ERROR_DB,
                    estado: CodigosDeEstado.InternalServerError
                };
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoEdicion;
    }

    static async ObtenerProcesoContratacionPorIdProceso({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { idProceso } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerProcesoPorIdProceso @idProceso = :idProceso`,
                { replacements: { idProceso }, type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, procesoContratacion: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerProcesosPorIdAcceso({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdAcceso } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerProcesosPorIdAcceso @FKIdAcceso = :FKIdAcceso`,
                { replacements: { FKIdAcceso }, type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, procesoContratacion: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: categoriaAutorizadaOficio.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerProcesosPorIdEstado({ datos, tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdEstadoProcesoContratacion } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerProcesosPorIdEstado @FKIdEstadoProcesoContratacion = :FKIdEstadoProcesoContratacion`,
                { replacements: { FKIdEstadoProcesoContratacion }, type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, procesoContratacion: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTodosLosProcesosContratacion({tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTodosProcesosContratacion`,
                { type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, procesos: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerNoBeneficiados({tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerProcesosNoBeneficiadosBolsa`,
                { type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, procesos: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerDatosAnalistaParaEstadistica({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdAcceso } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerProcesosPorIdAccesoParaEstadistica @FKIdAcceso = :FKIdAcceso`,
                { replacements: { FKIdAcceso }, type: QueryTypes.RAW }
            );
            let ResultadoQueryProceso = resultadoProcedimiento[0];
            if (ResultadoQueryProceso.length > 0) {
                ResultadoQueryProceso = ResultadoQueryProceso.map(proceso => {
                    return {
                        ...proceso,
                        folio: Descifrar(proceso.folio), numPlaza: Descifrar(proceso.numPlaza),
                        fechaRecibido: Descifrar(proceso.fechaRecibido), fechaEntrevista: Descifrar(proceso.fechaEntrevista),
                        resultadoEvaluacionConocimiento: Descifrar(proceso.resultadoEvaluacionConocimiento),
                        fechaEnvioDEyDP: Descifrar(proceso.fechaEnvioDEyDP), fechaNotificacion: Descifrar(proceso.fechaNotificacion),
                        categoriaPuestoOrigen: Descifrar(proceso.categoriaPuestoOrigen), diasProceso: Descifrar(proceso.diasProceso),
                        hermesNotificacion: Descifrar(proceso.hermesNotificacion), titularPlaza: Descifrar(proceso.titularPlaza),
                        lineamientoOficioContinuidad: Descifrar(proceso.lineamientoOficioContinuidad), motivo: Descifrar(proceso.motivo),
                        fechaElaboracionPropuesta: Descifrar(proceso.fechaElaboracionPropuesta), fechaLiberacionOficio: Descifrar(proceso.fechaLiberacionOficio),
                        periodoAutorizadoOficioInicio: Descifrar(proceso.periodoAutorizadoOficioInicio), periodoAutorizadoOficioFin: Descifrar(proceso.periodoAutorizadoOficioFin),
                        observaciones: Descifrar(proceso.observaciones), numCarpeta: Descifrar(proceso.numCarpeta),
                        nombreCandidato: Descifrar(proceso.nombreCandidato), funcionDesempeniar: Descifrar(proceso.funcionDesempeniar),
                        familiaFuncional: Descifrar(proceso.familiaFuncional), fechaEvaluacionCompetencias: Descifrar(proceso.fechaEvaluacionCompetencias),
                        fechaInicioProcesamiento: Descifrar(proceso.fechaInicioProcesamiento), resultadoEvaluacionCompetencias: Descifrar(proceso.resultadoEvaluacionCompetencias),
                        experienciaLaboralSolicitada: Descifrar(proceso.experienciaLaboralSolicitada), resultadoReferenciasLaborales: Descifrar(proceso.resultadoReferenciasLaborales),
                        fechaEnvioEvaluacionDesempenio: Descifrar(proceso.fechaEnvioEvaluacionDesempenio), resultadoHabilidadesWord: Descifrar(proceso.resultadoHabilidadesWord),
                        resultadoHabilidadesExcel: Descifrar(proceso.resultadoHabilidadesExcel), resultadoOrtografia: Descifrar(proceso.resultadoOrtografia),
                        resultadoProcesoEvaluacion: Descifrar(proceso.resultadoProcesoEvaluacion), fechaRevisionOfiEval: Descifrar(proceso.fechaRevisionOfiEval),
                        observacionesAnalista: Descifrar(proceso.observacionesAnalista), consecutivoExpediente: Descifrar(proceso.consecutivoExpediente),
                        resultadoSeguimientoEvaluacionDesempenio: Descifrar(proceso.resultadoSeguimientoEvaluacionDesempenio), nombre: Descifrar(proceso.nombre), primerApellido: Descifrar(proceso.primerApellido),
                        segundoApellido: Descifrar(proceso.segundoApellido)
                    };
                });
                if (ResultadoQueryProceso[0].idProceso > 0) {
                    
                    resultadoConsulta = { estado: CodigosDeEstado.OK, evaluacionesAnalista: ResultadoQueryProceso };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async RegistrarControlVersion({ datos, bitacoraFn, tipoDeAcceso}) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const { FKIdProceso, nombreCompleto, jsonDatos } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_RegistrarControlVersion
                @FKIdProceso = :FKIdProceso, @nombreCompleto = :nombreCompleto, @jsonDatos = :jsonDatos`,
                {
                    replacements: { FKIdProceso, nombreCompleto, jsonDatos },
                    type: QueryTypes.RAW
                }
            );
            const ResultadoRegistroControlVersion = resultadoProcedimiento[0];
            if (ResultadoRegistroControlVersion.length > 0) {
                const ControlVersion = ResultadoRegistroControlVersion[0];
                if (ControlVersion.idControlVersion > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha hecho un registro dentro del control de versiones`)
                    }
                    transaction.commit();
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado: CodigosDeEstado.OK
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: CodigosDeEstado.InternalServerError
                    };
                }
            }
        } catch (error) {
            if(transaction){
                transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async ObtenerControlVersionesPorFKIdProceso(FKIdProceso, {tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerControlVersionPorProceso @FKIdProceso = :FKIdProceso`,
                { replacements: { FKIdProceso }, type: QueryTypes.RAW }
            );
            const ControlVersionQueryResultado = resultadoProcedimiento[0];
            if (ControlVersionQueryResultado.length > 0) {
                const controlVersion = ControlVersionQueryResultado[0];
                if (controlVersion.idControlVersion > 0) {
                    resultadoConsulta = { estado: CodigosDeEstado.OK, controlesVersiones: ControlVersionQueryResultado };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: controlVersion.mensajeError || MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeGeneralesBD.ERROR_DB };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async EliminarProcesoContratacionPorIdProceso(idProceso, {bitacoraFn, tipoDeAcceso}) {
        let resultadoEliminacion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_EliminarProcesoContratacion @idProceso = :idProceso`,
                { replacements: { idProceso }, type: QueryTypes.RAW }
            );
            const registro = resultadoProcedimiento[0]?.[0];
            if (registro.idProceso > 0) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha eliminado un proceso de contratacion con id: ${idProceso}`);
                }
                await transaction.commit();
                resultadoEliminacion = { estado: CodigosDeEstado.OK, mensaje: MensajeProcesoContratacion.ELIMINACION_EXITOSA };
            } else if (registro.idProceso === -1) {
                resultadoEliminacion = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
            } else {
                resultadoEliminacion = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoEliminacion;
    }

    static async RegistrarActualizarOficio({ datos, bitacoraFn, tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const { idOficio, FKIdProcesoContratacion, folio, fecha, dirigido, puestoDirigido, machote, piePagina, tipo } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_GuardarOficioConProceso
                @idOficio = :idOficio, @FKIdProcesoContratacion = :FKIdProcesoContratacion,
                @folio = :folio, @fecha = :fecha, @dirigido = :dirigido,
                @puestoDirigido = :puestoDirigido, @machote = :machote,
                @piePagina = :piePagina, @tipo = :tipo`,
                {
                    replacements: { idOficio, FKIdProcesoContratacion, folio: Cifrar(folio), fecha: Cifrar(fecha), dirigido: Cifrar(dirigido), 
                        puestoDirigido: Cifrar(puestoDirigido), machote: Cifrar(machote), piePagina: Cifrar(piePagina), tipo: Cifrar(tipo) },
                    type: QueryTypes.RAW
                }
            );
            const Resultado = resultadoProcedimiento[0];
            if (Resultado.length > 0) {
                const Registro = Resultado[0];
                if (Registro.Resultado > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha registrado la actualización de un oficio asociado al proceso de contratación: ${FKIdProcesoContratacion}`);
                    }
                    transaction.commit();
                    resultadoInsercion = {
                        ...MensajeProcesoContratacion.REGISTRO_EXITOSO,
                        estado: CodigosDeEstado.OK
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: CodigosDeEstado.InternalServerError
                    };
                }
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async ObtenerOficiosPorIdProceso(FKIdProcesoContratacion, {tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerOficiosPorProceso @FKIdProcesoContratacion = :FKIdProcesoContratacion`,
                { replacements: { FKIdProcesoContratacion }, type: QueryTypes.RAW }
            );
            const ResultadoQueryResultado = resultadoProcedimiento[0];
            if (ResultadoQueryResultado.length > 0) {
                const resultadoConsultado = ResultadoQueryResultado[0];
                if (resultadoConsultado.Resultado > 0) {
                    resultadoConsulta = { estado: CodigosDeEstado.OK, oficios: ResultadoQueryResultado };
                } else {
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async RegistrarActualizarSeguimientoHermes({ datos, bitacoraFn, tipoDeAcceso }) {
        let resultado;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction; 
        try {
            transaction = await sequelize.transaction();
            let resultadoInsercion;
            let lastFolio;
            for (const r of datos) {
                lastFolio = r.folio;
                resultadoInsercion = await sequelize.query(
                    `EXEC sp_InsertarSeguimientoHermes
                    @folio = :folio, @fechaRecepcion = :fechaRecepcion, @importancia = :importancia,
                    @tipoEnvio = :tipoEnvio, @requiereRespuesta = :requiereRespuesta, @solicita = :solicita,
                    @entidadDependencia = :entidadDependencia, @asunto = :asunto, @estatus = :estatus, @acciones = :acciones`,
                    {
                        replacements: {
                            folio: r.folio, fechaRecepcion: Cifrar(r.fechaRecepcion), importancia: Cifrar(r.importancia),
                            tipoEnvio: Cifrar(r.tipoEnvio), requiereRespuesta: r.requiereRespuesta, solicita: Cifrar(r.solicita),
                            entidadDependencia: Cifrar(r.entidadDependencia), asunto: Cifrar(r.asunto), estatus: Cifrar(r.estatus), acciones: Cifrar(r.acciones)
                        },
                        type: QueryTypes.RAW,
                        transaction
                    }
                );
            }
            const res = resultadoInsercion[0][0].resultado;
            if(res === 1){
                if(bitacoraFn){
                    await bitacoraFn(`Se ha registrado el seguimiento hermes con folio: ${lastFolio}`)
                }
                await transaction.commit();
                resultado = {estado: CodigosDeEstado.OK, mensaje: MensajeResultado.REGISTRO_EXITOSO}
            }else if(res === 2){
                resultado = {estado: CodigosDeEstado.Conflict, mensaje: 'Ya se ha registrado el frolio del seguimiento hermes ingresado.'}
            }else{
                await transaction.rollback();
                resultado = {estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB}
            }
            
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
        return resultado;
    }

    static async ObtenerTodosSeguimientoHermes({tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerSeguimientoHermes`,
                { type: QueryTypes.RAW }
            );
            let seguimientos = resultadoProcedimiento[0];
            if (seguimientos.length > 0) {
                seguimientos = seguimientos.map(s => {
                    return {
                        ...s,
                        fechaRecepcion: Descifrar(s.fechaRecepcion), importancia: Descifrar(s.importancia),
                        tipoEnvio: Descifrar(s.tipoEnvio), solicita: Descifrar(s.solicita),
                        entidadDependencia: Descifrar(s.entidadDependencia), asunto: Descifrar(s.asunto),
                        estatus: Descifrar(s.estatus), acciones: Descifrar(s.acciones)
                    };
                });
                resultadoConsulta = { estado: CodigosDeEstado.OK, seguimientos };
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeProcesoContratacion.PROCESO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }
}