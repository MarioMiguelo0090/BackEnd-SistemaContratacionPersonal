import sql from 'mssql';
import { obtenerConexion } from './conexion/ConfiguracionConexion.js';
import { MensajeGeneralesBD } from '../../utilidades/Constantes.js';

export class ModeloCatalogo{
    static async ObtenerTiposDeProceso()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerTiposProceso');
            const tiposProceso = Solicitud.recordset;
            if(tiposProceso.length > 0){
                resultadoConsulta = {estado: 200,tiposProceso};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerTiposDePersonal()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerTiposPersonal');
            const tiposPersonal = Solicitud.recordset;
            if(tiposPersonal.length > 0){
                resultadoConsulta = {estado: 200,tiposPersonal};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerEstadosDeProcesosDeContratacion()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerEstadosProcesoContratacion');
            const estadosProcesosContratacion = Solicitud.recordset;
            if(estadosProcesosContratacion.length > 0){
                resultadoConsulta = {estado: 200,estadosProcesosContratacion};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerTemporalDefinitivaCompleto()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerTemporalDefinitiva');
            const temporalDefinitiva = Solicitud.recordset;
            if(temporalDefinitiva.length > 0){
                resultadoConsulta = {estado: 200,temporalDefinitiva};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerTiposDeCedula()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerTiposCedula');
            const tiposCedula = Solicitud.recordset;
            if(tiposCedula.length > 0){
                resultadoConsulta = {estado: 200,tiposCedula};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerDependenciasCompletas()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerDependencias');
            const dependencias = Solicitud.recordset;
            if(dependencias.length > 0){
                resultadoConsulta = {estado: 200,dependencias};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }

    static async ObtenerClasificacionesDeCedula()
    {
        let resultadoConsulta;
        let conexion;
        try
        {
            conexion = await obtenerConexion();
            const Solicitud= await conexion.request()
                .execute('sp_ObtenerClasificacionCedula');
            const clasificacionesCedula = Solicitud.recordset;
            if(clasificacionesCedula.length > 0){
                resultadoConsulta = {estado: 200,clasificacionesCedula};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
            }
        }catch (error) {
            throw error;
        } finally {
            if (conexion) {
                conexion.close();
            }
        }
        return resultadoConsulta;
    }
}