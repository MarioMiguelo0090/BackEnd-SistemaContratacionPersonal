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
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDeProceso();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { tiposProceso: ResultadoConsulta.tiposProceso }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });

        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerTiposPersonal = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDePersonal();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { tiposPersonal: ResultadoConsulta.tiposPersonal }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerEstadosProcesoContratacion = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerEstadosDeProcesosDeContratacion();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { estadosProcesosContratacion: ResultadoConsulta.estadosProcesosContratacion }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerTemporalDefinitiva =  async(req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTemporalDefinitivaCompleto();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { temporalDefinitiva: ResultadoConsulta.temporalDefinitiva }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerTiposCedula = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerTiposDeCedula();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { tiposCedula: ResultadoConsulta.tiposCedula }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }
    
    ObtenerDependencias = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerDependenciasCompletas();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { dependencias: ResultadoConsulta.dependencias }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }

    ObtenerClasificacionesCedula = async (req,res) =>
    {
        try
        {
            const ResultadoConsulta = await this.modeloCatalogo.ObtenerClasificacionesDeCedula();
            let resultadoConsulta = parseInt(ResultadoConsulta.estado);
            res.status(resultadoConsulta).json({
                error: resultadoConsulta !== 200,
                estado: resultadoConsulta,
                ...(resultadoConsulta === 200
                    ? { clasificacionesCedula: ResultadoConsulta.clasificacionesCedula }
                    : { mensaje: ResultadoConsulta.mensaje }
                )
            });
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }
}