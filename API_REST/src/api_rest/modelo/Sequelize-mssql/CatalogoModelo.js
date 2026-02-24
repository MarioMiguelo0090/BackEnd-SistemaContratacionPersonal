import { obtenerConexion } from "./config/config.js";
import { MensajeGeneralesBD } from "../../utilidades/Constantes.js";
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
                resultadoConsulta = {estado: 200, tiposDeProceso: tiposDeProceso};
            }else{
                resultadoConsulta = {estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB }
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
                resultadoConsulta = { estado: 200, tiposPersonal };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
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
                resultadoConsulta = { estado: 200, estadosProcesosContratacion };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
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
                resultadoConsulta = { estado: 200, temporalDefinitiva };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
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
                resultadoConsulta = { estado: 200, tiposCedula };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
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
                resultadoConsulta = { estado: 200, dependencias };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
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
                resultadoConsulta = { estado: 200, clasificacionesCedula };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeGeneralesBD.ERROR_DB };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }
}