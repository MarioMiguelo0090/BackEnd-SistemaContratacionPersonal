import { Router } from "express";
import { AccesoControlador } from "../controladores/AccesoControlador.js";

export const CrearRutaAcceso = ({ModeloAcceso}) =>
{
    const AccesoEnrutador = Router();
    const ControladorAccesoEnrutador = new AccesoControlador({ModeloAcceso});
    AccesoEnrutador.post('/',ControladorAccesoEnrutador.RegistrarAcceso);
    AccesoEnrutador.put('/:idAcceso',ControladorAccesoEnrutador.EditarAcceso);
    AccesoEnrutador.get('/:idAcceso',ControladorAccesoEnrutador.BuscarUsuarioPorId);

    return AccesoEnrutador;
}