import { Router } from "express";
import { CedulaControlador } from "../controladores/CedulaControlador.js";

export const CrearRutaCedula = ({ModeloCedula}) =>
{
    const CedulaEnrutador = Router();
    const ControladorCedulaEnrutador = new CedulaControlador({ModeloCedula});
    CedulaEnrutador.post('/',ControladorCedulaEnrutador.InsertarNuevaCedula);
    CedulaEnrutador.put('/:idCedula',ControladorCedulaEnrutador.EditarCedulaExistente);
    CedulaEnrutador.get('/busqueda/:FKIdProceso',ControladorCedulaEnrutador.ObtenerCedulaPorFKIdProceso);    
    CedulaEnrutador.get('/competencia/:FKIdClasificacionCedula',ControladorCedulaEnrutador.ObtenerCedulaPorFKIdClasificacionCedula);
    CedulaEnrutador.post('/resultado',ControladorCedulaEnrutador.RegistrarNuevoResultado);
    CedulaEnrutador.put('/resultado/:idResultado',ControladorCedulaEnrutador.EditarResultados);
    CedulaEnrutador.get('/resultado/busqueda/:FKIdCedula',ControladorCedulaEnrutador.ObtenerResultadosPorCedula);
    return CedulaEnrutador;
}
