import { Router } from "express";
import { CatalogoControlador } from "../controladores/CatalogoControlador.js";

export const CrearRutaCatalogo = ({ModeloCatalogo}) =>
{
    const CatalogoEnrutador = Router();
    const ControladorCatalogoEnrutador = new CatalogoControlador({ModeloCatalogo});
    CatalogoEnrutador.get('/tiposProceso',ControladorCatalogoEnrutador.ObtenerTiposProceso);
    CatalogoEnrutador.get('/tiposPersonal',ControladorCatalogoEnrutador.ObtenerTiposPersonal);
    CatalogoEnrutador.get('/estadosProcesoContratacion',ControladorCatalogoEnrutador.ObtenerEstadosProcesoContratacion);
    CatalogoEnrutador.get('/temporalDefinitiva',ControladorCatalogoEnrutador.ObtenerTemporalDefinitiva);
    CatalogoEnrutador.get('/tiposCedula',ControladorCatalogoEnrutador.ObtenerTiposCedula);
    CatalogoEnrutador.get('/dependencias',ControladorCatalogoEnrutador.ObtenerDependencias);
    CatalogoEnrutador.get('/clasificacionesCedula',ControladorCatalogoEnrutador.ObtenerClasificacionesCedula)
    return CatalogoEnrutador;
}