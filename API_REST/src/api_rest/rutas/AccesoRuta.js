import { Router } from "express";
import { AccesoControlador } from "../controladores/AccesoControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";
import { BitacoraLogger } from "../middlewares/bitacora.js";

export const CrearRutaAcceso = ({ModeloAcceso}) =>
{
    const AccesoEnrutador = Router();
    const ControladorAccesoEnrutador = new AccesoControlador({ModeloAcceso});    
    AccesoEnrutador.post('/login',BitacoraLogger,ControladorAccesoEnrutador.RealizarLogin);
    AccesoEnrutador.delete('/logout',ControladorAccesoEnrutador.RealizarLogout);
    AccesoEnrutador.post('/',ValidarJwt,BitacoraLogger,ControladorAccesoEnrutador.RegistrarAcceso);
    AccesoEnrutador.get('/usuarios',ValidarJwt,ControladorAccesoEnrutador.ObtenerUsuarios);
    AccesoEnrutador.get('/tiposAcceso',ControladorAccesoEnrutador.ObtenerTiposDeAccesos);
    AccesoEnrutador.get('/analistas',ValidarJwt,ControladorAccesoEnrutador.ObtenerTodosAnalistas);
    AccesoEnrutador.get('/usuario/:usuario',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorNombreDeUsuario);
    AccesoEnrutador.put('/usuario/:idAcceso',ValidarJwt,BitacoraLogger,ControladorAccesoEnrutador.DesactivarUsuarioPorId);
    AccesoEnrutador.put('/:idAcceso',ValidarJwt,BitacoraLogger,ControladorAccesoEnrutador.EditarAcceso);
    AccesoEnrutador.get('/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorId);
    return AccesoEnrutador;
}