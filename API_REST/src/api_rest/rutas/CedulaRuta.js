import { Router } from "express";
import { CedulaControlador } from "../controladores/CedulaControlador.js";

export const CrearRutaCedula = ({ModeloCedula}) =>
{
    const CedulaEnrutador = Router();
    const ControladorCedulaEnrutador = new CedulaControlador({ModeloCedula});
    CedulaEnrutador.post('/',ControladorCedulaEnrutador.InsertarNuevaCedula);
    CedulaEnrutador.put('/:idCedula',ControladorCedulaEnrutador.EditarCedulaExistente);
    return CedulaEnrutador;
}
