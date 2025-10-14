import zod from 'zod';

const CedulaEsquema = zod.object({
    idCedula: zod.number().int().optional(),
    FKIdTipoCedula: zod.number().int().nullable().optional(),
    FKIdProceso: zod.number().int().nullable().optional(),
    fechaCedulaInterna: zod.string().optional(), 
    fechaCedulaResultados: zod.string().optional(),
    edad: zod.string().max(3).optional(),
    educacionFormal: zod.string().optional(),
    referidoPor: zod.string().optional(),
    antecedentesFamiliaresUV: zod.string().optional(),
    expectativaLaboral: zod.string().optional(),
    experienciaRelacionada: zod.string().optional(),
    experiencia: zod.string().optional(),
    conclusiones: zod.string().optional(),
    resultado: zod.string().max(50).optional(),
    efectoContratacion: zod.string().optional(),
    competenciaReforzar: zod.string().optional(),
    competenciaDesarrollar: zod.string().optional(),
    FKIdClasificacionCedula: zod.number().int().nullable().optional(),
    FKIdResultado: zod.number().int().nullable().optional(),
    motivoCedulaInterna: zod.string().optional(),
    motivoCedulaResultados: zod.string().optional(),
    puesto: zod.string().optional(),
    hermesNotificacion: zod.string().optional(),
    competenciasSobresaliente: zod.string().optional(),
    descripcionDesarrollar: zod.string().optional(),
    descripcionReforzar: zod.string().optional(),
    plaza: zod.string().optional(),
    oficioAutorizacionDeOcupacion: zod.string().optional(),
    evaluacionConocimientos: zod.string().optional(),
    estado: zod.boolean().optional(),
    idCedulaResultados: zod.number().int().optional()  
});

const ResultadoEsquema = zod.object({
    idResultado: zod.number().int().optional(),
    FKIdCedula: zod.number().int(),
    psicometriaComunicacion: zod.number().nullable().optional(),
    psicometriaTrabajoEnEquipo: zod.number().nullable().optional(),
    psicometriaOrientacionAlServicio: zod.number().nullable().optional(),
    psicometriaSensibilidadALineamientos: zod.number().nullable().optional(),
    psicometriaPlaneacionOrganizacion: zod.number().nullable().optional(),
    psicometriaAnalisisProblemas: zod.number().nullable().optional(),
    psicometriaEnfoqueResultados: zod.number().nullable().optional(),
    psicometriaControlActividades: zod.number().nullable().optional(),
    psicometriaEnfoqueCalidad: zod.number().nullable().optional(),
    psicometriaRelacionesInterpersonales: zod.number().nullable().optional(),
    psicometriaLiderazgo: zod.number().nullable().optional(),
    psicometriaTomaDecisiones: zod.number().nullable().optional(),
    psicometriaDinamismo: zod.number().nullable().optional(),
    psicometriaInnovacion: zod.number().nullable().optional(),
    psicometriaPensamientoEstrategico: zod.number().nullable().optional(),
    psicometriaNegociacion: zod.number().nullable().optional(),    
    IdProceso: zod.number().int().optional(),
    resultadoPorcentaje: zod.number().int().optional(),
});

export function ValidarEdicionParcialCedula(entrada) {
    return CedulaEsquema.partial().safeParse(entrada);
}

export function ValidarEdicionParcialResultado(entrada) {
    return ResultadoEsquema.partial().safeParse(entrada);
}
