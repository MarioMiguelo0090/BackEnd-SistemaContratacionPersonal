import { ValidarEdicionParcialCedula, ValidarEdicionParcialResultado } from "../esquemas/CedulaValidador.js";
import { logger } from "../utilidades/logger.js";

export class CedulaControlador
{
    constructor({ModeloCedula})
    {
        this.modeloCedula=ModeloCedula;
    }
    
    InsertarNuevaCedula = async (req,res) =>
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialCedula(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloCedula.InsertarNuevaCedula({datos: ResultadoValidacion.data,bitacoraFn: req.Bitacora ,tipoDeAcceso: req.tipoDeAcceso});
                res.status(ResultadoInsercion.estado).json({
                    error: ResultadoInsercion.estado !== 200,
                    estado: ResultadoInsercion.estado,
                    mensaje: ResultadoInsercion.mensaje,
                    idCedula: ResultadoInsercion.idCedula,
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

    EditarCedulaExistente = async (req,res) =>
    {
        try
        {
            const idCedula = parseInt(req.params["idCedula"]);
            const Datos = {idCedula,...req.body};
            const ResultadoValidacion = ValidarEdicionParcialCedula(Datos);
            if(ResultadoValidacion.success){
                const ResultadoEdicion = await this.modeloCedula.EditarCedula({datos: ResultadoValidacion.data, bitacoraFn: req.Bitacora ,tipoDeAcceso: req.tipoDeAcceso});
                res.status(ResultadoEdicion.estado).json({
                    error: ResultadoEdicion.estado !== 200,
                    estado: ResultadoEdicion.estado,
                    mensaje: ResultadoEdicion.mensaje
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

    ObtenerCedulaPorFKIdProceso = async (req,res) =>
    {
        try
        {
            const FKIdProceso = parseInt(req.params['FKIdProceso']);
            const Datos =  {FKIdProceso};
            const ResultadoValidacion = ValidarEdicionParcialCedula(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloCedula.ObtenerCedulaPorIdProceso({datos: ResultadoValidacion.data,tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {cedula: ResultadoConsulta.cedula}
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

    ObtenerCedulaPorFKIdClasificacionCedula = async (req,res) =>
    {
        try
        {
            const FKIdClasificacionCedula = parseInt(req.params['FKIdClasificacionCedula']);
            const Datos = {FKIdClasificacionCedula};
            const ResultadoValidacion = ValidarEdicionParcialCedula(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloCedula.ObtenerCompetenciasPorClasificacionCedula({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {competencias: ResultadoConsulta.competencias}
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

    ObtenerCedulaPorIdCedulaResultados = async (req,res) =>
    {
        try
        {
            const IdProceso = parseInt(req.params['IdProceso']);
            const Datos = {IdProceso};
            const ResultadoValidacion = ValidarEdicionParcialCedula(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloCedula.ObtenerResultadosPorIdCedulaResultados(IdProceso);
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {resultados: ResultadoConsulta.resultados}
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

    RegistrarNuevoResultado = async(req, res) =>
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialResultado(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloCedula.InsertarNuevoResultado({datos: ResultadoValidacion.data,bitacoraFn: req.Bitacora ,tipoDeAcceso: req.tipoDeAcceso});
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
        }catch(error){     
            logger({mensaje:error});                 
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }            
    }

    EditarResultados = async(req,res) =>
    {
        try
        {            
            const idResultado = parseInt(req.params['idResultado']);
            const Datos = {idResultado,...req.body};
            const ResultadoValidacion = ValidarEdicionParcialResultado(Datos);
            if(ResultadoValidacion.success){
                const ResultadoEdicion = await this.modeloCedula.EditarResultadoExistente({datos: ResultadoValidacion.data,bitacoraFn: req.Bitacora ,tipoDeAcceso: req.tipoDeAcceso});
                res.status(ResultadoEdicion.estado).json({
                    error: ResultadoEdicion.estado !== 200,
                    estado: ResultadoEdicion.estado,
                    mensaje: ResultadoEdicion.mensaje
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

    ObtenerResultadosPorCedula = async(req,res) =>
    {
        try
        {
            const FKIdCedula = parseInt(req.params['FKIdCedula']);
            const Datos = {FKIdCedula};
            const ResultadoValidacion = ValidarEdicionParcialResultado(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloCedula.ObtenerResultadosPorIdCedula({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {resultados: ResultadoConsulta.resultados}
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

    ObtenerTodasLasCedulas = async (req,res) => 
    {
        try
        {
            const ResultadoConsulta = await this.modeloCedula.ObtenerTodasCedulas({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? {cedulas: ResultadoConsulta.cedulas}
                    : {mensaje: ResultadoConsulta.mensaje}
                )
            });            
        }catch(error)
        {
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }
    
    ObtenerCedulasActivasServicio = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCedula.ObtenerCedulasActivas({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? {cedulas: ResultadoConsulta.cedulas}
                    : {mensaje: ResultadoConsulta.mensaje}
                )
            });            
        }catch(error)
        {
            logger({mensaje:error});
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    InsertarNuevaCedulaExterna = async (req,res) =>
    {
        try
        {
            const ResultadoValidacion = ValidarEdicionParcialCedula(req.body);
            if(ResultadoValidacion.success){
                const ResultadoInsercion = await this.modeloCedula.InsertarCedulaExterna({datos: ResultadoValidacion.data,bitacoraFn: req.Bitacora ,tipoDeAcceso: req.tipoDeAcceso});
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
        }catch(error){     
            logger({mensaje:error});                 
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }  
    }

    ObtenerCedulaExternaPorIdCedula = async(req,res) =>
    {
        try
        {
            const FKIdCedula = parseInt(req.params['FKIdCedula']);
            const Datos = {FKIdCedula};
            const ResultadoValidacion = ValidarEdicionParcialCedula(Datos);
            if(ResultadoValidacion.success){
                const ResultadoConsulta = await this.modeloCedula.ObtenerCedulaExternaPorFKIdCedula({datos: ResultadoValidacion.data, tipoDeAcceso: req.tipoDeAcceso});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !== 200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {documento: ResultadoConsulta.documento}
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
}