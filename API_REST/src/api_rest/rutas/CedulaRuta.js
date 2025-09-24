import { Router } from "express";
import { CedulaControlador } from "../controladores/CedulaControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaCedula = ({ModeloCedula}) =>
{
    const CedulaEnrutador = Router();
    const ControladorCedulaEnrutador = new CedulaControlador({ModeloCedula});
    CedulaEnrutador.post('/',ValidarJwt,ControladorCedulaEnrutador.InsertarNuevaCedula);
    CedulaEnrutador.get('/obtencionCedulas',ValidarJwt,ControladorCedulaEnrutador.ObtenerTodasLasCedulas);
    CedulaEnrutador.put('/:idCedula',ValidarJwt,ControladorCedulaEnrutador.EditarCedulaExistente);
    CedulaEnrutador.get('/busqueda/:FKIdProceso',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaPorFKIdProceso);    
    CedulaEnrutador.get('/competencia/:FKIdClasificacionCedula',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaPorFKIdClasificacionCedula);
    CedulaEnrutador.post('/resultado',ValidarJwt,ControladorCedulaEnrutador.RegistrarNuevoResultado);
    CedulaEnrutador.put('/resultado/:idResultado',ValidarJwt,ControladorCedulaEnrutador.EditarResultados);
    CedulaEnrutador.get('/resultado/busqueda/:FKIdCedula',ValidarJwt,ControladorCedulaEnrutador.ObtenerResultadosPorCedula);
    return CedulaEnrutador;
}
