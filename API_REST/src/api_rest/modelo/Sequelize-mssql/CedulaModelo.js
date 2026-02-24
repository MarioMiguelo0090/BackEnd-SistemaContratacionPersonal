import { Cifrar } from '../../utilidades/Cifrado.js';
import { MensajeCedula, MensajeGeneralesBD, MensajeResultado } from '../../utilidades/Constantes.js';
import { obtenerConexion } from './config/config.js';
import { QueryTypes } from "sequelize";

//TODO: Probar la inserción de la cedula, modificando los tamaños en la base de datos y procedimientos almacenados.

export class ModeloCedula {
    static async InsertarNuevaCedula({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
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
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarCedula({ datos, bitacoraFn,tipoDeAcceso }) {
        let resultadoEdicion;
        const sequelize = obtenerConexion(tipoDeAcceso);
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
                        idCedula, FKIdTipoCedula, FKIdProceso, fechaCedulaInterna: Cifrar(fechaCedulaInterna), fechaCedulaResultados: Cifrar(fechaCedulaResultados),
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

            const ResultadoQueryCedula = resultadoProcedimiento[0];
            if (ResultadoQueryCedula.length > 0) {
                const cedulaConsultada = ResultadoQueryCedula[0];
                if (cedulaConsultada.idCedula > 0) {
                    resultadoConsulta = { estado: 200, cedula: ResultadoQueryCedula }
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

    static async InsertarNuevoResultado({ datos, tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
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
                        FKIdCedula, psicometriaComunicacion, psicometriaTrabajoEnEquipo, psicometriaOrientacionAlServicio,
                        psicometriaSensibilidadALineamientos, psicometriaPlaneacionOrganizacion, psicometriaAnalisisProblemas,
                        psicometriaEnfoqueResultados, psicometriaControlActividades, psicometriaEnfoqueCalidad,
                        psicometriaRelacionesInterpersonales, psicometriaLiderazgo, psicometriaTomaDecisiones,
                        psicometriaDinamismo, psicometriaInnovacion, psicometriaPensamientoEstrategico,
                        psicometriaNegociacion, resultadoPorcentaje
                    },
                    type: QueryTypes.RAW
                }
            );

            const Resultado = resultadoProcedimiento[0];
            if (Resultado.length > 0) {
                const Registro = Resultado[0];
                if (Registro.idResultado > 0) {
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
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarResultadoExistente({ datos, tipoDeAcceso }) {
        let resultadoEdicion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const {
                idResultado, psicometriaComunicacion, psicometriaTrabajoEnEquipo, psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos, psicometriaPlaneacionOrganizacion, psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados, psicometriaControlActividades, psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales, psicometriaLiderazgo, psicometriaTomaDecisiones,
                psicometriaDinamismo, psicometriaInnovacion, psicometriaPensamientoEstrategico,
                psicometriaNegociacion
            } = datos;

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
                        idResultado, psicometriaComunicacion, psicometriaTrabajoEnEquipo, psicometriaOrientacionAlServicio,
                        psicometriaSensibilidadALineamientos, psicometriaPlaneacionOrganizacion, psicometriaAnalisisProblemas,
                        psicometriaEnfoqueResultados, psicometriaControlActividades, psicometriaEnfoqueCalidad,
                        psicometriaRelacionesInterpersonales, psicometriaLiderazgo, psicometriaTomaDecisiones,
                        psicometriaDinamismo, psicometriaInnovacion, psicometriaPensamientoEstrategico,
                        psicometriaNegociacion
                    },
                    type: QueryTypes.RAW
                }
            );

            const ResultadoSP = resultadoProcedimiento[0][0]?.actualizado;
            if (ResultadoSP === 1) {
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

    static async InsertarCedulaExterna({ datos, tipoDeAcceso }) {
        let resultadoInsercion;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const { FKIdCedula, nombre, archivo } = datos;
            const fechaSubida = new Date();
            const bufferArchivo = Buffer.from(archivo, 'base64');

            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_InsertarDocumentoCedulaExterna 
                @FKIdCedula = :FKIdCedula, @nombre = :nombre, @archivo = :archivo, @fechaSubida = :fechaSubida`,
                {
                    replacements: {
                        FKIdCedula,
                        nombre,
                        archivo: bufferArchivo,
                        fechaSubida
                    },
                    type: QueryTypes.RAW
                }
            );

            const Resultado = resultadoProcedimiento[0];
            if (Resultado.length > 0) {
                const Registro = Resultado[0];
                if (Registro.Codigo > 0) {
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
            throw error;
        }
        return resultadoInsercion;
    }

    static async ObtenerCedulaExternaPorFKIdCedula(FKIdCedula, tipoDeAcceso) {
        let resultadoConsulta;
        const sequelize = obtenerConexion(tipoDeAcceso);
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerDocumentoExternoPorCedula @FKIdCedula = :FKIdCedula`,
                {
                    replacements: { FKIdCedula },
                    type: QueryTypes.RAW
                }
            );

            const documentos = resultadoProcedimiento[0];
            if (documentos.length > 0) {
                const documentoConsultado = documentos[0];
                if (documentoConsultado.idDocumento > 0) {
                    const base64Archivo = documentoConsultado.archivo.toString('base64');
                    resultadoConsulta = {
                        estado: 200,
                        documento: {
                            idDocumento: documentoConsultado.idDocumento,
                            FKIdCedula: documentoConsultado.FKIdCedula,
                            nombre: documentoConsultado.nombre,
                            fechaSubida: documentoConsultado.fechaSubida,
                            archivo: base64Archivo
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