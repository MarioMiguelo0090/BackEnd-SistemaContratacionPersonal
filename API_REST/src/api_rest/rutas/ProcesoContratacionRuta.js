import { Router } from "express";
import { ProcesoContratacionControlador } from "../controladores/ProcesoContratacionControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaProcesoContratacion = ({ModeloProcesoContratacion}) =>
{
    const ProcesoContratacionEnrutador = Router();
    const ControladorProcesoContratacionEnrutador = new ProcesoContratacionControlador({ModeloProcesoContratacion});
    ProcesoContratacionEnrutador.post('/',ValidarJwt,ControladorProcesoContratacionEnrutador.RegistrarProcesoContratacion);
    ProcesoContratacionEnrutador.get('/noBeneficiados',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerTodosNoBeneficiados);
    ProcesoContratacionEnrutador.get('/busqueda/procesos/',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosContratacion);
    ProcesoContratacionEnrutador.put('/:idProceso',ValidarJwt,ControladorProcesoContratacionEnrutador.EditarProcesoContratacionExistente);
    ProcesoContratacionEnrutador.get('/busqueda',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoContratacionPorFolioHermes);
    ProcesoContratacionEnrutador.get('/busqueda/:FKIdAcceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoPorFKIdAcceso);
    ProcesoContratacionEnrutador.get('/busqueda/estado/:FKIdEstadoProcesoContratacion',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosPorFKIdEstado);
    return ProcesoContratacionEnrutador;
}