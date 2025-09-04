import { Router } from "express";
import { ProcesoContratacionControlador } from "../controladores/ProcesoContratacionControlador.js";

export const CrearRutaProcesoContratacion = ({ModeloProcesoContratacion}) =>
{
    const ProcesoContratacionEnrutador = Router();
    const ControladorProcesoContratacionEnrutador = new ProcesoContratacionControlador({ModeloProcesoContratacion});
    ProcesoContratacionEnrutador.post('/',ControladorProcesoContratacionEnrutador.RegistrarProcesoContratacion);
    ProcesoContratacionEnrutador.put('/:idProceso',ControladorProcesoContratacionEnrutador.EditarProcesoContratacionExistente);
    ProcesoContratacionEnrutador.get('/busqueda',ControladorProcesoContratacionEnrutador.ObtenerProcesoContratacionPorFolioHermes);
    ProcesoContratacionEnrutador.get('/busqueda/:FKIdAcceso',ControladorProcesoContratacionEnrutador.ObtenerProcesoPorFKIdAcceso);
    ProcesoContratacionEnrutador.get('/busqueda/estado/:FKIdEstadoProcesoContratacion',ControladorProcesoContratacionEnrutador.ObtenerProcesosPorFKIdEstado);
    return ProcesoContratacionEnrutador;
}