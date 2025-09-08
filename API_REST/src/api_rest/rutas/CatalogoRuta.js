import { Router } from "express";
import { CatalogoControlador } from "../controladores/CatalogoControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaCatalogo = ({ModeloCatalogo}) =>
{
    const CatalogoEnrutador = Router();
    const ControladorCatalogoEnrutador = new CatalogoControlador({ModeloCatalogo});
    CatalogoEnrutador.get('/tiposProceso',ValidarJwt,ControladorCatalogoEnrutador.ObtenerTiposProceso);
    CatalogoEnrutador.get('/tiposPersonal',ValidarJwt,ControladorCatalogoEnrutador.ObtenerTiposPersonal);
    CatalogoEnrutador.get('/estadosProcesoContratacion',ValidarJwt,ControladorCatalogoEnrutador.ObtenerEstadosProcesoContratacion);
    CatalogoEnrutador.get('/temporalDefinitiva',ValidarJwt,ControladorCatalogoEnrutador.ObtenerTemporalDefinitiva);
    CatalogoEnrutador.get('/tiposCedula',ValidarJwt,ControladorCatalogoEnrutador.ObtenerTiposCedula);
    CatalogoEnrutador.get('/dependencias',ValidarJwt,ControladorCatalogoEnrutador.ObtenerDependencias);
    CatalogoEnrutador.get('/clasificacionesCedula',ValidarJwt,ControladorCatalogoEnrutador.ObtenerClasificacionesCedula)
    return CatalogoEnrutador;
}