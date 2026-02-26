import { Cifrar, Descifrar } from '../../utilidades/Cifrado.js';
import { MensajeCedula, MensajeGeneralesBD, MensajeResultado } from '../../utilidades/Constantes.js';
import { obtenerConexion } from './config/config.js';
import { QueryTypes } from "sequelize";
import {toZonedTime, format} from 'date-fns-tz'

//TODO: Faltan los métodos de obtener todas las cedulas, ya que va de la mano con proceso de contratación

export class ModeloCedula {
    static async InsertarNuevaCedula({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            const {
                FKIdTipoCedula, FKIdProceso, fechaCedulaInterna, fechaCedulaResultados,
                edad, educacionFormal, referidoPor, antecedentesFamiliaresUV,
                expectativaLaboral, experienciaRelacionada, experiencia, conclusiones,
                resultado, efectoContratacion, competenciaReforzar, competenciaDesarrollar,
                FKIdClasificacionCedula, FKIdResultado, motivoCedulaInterna, motivoCedulaResultados,
                puesto, competenciasSobresaliente, descripcionDesarrollar, descripcionReforzar,
                plaza, oficioAutorizacionDeOcupacion, evaluacionConocimientos,
                aprobadoJefeOficina, aprobadoDireccion, archivoAdjunto,
            } = datos;
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_RegistrarCedula 
                @FKIdTipoCedula = :FKIdTipoCedula, @FKIdProceso = :FKIdProceso, @fechaCedulaInterna = :fechaCedulaInterna, 
                @fechaCedulaResultados = :fechaCedulaResultados, @edad = :edad, @educacionFormal = :educacionFormal, 
                @referidoPor = :referidoPor, @antecedentesFamiliaresUV = :antecedentesFamiliaresUV, @expectativaLaboral = :expectativaLaboral, 
                @experienciaRelacionada = :experienciaRelacionada, @experiencia = :experiencia, @conclusiones = :conclusiones, 
                @resultado = :resultado, @efectoContratacion = :efectoContratacion, @competenciaReforzar = :competenciaReforzar, 
                @competenciaDesarrollar = :competenciaDesarrollar, @FKIdClasificacionCedula = :FKIdClasificacionCedula, 
                @FKIdResultado = :FKIdResultado, @motivoCedulaInterna = :motivoCedulaInterna, @motivoCedulaResultados = :motivoCedulaResultados, 
                @competenciasSobresaliente = :competenciasSobresaliente, @descripcionDesarrollar = :descripcionDesarrollar, 
                @descripcionReforzar = :descripcionReforzar, @puesto = :puesto, @plaza = :plaza, 
                @oficioAutorizacionDeOcupacion = :oficioAutorizacionDeOcupacion, @evaluacionConocimientos = :evaluacionConocimientos, 
                @aprobadoJefeOficina = :aprobadoJefeOficina, @aprobadoDireccion = :aprobadoDireccion, @archivoAdjunto = :archivoAdjunto`,
                {
                    replacements: {
                        FKIdTipoCedula, FKIdProceso, fechaCedulaInterna, fechaCedulaResultados,
                        edad: Cifrar(edad), educacionFormal: Cifrar(educacionFormal), referidoPor: Cifrar(referidoPor), antecedentesFamiliaresUV: Cifrar(antecedentesFamiliaresUV),
                        expectativaLaboral: Cifrar(expectativaLaboral), experienciaRelacionada: Cifrar(experienciaRelacionada), experiencia: Cifrar(experiencia), conclusiones: Cifrar(conclusiones),
                        resultado: Cifrar(resultado), efectoContratacion: Cifrar(efectoContratacion), competenciaReforzar: Cifrar(competenciaReforzar), competenciaDesarrollar: Cifrar(competenciaDesarrollar),
                        FKIdClasificacionCedula, FKIdResultado, motivoCedulaInterna: Cifrar(motivoCedulaInterna), motivoCedulaResultados: Cifrar(motivoCedulaResultados),
                        competenciasSobresaliente: Cifrar(competenciasSobresaliente), descripcionDesarrollar: Cifrar(descripcionDesarrollar), descripcionReforzar: Cifrar(descripcionReforzar), puesto: Cifrar(puesto), plaza: Cifrar(plaza),
                        oficioAutorizacionDeOcupacion: Cifrar(oficioAutorizacionDeOcupacion), evaluacionConocimientos: Cifrar(evaluacionConocimientos),
                        aprobadoJefeOficina: aprobadoJefeOficina ? 1 : 0,
                        aprobadoDireccion: aprobadoDireccion ? 1 : 0,
                        archivoAdjunto: archivoAdjunto ? 1 : 0
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoCedula = resultadoProcedimiento[0];
            if (ResultadoCedula.length > 0) {
                const CedulaRegistrada = ResultadoCedula[0];
                if (CedulaRegistrada.idCedula > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha registrado una nueva cédula`)
                    }
                    await transaction.commit();
                    resultadoInsercion = {
                        ...MensajeCedula.REGISTRO_EXITOSO,
                        estado: MensajeCedula.REGISTRO_EXITOSO.resultado,
                        idCedula: CedulaRegistrada.idCedula
                    };
                } else if (CedulaRegistrada.idCedula == -2) {
                    resultadoInsercion = {
                        ...MensajeCedula.CEDULA_DUPLICADA,
                        estado: MensajeCedula.CEDULA_DUPLICADA.resultado
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: MensajeGeneralesBD.ERROR_DB.resultado
                    };
                }
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarCedula({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoEdicion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            const {
                idCedula, FKIdTipoCedula, FKIdProceso, fechaCedulaInterna, fechaCedulaResultados,
                edad, educacionFormal, referidoPor, antecedentesFamiliaresUV, expectativaLaboral,
                experienciaRelacionada, experiencia, conclusiones, resultado, efectoContratacion,
                competenciaReforzar, competenciaDesarrollar, FKIdClasificacionCedula, FKIdResultado,
                motivoCedulaInterna, motivoCedulaResultados, puesto, competenciasSobresaliente,
                descripcionDesarrollar, descripcionReforzar, plaza, oficioAutorizacionDeOcupacion,
                evaluacionConocimientos, estado,
            } = datos;
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ActualizarCedula 
                @idCedula = :idCedula, @FKIdTipoCedula = :FKIdTipoCedula, @FKIdProceso = :FKIdProceso, 
                @fechaCedulaInterna = :fechaCedulaInterna, @fechaCedulaResultados = :fechaCedulaResultados, 
                @edad = :edad, @educacionFormal = :educacionFormal, @referidoPor = :referidoPor, 
                @antecedentesFamiliaresUV = :antecedentesFamiliaresUV, @expectativaLaboral = :expectativaLaboral, 
                @experienciaRelacionada = :experienciaRelacionada, @experiencia = :experiencia, @conclusiones = :conclusiones, 
                @resultado = :resultado, @efectoContratacion = :efectoContratacion, @competenciaReforzar = :competenciaReforzar, 
                @competenciaDesarrollar = :competenciaDesarrollar, @FKIdClasificacionCedula = :FKIdClasificacionCedula, 
                @FKIdResultado = :FKIdResultado, @motivoCedulaInterna = :motivoCedulaInterna, @motivoCedulaResultados = :motivoCedulaResultados, 
                @competenciasSobresaliente = :competenciasSobresaliente, @descripcionDesarrollar = :descripcionDesarrollar, 
                @descripcionReforzar = :descripcionReforzar, @puesto = :puesto, @plaza = :plaza, 
                @oficioAutorizacionDeOcupacion = :oficioAutorizacionDeOcupacion, @evaluacionConocimientos = :evaluacionConocimientos, 
                @estado = :estado`,
                {
                    replacements: {
                        idCedula, FKIdTipoCedula, FKIdProceso, fechaCedulaInterna: fechaCedulaInterna, fechaCedulaResultados: fechaCedulaResultados,
                        edad: Cifrar(edad), educacionFormal: Cifrar(educacionFormal), referidoPor: Cifrar(referidoPor), antecedentesFamiliaresUV: Cifrar(antecedentesFamiliaresUV), expectativaLaboral: Cifrar(expectativaLaboral),
                        experienciaRelacionada: Cifrar(experienciaRelacionada), experiencia: Cifrar(experiencia), conclusiones: Cifrar(conclusiones), resultado: Cifrar(resultado), efectoContratacion: Cifrar(efectoContratacion),
                        competenciaReforzar: Cifrar(competenciaReforzar), competenciaDesarrollar: Cifrar(competenciaDesarrollar), FKIdClasificacionCedula, FKIdResultado,
                        motivoCedulaInterna: Cifrar(motivoCedulaInterna), motivoCedulaResultados: Cifrar(motivoCedulaResultados), competenciasSobresaliente: Cifrar(competenciasSobresaliente), descripcionDesarrollar: Cifrar(descripcionDesarrollar),
                        descripcionReforzar: Cifrar(descripcionReforzar), puesto: Cifrar(puesto), plaza: Cifrar(plaza), oficioAutorizacionDeOcupacion: Cifrar(oficioAutorizacionDeOcupacion), evaluacionConocimientos: Cifrar(evaluacionConocimientos),
                        estado: estado ? 1 : 0
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoSP = resultadoProcedimiento[0][0]?.Resultado;
            if (ResultadoSP === 1) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha modificado una cedula con el id: ${idCedula}`)
                }
                await transaction.commit();
                resultadoEdicion = {
                    ...MensajeCedula.ACTUALIZACION_EXITOSA,
                    estado: MensajeCedula.ACTUALIZACION_EXITOSA.resultado
                };
            } else if (ResultadoSP === 2) {
                resultadoEdicion = {
                    ...MensajeCedula.CEDULA_INEXISTENTE,
                    estado: MensajeCedula.CEDULA_INEXISTENTE.resultado
                };
            } else {
                resultadoEdicion = {
                    ...MensajeGeneralesBD.ERROR_DB,
                    estado: MensajeGeneralesBD.ERROR_DB.resultado
                };
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoEdicion;
    }

    static async ObtenerCedulaPorIdProceso({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdProceso } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerCedulaPorIdProceso @idProceso = :idProceso`,
                {
                    replacements: { idProceso: FKIdProceso },
                    type: QueryTypes.RAW
                }
            );

            let ResultadoQueryCedula = resultadoProcedimiento[0];
            
            if (ResultadoQueryCedula.length > 0) {
                ResultadoQueryCedula = ResultadoQueryCedula.map(cedula => {
                    return {
                        ...cedula,
                        edad: Descifrar(cedula.edad), educacionFormal: Descifrar(cedula.educacionFormal), referidoPor: Descifrar(cedula.referidoPor),
                        antecedentesFamiliaresUV: Descifrar(cedula.antecedentesFamiliaresUV), expectativaLaboral: Descifrar(cedula.expectativaLaboral), experienciaRelacionada: Descifrar(cedula.experienciaRelacionada),
                        experiencia: Descifrar(cedula.experiencia), conclusiones: Descifrar(cedula.conclusiones), resultado: Descifrar(cedula.resultado), efectoContratacion: Descifrar(cedula.efectoContratacion),
                        competenciaReforzar: Descifrar(cedula.competenciaReforzar), competenciaDesarrollar: Descifrar(cedula.competenciaDesarrollar), motivoCedulaInterna: Descifrar(cedula.motivoCedulaInterna),
                        motivoCedulaResultados: Descifrar(cedula.motivoCedulaResultados), puesto: Descifrar(cedula.puesto), plaza: Descifrar(cedula.plaza),
                        oficioAutorizacionDeOcupacion: Descifrar(cedula.oficioAutorizacionDeOcupacion), evaluacionConocimientos:  Descifrar(cedula.evaluacionConocimientos), competenciasSobresaliente: Descifrar(cedula.competenciasSobresaliente),
                        descripcionDesarrollar: Descifrar(cedula.descripcionDesarrollar), descripcionReforzar: Descifrar(cedula.descripcionReforzar)
                    };
                });
                if (ResultadoQueryCedula[0].idCedula > 0) {
                    resultadoConsulta = { estado: 200, cedula: ResultadoQueryCedula }
                }
                else {
                    resultadoConsulta = { estado: 404, mensaje: MensajeCedula.CEDULA_INEXISTENTE };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.CEDULA_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerCompetenciasPorClasificacionCedula({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdClasificacionCedula } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerCompetenciasPorClasificacionCedula @idClasificacionCedula = :idClasificacionCedula`,
                {
                    replacements: { idClasificacionCedula: FKIdClasificacionCedula },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoQueryCompetencias = resultadoProcedimiento[0];
            if (ResultadoQueryCompetencias.length > 0) {
                const competencia = ResultadoQueryCompetencias[0];
                if (competencia.idCompetencia > 0) {
                    resultadoConsulta = { estado: 200, competencias: ResultadoQueryCompetencias }
                } else {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.COMPETENCIA_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async InsertarNuevoResultado({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const {
                FKIdCedula, psicometriaComunicacion, psicometriaTrabajoEnEquipo, psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos, psicometriaPlaneacionOrganizacion, psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados, psicometriaControlActividades, psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales, psicometriaLiderazgo, psicometriaTomaDecisiones,
                psicometriaDinamismo, psicometriaInnovacion, psicometriaPensamientoEstrategico,
                psicometriaNegociacion, resultadoPorcentaje
            } = datos;

            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_RegistrarResultado 
                @FKIdCedula = :FKIdCedula, @psicometriaComunicacion = :psicometriaComunicacion, 
                @psicometriaTrabajoEnEquipo = :psicometriaTrabajoEnEquipo, @psicometriaOrientacionAlServicio = :psicometriaOrientacionAlServicio, 
                @psicometriaSensibilidadALineamientos = :psicometriaSensibilidadALineamientos, @psicometriaPlaneacionOrganizacion = :psicometriaPlaneacionOrganizacion, 
                @psicometriaAnalisisProblemas = :psicometriaAnalisisProblemas, @psicometriaEnfoqueResultados = :psicometriaEnfoqueResultados, 
                @psicometriaControlActividades = :psicometriaControlActividades, @psicometriaEnfoqueCalidad = :psicometriaEnfoqueCalidad, 
                @psicometriaRelacionesInterpersonales = :psicometriaRelacionesInterpersonales, @psicometriaLiderazgo = :psicometriaLiderazgo, 
                @psicometriaTomaDecisiones = :psicometriaTomaDecisiones, @psicometriaDinamismo = :psicometriaDinamismo, 
                @psicometriaInnovacion = :psicometriaInnovacion, @psicometriaPensamientoEstrategico = :psicometriaPensamientoEstrategico, 
                @psicometriaNegociacion = :psicometriaNegociacion, @resultadoPorcentaje = :resultadoPorcentaje`,
                {
                    replacements: {
                        FKIdCedula, psicometriaComunicacion: Cifrar(psicometriaComunicacion), psicometriaTrabajoEnEquipo: Cifrar(psicometriaTrabajoEnEquipo), psicometriaOrientacionAlServicio: Cifrar(psicometriaOrientacionAlServicio),
                        psicometriaSensibilidadALineamientos: Cifrar(psicometriaSensibilidadALineamientos), psicometriaPlaneacionOrganizacion: Cifrar(psicometriaPlaneacionOrganizacion), psicometriaAnalisisProblemas: Cifrar(psicometriaAnalisisProblemas),
                        psicometriaEnfoqueResultados: Cifrar(psicometriaEnfoqueResultados), psicometriaControlActividades: Cifrar(psicometriaControlActividades), psicometriaEnfoqueCalidad: Cifrar(psicometriaEnfoqueCalidad),
                        psicometriaRelacionesInterpersonales: Cifrar(psicometriaRelacionesInterpersonales), psicometriaLiderazgo: Cifrar(psicometriaLiderazgo), psicometriaTomaDecisiones: Cifrar(psicometriaTomaDecisiones),
                        psicometriaDinamismo: Cifrar(psicometriaDinamismo), psicometriaInnovacion: Cifrar(psicometriaInnovacion), psicometriaPensamientoEstrategico: Cifrar(psicometriaPensamientoEstrategico),
                        psicometriaNegociacion: Cifrar(psicometriaNegociacion), resultadoPorcentaje: Cifrar(resultadoPorcentaje)
                    },
                    type: QueryTypes.RAW
                }
            );

            const Resultado = resultadoProcedimiento[0];
            if (Resultado.length > 0) {
                const Registro = Resultado[0];
                if (Registro.idResultado > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha registrado el resultado de la cédula con id: ${FKIdCedula}`)
                    }
                    await transaction.commit();
                    resultadoInsercion = {
                        ...MensajeResultado.REGISTRO_EXITOSO,
                        estado: MensajeResultado.REGISTRO_EXITOSO.resultado
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeResultado.RESULTADO_INEXISTENTE,
                        estado: MensajeResultado.RESULTADO_INEXISTENTE.resultado
                    };
                }
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarResultadoExistente({ datos, bitacoraFn, tipoDeAcceso }) {
        let resultadoEdicion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            const {
                idResultado, psicometriaComunicacion, psicometriaTrabajoEnEquipo, psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos, psicometriaPlaneacionOrganizacion, psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados, psicometriaControlActividades, psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales, psicometriaLiderazgo, psicometriaTomaDecisiones,
                psicometriaDinamismo, psicometriaInnovacion, psicometriaPensamientoEstrategico,
                psicometriaNegociacion
            } = datos;
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ActualizarResultado 
                @idResultado = :idResultado, @psicometriaComunicacion = :psicometriaComunicacion, 
                @psicometriaTrabajoEnEquipo = :psicometriaTrabajoEnEquipo, @psicometriaOrientacionAlServicio = :psicometriaOrientacionAlServicio, 
                @psicometriaSensibilidadALineamientos = :psicometriaSensibilidadALineamientos, @psicometriaPlaneacionOrganizacion = :psicometriaPlaneacionOrganizacion, 
                @psicometriaAnalisisProblemas = :psicometriaAnalisisProblemas, @psicometriaEnfoqueResultados = :psicometriaEnfoqueResultados, 
                @psicometriaControlActividades = :psicometriaControlActividades, @psicometriaEnfoqueCalidad = :psicometriaEnfoqueCalidad, 
                @psicometriaRelacionesInterpersonales = :psicometriaRelacionesInterpersonales, @psicometriaLiderazgo = :psicometriaLiderazgo, 
                @psicometriaTomaDecisiones = :psicometriaTomaDecisiones, @psicometriaDinamismo = :psicometriaDinamismo, 
                @psicometriaInnovacion = :psicometriaInnovacion, @psicometriaPensamientoEstrategico = :psicometriaPensamientoEstrategico, 
                @psicometriaNegociacion = :psicometriaNegociacion`,
                {
                    replacements: {
                        idResultado, psicometriaComunicacion: Cifrar(psicometriaComunicacion), psicometriaTrabajoEnEquipo: Cifrar(psicometriaTrabajoEnEquipo), psicometriaOrientacionAlServicio: Cifrar(psicometriaOrientacionAlServicio),
                        psicometriaSensibilidadALineamientos: Cifrar(psicometriaSensibilidadALineamientos), psicometriaPlaneacionOrganizacion: Cifrar(psicometriaPlaneacionOrganizacion), psicometriaAnalisisProblemas: Cifrar(psicometriaAnalisisProblemas),
                        psicometriaEnfoqueResultados: Cifrar(psicometriaEnfoqueResultados), psicometriaControlActividades: Cifrar(psicometriaControlActividades), psicometriaEnfoqueCalidad: Cifrar(psicometriaEnfoqueCalidad),
                        psicometriaRelacionesInterpersonales: Cifrar(psicometriaRelacionesInterpersonales), psicometriaLiderazgo: Cifrar(psicometriaLiderazgo), psicometriaTomaDecisiones: Cifrar(psicometriaTomaDecisiones),
                        psicometriaDinamismo: Cifrar(psicometriaDinamismo), psicometriaInnovacion: Cifrar(psicometriaInnovacion), psicometriaPensamientoEstrategico: Cifrar(psicometriaPensamientoEstrategico),
                        psicometriaNegociacion: Cifrar(psicometriaNegociacion)
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoSP = resultadoProcedimiento[0][0]?.actualizado;
            if (ResultadoSP === 1) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha editado un resultado de una cédula con id: ${idResultado}`)
                }
                await transaction.commit();
                resultadoEdicion = {
                    ...MensajeCedula.ACTUALIZACION_EXITOSA,
                    estado: MensajeCedula.ACTUALIZACION_EXITOSA.resultado
                };
            } else if (ResultadoSP === 0) {
                resultadoEdicion = {
                    ...MensajeResultado.RESULTADO_INEXISTENTE,
                    estado: MensajeResultado.RESULTADO_INEXISTENTE.resultado
                };
            } else {
                resultadoEdicion = {
                    ...MensajeGeneralesBD.ERROR_DB,
                    estado: MensajeGeneralesBD.ERROR_DB.resultado
                };
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoEdicion;
    }

    static async ObtenerResultadosPorIdCedula({ datos, tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdCedula } = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerResultadosPorIdCedula @idCedula = :idCedula`,
                {
                    replacements: { idCedula: FKIdCedula },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoQueryResultado = resultadoProcedimiento[0];
            if (ResultadoQueryResultado.length > 0) {
                let resultadoConsultado = ResultadoQueryResultado[0];
                resultadoConsultado = ResultadoQueryResultado.map(resultado => {
                    return {
                        ...resultado,
                        psicometriaComunicacion: Descifrar(resultado.psicometriaComunicacion), psicometriaTrabajoEnEquipo: Descifrar(resultado.psicometriaTrabajoEnEquipo), psicometriaOrientacionAlServicio: Descifrar(resultado.psicometriaOrientacionAlServicio),
                        psicometriaSensibilidadALineamientos: Descifrar(resultado.psicometriaSensibilidadALineamientos), psicometriaPlaneacionOrganizacion: Descifrar(resultado.psicometriaPlaneacionOrganizacion), psicometriaAnalisisProblemas: Descifrar(resultado.psicometriaAnalisisProblemas),
                        psicometriaEnfoqueResultados: Descifrar(resultado.psicometriaEnfoqueResultados), psicometriaControlActividades: Descifrar(resultado.psicometriaControlActividades), psicometriaEnfoqueCalidad: Descifrar(resultado.psicometriaEnfoqueCalidad), psicometriaRelacionesInterpersonales: Descifrar(resultado.psicometriaRelacionesInterpersonales),
                        psicometriaLiderazgo: Descifrar(resultado.psicometriaLiderazgo), psicometriaTomaDecisiones: Descifrar(resultado.psicometriaTomaDecisiones), psicometriaDinamismo: Descifrar(resultado.psicometriaDinamismo), psicometriaInnovacion: Descifrar(resultado.psicometriaInnovacion),
                        psicometriaPensamientoEstrategico: Descifrar(resultado.psicometriaPensamientoEstrategico), psicometriaNegociacion: Descifrar(resultado.psicometriaNegociacion)
                    }
                })
                if (resultadoConsultado[0].idResultado > 0) {
                    resultadoConsulta = { estado: 200, resultados: resultadoConsultado }
                } else {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajeResultado.RESULTADO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerResultadosPorIdCedulaResultados(IdProceso, tipoDeAcceso) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerResultadoPorCedulaRelacionada @IdProceso = :IdProceso`,
                {
                    replacements: { IdProceso },
                    type: QueryTypes.RAW
                }
            );
            const ResultadoQueryResultado = resultadoProcedimiento[0];
            if (ResultadoQueryResultado.length > 0) {
                const resultadoConsultado = ResultadoQueryResultado[0];
                if (resultadoConsultado.idResultado > 0) {
                    resultadoConsulta = { estado: 200, resultados: ResultadoQueryResultado }
                } else {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajeResultado.RESULTADO_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTodasCedulas({ tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTodasCedulas`,
                { type: QueryTypes.RAW }
            );
            const cedulas = resultadoProcedimiento[0];
            if (cedulas.length > 0) {
                resultadoConsulta = { estado: 200, cedulas };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeCedula.CEDULA_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerCedulasActivas({ tipoDeAcceso }) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerCedulasActivas`,
                { type: QueryTypes.RAW }
            );
            const cedulas = resultadoProcedimiento[0];
            if (cedulas.length > 0) {
                resultadoConsulta = { estado: 200, cedulas };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajeCedula.CEDULA_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async InsertarCedulaExterna({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const { FKIdCedula, nombre, archivo } = datos;
            const bufferArchivo = Buffer.from(archivo, 'base64');
            const archivoHex = bufferArchivo.toString('hex'); 
            const zona = 'America/Mexico_City';
            const fechaZona = toZonedTime(new Date(), zona);
            const fechaSubida = format(fechaZona, 'yyyy-MM-dd HH:mm:ss', { timeZone: zona });
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_InsertarDocumentoCedulaExterna 
                @FKIdCedula = :FKIdCedula, @nombre = :nombre, @archivo = :archivo, @fechaSubida = :fechaSubida`,
                {
                    replacements: {
                        FKIdCedula,
                        nombre: Cifrar(nombre),
                        archivo: Cifrar(archivoHex),
                        fechaSubida
                    },
                    type: QueryTypes.RAW
                }
            );

            const Resultado = resultadoProcedimiento[0];
            if (Resultado.length > 0) {
                const Registro = Resultado[0];
                if (Registro.Codigo > 0) {
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha insertado un documento de una cédula externa con id: ${FKIdCedula}`)
                    }
                    await transaction.commit();
                    resultadoInsercion = {
                        ...MensajeCedula.REGISTRO_EXITOSO,
                        estado: MensajeCedula.REGISTRO_EXITOSO.resultado
                    };
                } else {
                    resultadoInsercion = {
                        ...MensajeGeneralesBD.ERROR_DB,
                        estado: MensajeGeneralesBD.ERROR_DB.resultado
                    };
                }
            }
        } catch (error) {
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async ObtenerCedulaExternaPorFKIdCedula({datos, tipoDeAcceso}) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const {FKIdCedula} = datos;
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerDocumentoExternoPorCedula @FKIdCedula = :FKIdCedula`,
                {
                    replacements: { FKIdCedula },
                    type: QueryTypes.RAW
                }
            );
            let documentos = resultadoProcedimiento[0]; 
            if (documentos.length > 0) {
                documentos = documentos.map(doc => {
                    const archivoDescifrado = Descifrar(doc.archivo); 
                    const archivoBuffer = archivoDescifrado 
                        ? Buffer.from(archivoDescifrado, 'hex') 
                        : null;
                    return {
                        ...doc,
                        nombre:  Descifrar(doc.nombre),
                        archivo: archivoBuffer ? archivoBuffer.toString('base64') : null 
                    };
                });

                const documentoConsultado = documentos[0]; 
                if (documentoConsultado.idDocumento > 0) {
                    resultadoConsulta = {
                        estado: 200,
                        documento: {
                            idDocumento:  documentoConsultado.idDocumento,
                            FKIdCedula:   documentoConsultado.FKIdCedula,
                            nombre:       documentoConsultado.nombre,
                            fechaSubida:  documentoConsultado.fechaSubida,
                            archivo:      documentoConsultado.archivo  
                        }
                    };
                } else {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajeCedula.CEDULA_INEXISTENTE };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }
}