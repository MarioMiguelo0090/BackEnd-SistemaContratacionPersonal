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
    puesto: zod.string().optional()
});


export function ValidarEdicionParcialCedula(entrada) {
    return CedulaEsquema.partial().safeParse(entrada);
}
