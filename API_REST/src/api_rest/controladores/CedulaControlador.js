import { ValidarEdicionParcialCedula } from "../esquemas/CedulaValidador.js";
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
                const ResultadoInsercion = await this.modeloCedula.InsertarNuevaCedula({datos: ResultadoValidacion.data});
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
                const ResultadoEdicion = await this.modeloCedula.EditarCedula({datos: ResultadoValidacion.data});
                res.status(ResultadoEdicion.estado).json({
                    error: ResultadoEdicion.estado !== 200,
                    estado: ResultadoEdicion.estado,
                    mensaje: ResultadoEdicion.mensaje
                });
            }
        }
        catch(error)
        {
            res.status(500).json({
                error: true,
                estado: 500,
                mensaje: "Ha ocurrido un error en el servidor"
            });
        }
    }
}