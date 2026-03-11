import { Router } from "express";
import { ProcesoContratacionControlador } from "../controladores/ProcesoContratacionControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";
import { BitacoraLogger } from "../middlewares/bitacora.js";

export const CrearRutaProcesoContratacion = ({ModeloProcesoContratacion}) =>
{
    const ProcesoContratacionEnrutador = Router();
    const ControladorProcesoContratacionEnrutador = new ProcesoContratacionControlador({ModeloProcesoContratacion});
    ProcesoContratacionEnrutador.post('/',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.RegistrarProcesoContratacion);
    ProcesoContratacionEnrutador.get('/noBeneficiados',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerTodosNoBeneficiados);
    ProcesoContratacionEnrutador.get('/busqueda/procesos/',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosContratacion);
    ProcesoContratacionEnrutador.put('/:idProceso',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.EditarProcesoContratacionExistente);
    ProcesoContratacionEnrutador.post('/busqueda',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoContratacionPorIdProceso);
    ProcesoContratacionEnrutador.get('/busqueda/:FKIdAcceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoPorFKIdAcceso);
    ProcesoContratacionEnrutador.get('/busqueda/estado/:FKIdEstadoProcesoContratacion',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosPorFKIdEstado);
    ProcesoContratacionEnrutador.get('/estadistica/:FKIdAcceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerDatosAnalistaParaEstadistica);
    ProcesoContratacionEnrutador.post('/control-version',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.RegistrarControlVersionNuevo);
    ProcesoContratacionEnrutador.get('/busqueda/control-version/:FKIdProceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerRegistrosControlVersionesPorFKIdProceso);
    ProcesoContratacionEnrutador.delete('/eliminacion/:idProceso',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.EliminarSolicitudPorIdProceso);
    ProcesoContratacionEnrutador.post('/oficio',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.RegistrarOficio);
    ProcesoContratacionEnrutador.get('/oficios/:FKIdProcesoContratacion',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerOficiosPorFKIdProceso);
    ProcesoContratacionEnrutador.post('/seguimiento-hermes',ValidarJwt,BitacoraLogger,ControladorProcesoContratacionEnrutador.RegistrarActualizarSeguimientoHermes);
    ProcesoContratacionEnrutador.get('/obtencion-seguimiento-hermes',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerSeguimientoHermesServicio)
    return ProcesoContratacionEnrutador;
}