import { Router } from "express";
import { AccesoControlador } from "../controladores/AccesoControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaAcceso = ({ModeloAcceso}) =>
{
    const AccesoEnrutador = Router();
    const ControladorAccesoEnrutador = new AccesoControlador({ModeloAcceso});    
    AccesoEnrutador.post('/login',ControladorAccesoEnrutador.RealizarLogin);
    AccesoEnrutador.post('/',ValidarJwt,ControladorAccesoEnrutador.RegistrarAcceso);
    AccesoEnrutador.get('/usuarios',ValidarJwt,ControladorAccesoEnrutador.ObtenerUsuarios);
    AccesoEnrutador.get('/tiposAcceso',ControladorAccesoEnrutador.ObtenerTiposDeAccesos);
    AccesoEnrutador.get('/analistas',ValidarJwt,ControladorAccesoEnrutador.ObtenerTodosAnalistas);
    AccesoEnrutador.get('/usuario/:usuario',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorNombreDeUsuario);
    AccesoEnrutador.put('/usuario/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.DesactivarUsuarioPorId);
    AccesoEnrutador.put('/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.EditarAcceso);
    AccesoEnrutador.get('/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorId);
    return AccesoEnrutador;
}