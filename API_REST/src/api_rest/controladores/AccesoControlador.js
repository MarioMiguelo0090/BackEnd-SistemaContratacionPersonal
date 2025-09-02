import { ValidarInsercionAcceso } from "../esquemas/AccesoValidador.js";

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
            console.error("Error real en RegistrarAcceso:", error);
            res.status(500).json(
                {
                    error: true,
                    estado: 500,
                    mensaje: "Ha ocurrido un error al querer registrar el Acceso."
                }
            )
        }        
    }

}