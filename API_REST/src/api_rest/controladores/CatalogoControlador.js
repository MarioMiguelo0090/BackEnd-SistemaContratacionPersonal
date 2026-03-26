import { logger } from "../utilidades/logger.js";

export class CatalogoControlador
{
    constructor({ModeloCatalogo})
    {
        this.modeloCatalogo=ModeloCatalogo;
    }
    
    ObtenerTiposProceso = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDeProceso({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { tiposProceso: ResultadoConsulta.tiposDeProceso }
                    : ResultadoConsulta.mensaje
                )
            });

        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerDependenciaPorID = async(req, res) => 
    {
        try 
        {
            const idDependencia = parseInt(req.params.idDependencia);
            if(Number.isInteger(idDependencia) && idDependencia > 0)
            {
                const ResultadoConsulta = await this.modeloCatalogo.ObtenerDependenciaPorID({tipoDeAcceso: req.tipoDeAcceso, idDependencia: idDependencia});
                res.status(parseInt(ResultadoConsulta.estado)).json({
                    error: ResultadoConsulta.estado !== 200,
                    estado: parseInt(ResultadoConsulta.estado),
                    mensaje: (ResultadoConsulta.estado === 200 
                        ? {dependencia: ResultadoConsulta.dependencia[0]}
                        : ResultadoConsulta.mensaje
                    )
                });
            }
            else
            {
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: "El identificador de la dependencia debe ser un número entero positivo"
                })
            }
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerTiposPersonal = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDePersonal({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { tiposPersonal: ResultadoConsulta.tiposPersonal }
                    : ResultadoConsulta.mensaje
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerEstadosProcesoContratacion = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerEstadosDeProcesosDeContratacion({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { estadosProcesosContratacion: ResultadoConsulta.estadosProcesosContratacion }
                    : ResultadoConsulta.mensaje
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerTemporalDefinitiva =  async(req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTemporalDefinitivaCompleto({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { temporalDefinitiva: ResultadoConsulta.temporalDefinitiva }
                    : ResultadoConsulta.mensaje 
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerTiposCedula = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDeCedula({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { tiposCedula: ResultadoConsulta.tiposCedula }
                    : ResultadoConsulta.mensaje 
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }
    
    ObtenerDependencias = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerDependenciasCompletas({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { dependencias: ResultadoConsulta.dependencias }
                    : ResultadoConsulta.mensaje
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }

    ObtenerClasificacionesCedula = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerClasificacionesDeCedula({tipoDeAcceso: req.tipoDeAcceso});
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                mensaje: (resultadoConsulta === 200
                    ? { clasificacionesCedula: ResultadoConsulta.clasificacionesCedula }
                    : ResultadoConsulta.mensaje
                )
            });
        }
        catch(error)
        {
            logger({mensaje:error});
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error en el servidor"
                }
            )
        }
    }
}