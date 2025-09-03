import { Router } from "express";
import { AccesoControlador } from "../controladores/AccesoControlador.js";

export const CrearRutaAcceso = ({ModeloAcceso}) =>
{
    const AccesoEnrutador = Router();
    const ControladorAccesoEnrutador = new AccesoControlador({ModeloAcceso});
    AccesoEnrutador.post('/',ControladorAccesoEnrutador.RegistrarAcceso);
    AccesoEnrutador.post('/login',ControladorAccesoEnrutador.RealizarLogin);
    AccesoEnrutador.get('/tiposAcceso',ControladorAccesoEnrutador.ObtenerTiposDeAccesos);
    AccesoEnrutador.get('/usuario/:usuario',ControladorAccesoEnrutador.BuscarUsuarioPorNombreDeUsuario);
    AccesoEnrutador.put('/usuario/:idAcceso',ControladorAccesoEnrutador.DesactivarUsuarioPorId);
    AccesoEnrutador.put('/:idAcceso',ControladorAccesoEnrutador.EditarAcceso);
    AccesoEnrutador.get('/:idAcceso',ControladorAccesoEnrutador.BuscarUsuarioPorId);
    return AccesoEnrutador;
}