import { ValidarEdicionParcialControlVersiones, ValidarEdicionParcialProcesoContratacion,ValidarEdicionParcialOficio } from "../esquemas/ProcesoContratacionValidador.js";
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
                const ResultadoInsercion = await this.modeloProcesoContratacion.InsertarNuevoProcesoContratacion({datos: ResultadoValidacion.data, bitacoraFn: req.Bitacora, tipoDeAcceso: req.tipoDeAcceso});                
                console.log(ResultadoInsercion)
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
                seguimientoEvaluacionDesempenio,
                resultadoSeguimientoEvaluacionDesempenio,
                FKIdAcceso,
                educacionFormal,
                avaladoPor,
                fechaAsignacionAnalista,
                capacitado,
                citaVirtual,
                atendioCita,}=req.body;
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
                seguimientoEvaluacionDesempenio,
                resultadoSeguimientoEvaluacionDesempenio,
                FKIdAcceso,
                educacionFormal,
                avaladoPor,
                fechaAsignacionAnalista,
                capacitado,
                citaVirtual,
                atendioCita };
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if (ResultadoValidacion.success) {
                const ResultadoEdicion = await this.modeloProcesoContratacion.EditarProcesoContratacion({ datos: ResultadoValidacion.data, bitacoraFn: req.Bitacora, tipoDeAcceso: req.tipoDeAcceso });
                res.status(ResultadoEdicion.estado).json({
                    error: ResultadoEdicion.estado !== 200,
                    estado: ResultadoEdicion.estado,
                    mensaje: ResultadoEdicion.mensaje
                });
            } else {
                let errores = [];
                if (ResultadoValidacion.error?.errors) {
                    errores = ResultadoValidacion.error.errors.map(e => ({
                        campo: e.path.join('.'),
                        mensaje: e.message
                    }));
                }
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Algunos campos contienen errores.',
                    detalles: errores
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

    ObtenerProcesoContratacionPorIdProceso = async (req,res) =>
    {
        try
        {
            const {idProceso} = req.body;
            const Datos = {idProceso};
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesoContratacionPorIdProceso({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : ResultadoConsulta.mensaje
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
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesosPorIdAcceso({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : ResultadoConsulta.mensaje
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
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerProcesosPorIdEstado({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {procesoContratacion: ResultadoConsulta.procesoContratacion}
                        : ResultadoConsulta.mensaje
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
            const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerTodosLosProcesosContratacion({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? {procesos: ResultadoConsulta.procesos}
                    : ResultadoConsulta.mensaje
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

    ObtenerTodosNoBeneficiados = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerNoBeneficiados({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? {procesos: ResultadoConsulta.procesos}
                    : ResultadoConsulta.mensaje
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

    ObtenerDatosAnalistaParaEstadistica = async(req,res) =>
    {
        try
        {
            const FKIdAcceso = parseInt(req.params['FKIdAcceso']);
            const Datos = {FKIdAcceso};
            const ResultadoValidacion = ValidarEdicionParcialProcesoContratacion(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerDatosAnalistaParaEstadistica({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {evaluacionesAnalista: ResultadoConsulta.evaluacionesAnalista}
                        : ResultadoConsulta.mensaje
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

    RegistrarControlVersionNuevo = async (req,res) =>
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialControlVersiones(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloProcesoContratacion.RegistrarControlVersion({ datos: ResultadoValidacion.data, bitacoraFn: req.Bitacora, tipoDeAcceso: req.tipoDeAcceso });                
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

    ObtenerRegistrosControlVersionesPorFKIdProceso = async(req,res) =>
    {
        try
        {
            const FKIdProceso = parseInt(req.params['FKIdProceso']);
            const Datos = {FKIdProceso};
            const ResultadoValidacion = ValidarEdicionParcialControlVersiones(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerControlVersionesPorFKIdProceso(FKIdProceso, {tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {controlesVersiones: ResultadoConsulta.controlesVersiones}
                        : ResultadoConsulta.mensaje
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

    EliminarSolicitudPorIdProceso = async (req, res) => {
        try {
            const idProceso = parseInt(req.params['idProceso']);
            if (isNaN(idProceso)) {
                return res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'El idProceso enviado no es válido.'
                });
            }
            const ResultadoEliminacion = await this.modeloProcesoContratacion.EliminarProcesoContratacionPorIdProceso(idProceso, {bitacoraFn: req.Bitacora,tipoDeAcceso: req.tipoDeAcceso});
            const estadoRespuesta = parseInt(ResultadoEliminacion.estado);
            res.status(estadoRespuesta).json({
                error: estadoRespuesta !== 200,
                estado: estadoRespuesta,
                mensaje: ResultadoEliminacion.mensaje
            });
        } catch (error) {
            logger({ mensaje: error });
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    RegistrarOficio = async (req,res) => 
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialOficio(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloProcesoContratacion.RegistrarActualizarOficio({datos: ResultadoValidacion.data, bitacoraFn: req.Bitacora, tipoDeAcceso: req.tipoDeAcceso});                
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

    ObtenerOficiosPorFKIdProceso = async(req,res) =>
    {
        try
        {
            const FKIdProcesoContratacion = parseInt(req.params['FKIdProcesoContratacion']);
            const Datos = {FKIdProcesoContratacion};
            const ResultadoValidacion = ValidarEdicionParcialOficio(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerOficiosPorIdProceso(FKIdProcesoContratacion);
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    mensaje: (resultadoConsulta === 200
                        ? {oficios: ResultadoConsulta.oficios}
                        : ResultadoConsulta.mensaje
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

    RegistrarActualizarSeguimientoHermes = async (req, res) => {
        try {
            const { registros } = req.body;
            if (!Array.isArray(registros) || registros.length === 0) {
                return res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: "Debe enviar un arreglo de registros válido."
                });
            }
            const registrosValidos = registros.filter(r =>
                r.folio && String(r.folio).trim() !== ""
            );
            if (registrosValidos.length === 0) {
                return res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: "Ningún registro contiene los datos mínimos requeridos."
                });
            }
            const resultado = await this.modeloProcesoContratacion
                .RegistrarActualizarSeguimientoHermes({
                    datos: registrosValidos, bitacoraFn: req.Bitacora,tipoDeAcceso: req.tipoDeAcceso
                });
            res.status(resultado.estado).json({
                error: resultado.estado !== 200,
                estado: resultado.estado,
                mensaje: resultado.mensaje
            });
        } catch (error) {
            logger({ mensaje: error });
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerSeguimientoHermesServicio = async (req, res) => {
        try
        {
            const ResultadoConsulta = await this.modeloProcesoContratacion.ObtenerTodosSeguimientoHermes({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? {seguimientos: ResultadoConsulta.seguimientos}
                    : ResultadoConsulta.mensaje
                )
            });
        }catch(error){
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

}