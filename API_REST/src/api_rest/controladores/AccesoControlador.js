import { ValidarInsercionAcceso,ValidarEdicionParcialAcceso } from "../esquemas/AccesoValidador.js";

export class AccesoControlador
{
    constructor({ModeloAcceso})
    {
        this.modeloAcceso=ModeloAcceso;
    }

    RegistrarAcceso = async (req,res)=>
    {
        try 
        {
            const ResultadoValidacion = ValidarInsercionAcceso(req.body);
            if(ResultadoValidacion.success)
            {
                const ResultadoInsercion = await this.modeloAcceso.InsertarNuevaCuenta({datos: ResultadoValidacion.data})
                let resultadoInsercion=parseInt(ResultadoInsercion.resultado);
                if(resultadoInsercion === 500)
                {
                    res.status(resultadoInsercion).json(
                        {
                            error: true,
                            estado: ResultadoInsercion.resultado,
                            mensaje: 'Ha ocurrido un error al intentar realizar el registro de Acceso.'
                        });
                }
                else
                {
                    res.status(resultadoInsercion).json(
                        {
                            error: resultadoInsercion !== 200,
                            estado: ResultadoInsercion.resultado,
                            mensaje: ResultadoInsercion.mensaje
                        });
                }
            }
            else
            {
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                })
            }
            
        }
        catch(error)
        {
            //logger({mensaje:error});            
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error al querer registrar el Acceso."
                }
            )
        }        
    }

    EditarAcceso = async (req,res) =>
    {        
        try
        {
            const idAcceso= parseInt(req.params['idAcceso']);
            const {usuario, contrasenia,FKIdTipoAcceso,nombre,primerApellido,segundoApellido,estado}=req.body;
            const Datos = {idAcceso,usuario, contrasenia,FKIdTipoAcceso,nombre,primerApellido,segundoApellido,estado};
            const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
            if(ResultadoValidacion.success)
            {
                const ResultadoEdicion = await this.modeloAcceso.EditarAcceso({datos: ResultadoValidacion.data});
                let resultadoEdicion = parseInt(ResultadoEdicion.estado);
                if(resultadoEdicion === 500){
                    res.status(resultadoEdicion).json(
                        {
                            error: true,
                            estado: ResultadoEdicion.estado,
                            mensaje: 'Ha ocurrido un error al intentar editar los datos de acceso'
                        });
                }
                else
                {
                    res.status(resultadoEdicion).json(
                        {
                            error: resultadoEdicion !==200,
                            estado: resultadoEdicion,
                            mensaje: ResultadoEdicion.mensaje
                        });
                }
            }
            else
            {
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }
        catch(error)
        {
            console.error("Error real en EditarAcceso:", error);
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: 'Ha ocurrido un error al editar el acceso del usuario.'
                });
        }
    }

    BuscarUsuarioPorId = async (req, res) =>
    {
        try
        {
            const idAcceso = parseInt(req.params['idAcceso']);
            const Datos = {idAcceso};
            const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
            if(ResultadoValidacion.success)
            {
                const ResultadoConsulta = await this.modeloAcceso.BuscarUsuarioPorId({datos: ResultadoValidacion.data});
                let resultadoConsulta = parseInt(ResultadoConsulta.estado);
                res.status(resultadoConsulta).json({
                    error: resultadoConsulta !==200,
                    estado: resultadoConsulta,
                    ...(resultadoConsulta === 200
                        ? {usuario: ResultadoConsulta.usuarioEncontrado}
                        : {mensaje: ResultadoConsulta.mensaje}                        
                        )
                });
            }
            else
            {
                res.status(400).json({
                    error: true,
                    estado: 400,
                    mensaje: 'Datos con formato inválido, por favor verifique los datos enviados.'
                });
            }
        }
        catch(error)
        {
            res.status({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error al querer buscar su usuario por ID"
            });
        }
    }
}