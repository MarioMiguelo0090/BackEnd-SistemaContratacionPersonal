import { ValidarEdicionParcialProcesoContratacion } from "../esquemas/ProcesoContratacionValidador.js";
import { logger } from "../utilidades/logger.js";

export class ProcesoContratacionControlador 
{
    constructor({ModeloProcesoContratacion})
    {
        this.modeloProcesoContratacion=ModeloProcesoContratacion;
    }

    RegistrarProcesoContratacion = async (req,res) =>
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloProcesoContratacion.InsertarNuevoProcesoContratacion({datos: ResultadoValidacion.data});                
                res.status(ResultadoInsercion.estado).json({
                    error: ResultadoInsercion.estado !== 200,
                    estado: ResultadoInsercion.estado,
                    mensaje: ResultadoInsercion.mensaje
                });
            }else {
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    EditarProcesoContratacionExistente = async (req,res) =>
    {        
        try
        {
            const idProceso = parseInt(req.params["idProceso"])
            const {folio,
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
                FKIdAcceso}=req.body;
            const Datos = {
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
                FKIdAcceso };
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoEdicion = await this.modeloProcesoContratacion.EditarProcesoContratacion({datos: ResultadoValidacion.data});
                res.status(ResultadoEdicion.estado).json({
                    error: ResultadoEdicion.estado !== 200,
                    estado: ResultadoEdicion.estado,
                    mensaje: ResultadoEdicion.mensaje
                });
            }else{
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }
        catch(error)
        {            
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }       
    }

    ObtenerProcesoContratacionPorFolioHermes = async (req,res) =>
    {
        try
        {
            const {folio, hermesNotificacion} = req.body;
            const Datos = {folio,hermesNotificacion};
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesoContratacionPorFolioHermesNotificacion({datos: ResultadoValidacion.data});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : {mensaje: ResultadoConsulta.mensaje}
                    )
                });
            }else{
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }catch(error){    
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }       
    }

    ObtenerProcesoPorFKIdAcceso = async(req,res) =>
    {
        try
        {
            const FKIdAcceso = parseInt(req.params['FKIdAcceso']);
            const Datos = {FKIdAcceso};
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesosPorIdAcceso({datos: ResultadoValidacion.data});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : {mensaje: ResultadoConsulta.mensaje}
                    )
                });
            }else{
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }catch(error){  
            logger({mensaje:error});              
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }       
    } 

    ObtenerProcesosPorFKIdEstado = async(req,res) => 
    {
        try
        {
            const FKIdEstadoProcesoContratacion = parseInt(req.params['FKIdEstadoProcesoContratacion']);
            const Datos = {FKIdEstadoProcesoContratacion};
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesosPorIdEstado({datos: ResultadoValidacion.data});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : {mensaje: ResultadoConsulta.mensaje}
                    )
                });
            }else{
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }catch(error){  
            logger({mensaje:error});              
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerProcesosContratacion = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerTodosLosProcesosContratacion();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? {procesos: ResultadoConsulta.procesos}
                    : {mensaje: ResultadoConsulta.mensaje}
                )
            });            
        }catch(error)
        {
            logger({mensaje:error});
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }
}