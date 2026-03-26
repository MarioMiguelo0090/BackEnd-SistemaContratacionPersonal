import { obtenerConexion } from "./config/config.js";
import { CodigosDeEstado, MensajeGeneralesBD, MensajeNoEncontrado} from "../../utilidades/Constantes.js";
import { QueryTypes } from "sequelize";

export class ModeloCatalogo {
    
    static async ObtenerTiposDeProceso({tipoDeAcceso})
    {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try{
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTiposProceso`,
                {
                    type: QueryTypes.RAW
                }
            );
            let tiposDeProceso = resultadoProcedimiento[0]
            if(tiposDeProceso.length > 0){
                if(tiposDeProceso[0].idTipoProceso === -1){
                    resultadoConsulta = {estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB }
                }else {
                    resultadoConsulta = {estado: CodigosDeEstado.OK, tiposDeProceso};
                }
            }else{
                resultadoConsulta = {estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.TIPOS_DE_PROCESO}
            }
        }catch(error){
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerDependenciaPorID({tipoDeAcceso, idDependencia})
    {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try{
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerDependenciaPorID 
                @idDependencia = :idDependencia`,
                {
                    replacements: {
                        idDependencia: idDependencia
                    },
                    type: QueryTypes.RAW
                }
            );
            let dependencia = resultadoProcedimiento[0]
            if(dependencia[0].idDependencia === -1){
                resultadoConsulta = {estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB }
            }else if(dependencia[0].idDependencia > 0){
                resultadoConsulta = {estado: CodigosDeEstado.OK, dependencia};
            }else{
                resultadoConsulta = {estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.DEPENDENCIA}
            }
        }catch(error){
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTiposDePersonal({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTiposPersonal`,
                { type: QueryTypes.RAW }
            );
            const tiposPersonal = resultadoProcedimiento[0];
            if (tiposPersonal.length > 0) {
                if(tiposPersonal[0].idTipoPersonal === -1){
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, tiposPersonal };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.TIPO_DE_PERSONAL };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerEstadosDeProcesosDeContratacion({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerEstadosProcesoContratacion`,
                { type: QueryTypes.RAW }
            );
            const estadosProcesosContratacion = resultadoProcedimiento[0];
            if (estadosProcesosContratacion.length > 0) {
                if(estadosProcesosContratacion[0].idEstadoProcesoContratacion === -1){
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, estadosProcesosContratacion };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.PROCESOS_DE_CONTRATACION };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTemporalDefinitivaCompleto({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTemporalDefinitiva`,
                { type: QueryTypes.RAW }
            );
            const temporalDefinitiva = resultadoProcedimiento[0];
            if (temporalDefinitiva.length > 0) {
                if(temporalDefinitiva[0].idTemporalDefinitiva === -1){
                    resultadoConsulta = {estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB}
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, temporalDefinitiva };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.TEMPORAL_DEFINITIVA_COMPLETA };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTiposDeCedula({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTiposCedula`,
                { type: QueryTypes.RAW }
            );
            const tiposCedula = resultadoProcedimiento[0];
            if (tiposCedula.length > 0) {
                if(tiposCedula[0].idTipoCedula === -1){
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, tiposCedula };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.TIPOS_DE_CEDULA };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerDependenciasCompletas({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerDependencias`,
                { type: QueryTypes.RAW }
            );
            const dependencias = resultadoProcedimiento[0];
            if (dependencias.length > 0) {
                if(dependencias[0].idDependencia === -1){
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, dependencias };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.DEPENDENCIA_COMPLETAS };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerClasificacionesDeCedula({ tipoDeAcceso }) {
        const sequelize = obtenerConexion(tipoDeAcceso);
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerClasificacionCedula`,
                { type: QueryTypes.RAW }
            );
            const clasificacionesCedula = resultadoProcedimiento[0];
            if (clasificacionesCedula.length > 0) {
                if(clasificacionesCedula[0].idClasificacionCedulas === -1){
                    resultadoConsulta = { estado: CodigosDeEstado.InternalServerError, mensaje: MensajeGeneralesBD.ERROR_DB };
                }else{
                    resultadoConsulta = { estado: CodigosDeEstado.OK, clasificacionesCedula };
                }
            } else {
                resultadoConsulta = { estado: CodigosDeEstado.NotFound, mensaje: MensajeNoEncontrado.CLASIFICACION_CEDULA };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }
}