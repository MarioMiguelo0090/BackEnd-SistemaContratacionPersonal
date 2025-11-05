import { z } from 'zod';
import { SoloLetras, SoloLetrasNumerosCaracteres, SoloLetrasYNumeros, SoloRutas } from '../utilidades/RegexValidador.js';

const ProcesoContratacionEsquema = z.object({
    idProceso: z.number({message: "El ID del candidato debe ser un número"}).int().optional(),
    folio: z.string({message:"El folio debe ser un texto válido"}).optional(),
    numPlaza: z.string({message:"El número de plaza debe ser un texto"}).max(10,{message:"El número de plaza no debe superar los 10 caracteres"}).optional(),
    fechaRecibido: z.string({message:"La fecha de recibido no tiene un formato válido"}).optional(), 
    fechaEntrevista: z.string({message:"La fecha de entrevista no tiene un formato válido"}).optional(),
    resultadoEvaluacionConocimiento: z.string({message:"El reultado de evaluación de conocimiento debe ser una texto válido"}).optional(),
    fechaEnvioDEyDP: z.string({message:"La fecha de envio de DEyDP no tiene un formato válido"}).optional(),
    fechaNotificacion: z.string({message:"La fecha de notificación no tiene un formato válido"}).optional(),
    categoriaPuestoOrigen: z.string({message:"La categoría (puesto/origen) debe ser un texto válido"}).max(50,{message:"La categoría (puesto/origen) no debe superar los 50 caracteres"}).optional(),
    diasProceso: z.string({message:"Los dias de proceso deben ser un texto válido"}).max(3,{message:"Los días de proceso no deben superar los 3 caracteres"}).optional(),
    beneficiado: z.boolean({message:"El campo beneficiado deber ser verdadero o falso"}).optional(),
    FKIdTipoProceso: z.number({message:"El tipo de proceso debe ser un identificador válido"}).int().nullable().optional(),
    FKIdTipoPersonal: z.number({message:"El tipo de personal debe ser un identificador válido"}).int().nullable().optional(),
    FKIdEstadoProcesoContratacion: z.number({message:"El estado del proceso de contratación debe ser un identificador válido"}).int().nullable().optional(),
    FKIdTemporalDefinitiva: z.number({message:"El campo de temporal/definitivo deber tener ser un identificador válido"}).int().nullable().optional(),
    FKIdDependencia: z.number("La dependencia debe tener un identificador válido").int().nullable().optional(),
    hermesNotificacion: z.string({message:"El hermes de notificación debe ser un texto válido"}).optional(),
    titularPlaza: z.string({message:"El titular de la plaza debe ser un texto válido"}).optional(),
    lineamientoOficioContinuidad: z.string({message:"El lineamiento de oficio continuidad debe ser un texto válido"}).optional(),
    motivo: z.string({message:"El motivo debe ser un texto válido"}).optional(),
    fechaElaboracionPropuesta: z.string({message:"La fecha de elaboración de propuesta no tiene un formato válido"}).optional(),
    fechaLiberacionOficio: z.string({message:"La fecha de liberación de oficio no tiene un formato válido"}).optional(),
    periodoAutorizadoOficioInicio: z.string({message:"El inicio de período de autorización de oficio no tiene un formato válido"}).max(50).optional(),
    periodoAutorizadoOficioFin: z.string({message:"El fin de período de autorización de oficio no tiene un formato válido"}).max(50).optional(),
    categoriaAutorizadaOficio: z.string({message:"La categoría autorizada del oficio debe ser un texto válido"}).optional(),
    observaciones: z.string({message:"Las observaciones debe ser un texto válido"}).optional(),
    numCarpeta: z.string({message:"El número de carpeta debe ser un texto válido"}).max(10,{message:"El número de carpeta no deben superar los 10 caracteres"}).optional(),
    nombreCandidato: z.string({message:"El nombre de candidato debe ser un texto válido"}).max(100,{message:"El nombre de candidato no debe superar los 100 caracteres"}).optional(),
    funcionDesempeniar: z.string({message:"La función a desempeñar debe ser un texto válido"}).optional(),
    familiaFuncional: z.string({message:"La familia  funcional debe ser un texto válido"}).optional(),
    fechaEvaluacionCompetencias: z.string({message:"La fecha de evaluación de competencias no tiene un formato válido"}).optional(),
    fechaInicioProcesamiento: z.string({message:"La fecha de inicio de procesamiento no tiene un formato válido"}).optional(),
    resultadoEvaluacionCompetencias: z.string({message:"La fecha de evaluación de competencias no tiene un formato válido"}).max(6,{message:"El resultado de evalución de competencias no debe superar los 6 caracteres"}).optional(),
    experienciaLaboralSolicitada: z.string({message:"La experiencia laboral solicitada no tiene un formato válido"}).max(50,{message:"La experiencia laboral solicitada no debe superar los 50 caracteres"}).optional(),
    resultadoReferenciasLaborales: z.string({message:"El resultado de referencias laborales no tiene un formato válido"}).max(50,{message:"El resultado de referencias laborales no debe superar los 50 caracteres"}).optional(),
    fechaEnvioEvaluacionDesempenio: z.string({message:"La fecha de envio de evaluación de desempeño no tiene un formato válido"}).optional(),
    fechaEntregaEvaluacionDesempenio: z.string({message:"La fecha de entrega de evaluación de desempeño no tiene un formato válido"}).optional(),
    resultadoEvaluacionDesempenio: z.string({message:"El resultado de evaluación de desempeño debe ser un texto válido"}).max(10,{message:"El resultado de evaluación de desempeño no debe superar los 10 caracteres"}).optional(),
    resultadoHabilidadesWord: z.string({message:"El resultado de habilidades de word debe ser un texto válido"}).max(5,{message:"El resultado de habilidades de word no debe superar los 5 caracteres"}).optional(),
    resultadoHabilidadesExcel: z.string({message:"El resultado de habiliades de excel debe ser un texto válido"}).max(5,{message:"El resultado de habilidades de excel no debe superar los 5 caracteres"}).optional(),
    resultadoOrtografia: z.string({message:"El resultado de ortografía debe ser un texto válido"}).max(5,{message:"El resultado de ortografía no debe superar los 5 caracteres"}).optional(),
    resultadoProcesoEvaluacion: z.string({message:"El resultado de proceso de evaluación debe ser un texto válido"}).max(50,{message:"El resultado de proceso de evaluación no debe superar los 50 caracteres"}).optional(),
    fechaRevisionOfiEval: z.string({message:"La fecha de recibido no tiene un formato válido"}).optional(),
    observacionesAnalista: z.string({message:"Las observaciones del analista debe ser un texto válido"}).optional(),
    consecutivoExpediente: z.string({message:"El consecutivo de expediente debe ser un texto válido"}).max(10,{message:"El consecutivo de expediente no debe superar los 10 caracteres"}).optional(),
    seguimientoEvaluacionDesempenio: z.boolean({message:"El seguimiento de evaluación de desempeño deber ser verdadero o falso"}).optional(),
    fechaEvaluacionDesempenio: z.string({message:"La fecha de evaluación de desempeño no tiene un formato válido"}).optional(),
    resultadoSeguimientoEvaluacionDesempenio: z.string({message:"El resultado de seguimiento de evaluación de desempeño debe ser un texto válido"}).max(10,{message:"El resultado de seguimiento de evaluación de desempeño no debe superar los 10 caracteres"}).optional(),
    FKIdAcceso: z.number({message:"El usuario debe tener un identificador válido"}).int().nullable().optional(),
    autorizacion: z.boolean({message:"El campo autorización deber ser verdadero o falso"}).optional(),
    educacionFormal: z.string({message:"El campo eduación formal debe ser un texto válido"}).optional(),
    avaladoPor: z.string({message:"El campo avalado debe ser un texto válido"}).optional(),
    fechaAsignacionAnalista: z.string("La fecha de asignación de analista no tiene un formato válido").optional(),
    capacitado: z.boolean().optional(),
});

const ControlVersionEsquema = z.object({
    FKIdProceso: z.number().int().optional(),
    nombreCompleto: z.string().optional(),
    jsonDatos: z.string().optional(),
});

export function ValidarEdicionParcialProcesoContratacion(entrada) {
    return ProcesoContratacionEsquema.partial().safeParse(entrada);
}

export function ValidarEdicionParcialControlVersiones(entrada){
    return ControlVersionEsquema.partial().safeParse(entrada);
}