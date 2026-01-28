/**
 * @swagger
 * tags:
 *   name: ProcesoContratacion
 *   description: Endpoints para la gestión de procesos de contratación
 */

/**
 * @swagger
 * /rysuv/procesoContratacion/:
 *   post:
 *     summary: Registrar un nuevo proceso de contratación
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     description: Crea un nuevo registro de proceso de contratación con toda la información del candidato, evaluación, fechas y seguimiento.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               folio:
 *                 type: string
 *               numPlaza:
 *                 type: string
 *               fechaRecibido:
 *                 type: string
 *                 format: date
 *               fechaEntrevista:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionConocimiento:
 *                 type: string
 *               fechaEnvioDEyDP:
 *                 type: string
 *                 format: date
 *               fechaNotificacion:
 *                 type: string
 *                 format: date
 *               categoriaPuestoOrigen:
 *                 type: string
 *               diasProceso:
 *                 type: string
 *               beneficiado:
 *                 type: boolean
 *               FKIdTipoProceso:
 *                 type: integer
 *               FKIdTipoPersonal:
 *                 type: integer
 *               FKIdEstadoProcesoContratacion:
 *                 type: integer
 *               FKIdTemporalDefinitiva:
 *                 type: integer
 *               FKIdDependencia:
 *                 type: integer
 *               hermesNotificacion:
 *                 type: string
 *               titularPlaza:
 *                 type: string
 *               lineamientoOficioContinuidad:
 *                 type: string
 *               motivo:
 *                 type: string
 *               fechaElaboracionPropuesta:
 *                 type: string
 *                 format: date
 *               fechaLiberacionOficio:
 *                 type: string
 *                 format: date
 *               periodoAutorizadoOficioInicio:
 *                 type: string
 *                 format: date
 *               periodoAutorizadoOficioFin:
 *                 type: string
 *                 format: date
 *               observaciones:
 *                 type: string
 *               numCarpeta:
 *                 type: string
 *               nombreCandidato:
 *                 type: string
 *               funcionDesempeniar:
 *                 type: string
 *               familiaFuncional:
 *                 type: string
 *               fechaEvaluacionCompetencias:
 *                 type: string
 *                 format: date
 *               fechaInicioProcesamiento:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionCompetencias:
 *                 type: string
 *               experienciaLaboralSolicitada:
 *                 type: string
 *               resultadoReferenciasLaborales:
 *                 type: string
 *               fechaEnvioEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               fechaEntregaEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionDesempenio:
 *                 type: string
 *               resultadoHabilidadesWord:
 *                 type: string
 *               resultadoHabilidadesExcel:
 *                 type: string
 *               resultadoOrtografia:
 *                 type: string
 *               resultadoProcesoEvaluacion:
 *                 type: string
 *               fechaRevisionOfiEval:
 *                 type: string
 *                 format: date
 *               observacionesAnalista:
 *                 type: string
 *               consecutivoExpediente:
 *                 type: string
 *               seguimientoEvaluacionDesempenio:
 *                 type: boolean
 *               fechaEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               resultadoSeguimientoEvaluacionDesempenio:
 *                 type: string
 *               FKIdAcceso:
 *                 type: integer
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *               FKIdAcceso: 1
 *     responses:
 *       200:
 *         description: Proceso de contratación registrado correctamente.
 *       400:
 *         description: Datos inválidos o campos faltantes.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500: 
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/noBeneficiados:
 *   get:
 *     summary: Obtener procesos de contratación de candidatos no beneficiados
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de procesos no beneficiados obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   folio:
 *                     type: string
 *                   numPlaza:
 *                     type: string
 *                   fechaRecibido:
 *                     type: string
 *                     format: date
 *                   fechaEntrevista:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionConocimiento:
 *                     type: string
 *                   fechaEnvioDEyDP:
 *                     type: string
 *                     format: date
 *                   fechaNotificacion:
 *                     type: string
 *                     format: date
 *                   categoriaPuestoOrigen:
 *                     type: string
 *                   diasProceso:
 *                     type: string
 *                   beneficiado:
 *                     type: boolean
 *                   FKIdTipoProceso:
 *                     type: integer
 *                   FKIdTipoPersonal:
 *                     type: integer
 *                   FKIdEstadoProcesoContratacion:
 *                     type: integer
 *                   FKIdTemporalDefinitiva:
 *                     type: integer
 *                   FKIdDependencia:
 *                     type: integer
 *                   hermesNotificacion:
 *                     type: string
 *                   titularPlaza:
 *                     type: string
 *                   lineamientoOficioContinuidad:
 *                     type: string
 *                   motivo:
 *                     type: string
 *                   fechaElaboracionPropuesta:
 *                     type: string
 *                     format: date
 *                   fechaLiberacionOficio:
 *                     type: string
 *                     format: date
 *                   periodoAutorizadoOficioInicio:
 *                     type: string
 *                     format: date
 *                   periodoAutorizadoOficioFin:
 *                     type: string
 *                     format: date
 *                   observaciones:
 *                     type: string
 *                   numCarpeta:
 *                     type: string
 *                   nombreCandidato:
 *                     type: string
 *                   funcionDesempeniar:
 *                     type: string
 *                   familiaFuncional:
 *                     type: string
 *                   fechaEvaluacionCompetencias:
 *                     type: string
 *                     format: date
 *                   fechaInicioProcesamiento:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionCompetencias:
 *                     type: string
 *                   experienciaLaboralSolicitada:
 *                     type: string
 *                   resultadoReferenciasLaborales:
 *                     type: string
 *                   fechaEnvioEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   fechaEntregaEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionDesempenio:
 *                     type: string
 *                   resultadoHabilidadesWord:
 *                     type: string
 *                   resultadoHabilidadesExcel:
 *                     type: string
 *                   resultadoOrtografia:
 *                     type: string
 *                   resultadoProcesoEvaluacion:
 *                     type: string
 *                   fechaRevisionOfiEval:
 *                     type: string
 *                     format: date
 *                   observacionesAnalista:
 *                     type: string
 *                   consecutivoExpediente:
 *                     type: string
 *                   seguimientoEvaluacionDesempenio:
 *                     type: boolean
 *                   fechaEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   resultadoSeguimientoEvaluacionDesempenio:
 *                     type: string
 *                   FKIdAcceso:
 *                     type: integer
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *       400:
 *         description: Datos inválidos o campos faltantes.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500: 
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/procesoContratacion/busqueda/procesos/:
 *   get:
 *     summary: Obtener todos los procesos de contratación
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de procesos no beneficiados obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   folio:
 *                     type: string
 *                   numPlaza:
 *                     type: string
 *                   fechaRecibido:
 *                     type: string
 *                     format: date
 *                   fechaEntrevista:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionConocimiento:
 *                     type: string
 *                   fechaEnvioDEyDP:
 *                     type: string
 *                     format: date
 *                   fechaNotificacion:
 *                     type: string
 *                     format: date
 *                   categoriaPuestoOrigen:
 *                     type: string
 *                   diasProceso:
 *                     type: string
 *                   beneficiado:
 *                     type: boolean
 *                   FKIdTipoProceso:
 *                     type: integer
 *                   FKIdTipoPersonal:
 *                     type: integer
 *                   FKIdEstadoProcesoContratacion:
 *                     type: integer
 *                   FKIdTemporalDefinitiva:
 *                     type: integer
 *                   FKIdDependencia:
 *                     type: integer
 *                   hermesNotificacion:
 *                     type: string
 *                   titularPlaza:
 *                     type: string
 *                   lineamientoOficioContinuidad:
 *                     type: string
 *                   motivo:
 *                     type: string
 *                   fechaElaboracionPropuesta:
 *                     type: string
 *                     format: date
 *                   fechaLiberacionOficio:
 *                     type: string
 *                     format: date
 *                   periodoAutorizadoOficioInicio:
 *                     type: string
 *                     format: date
 *                   periodoAutorizadoOficioFin:
 *                     type: string
 *                     format: date
 *                   observaciones:
 *                     type: string
 *                   numCarpeta:
 *                     type: string
 *                   nombreCandidato:
 *                     type: string
 *                   funcionDesempeniar:
 *                     type: string
 *                   familiaFuncional:
 *                     type: string
 *                   fechaEvaluacionCompetencias:
 *                     type: string
 *                     format: date
 *                   fechaInicioProcesamiento:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionCompetencias:
 *                     type: string
 *                   experienciaLaboralSolicitada:
 *                     type: string
 *                   resultadoReferenciasLaborales:
 *                     type: string
 *                   fechaEnvioEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   fechaEntregaEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   resultadoEvaluacionDesempenio:
 *                     type: string
 *                   resultadoHabilidadesWord:
 *                     type: string
 *                   resultadoHabilidadesExcel:
 *                     type: string
 *                   resultadoOrtografia:
 *                     type: string
 *                   resultadoProcesoEvaluacion:
 *                     type: string
 *                   fechaRevisionOfiEval:
 *                     type: string
 *                     format: date
 *                   observacionesAnalista:
 *                     type: string
 *                   consecutivoExpediente:
 *                     type: string
 *                   seguimientoEvaluacionDesempenio:
 *                     type: boolean
 *                   fechaEvaluacionDesempenio:
 *                     type: string
 *                     format: date
 *                   resultadoSeguimientoEvaluacionDesempenio:
 *                     type: string
 *                   FKIdAcceso:
 *                     type: integer
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *       400:
 *         description: Datos inválidos o campos faltantes.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500: 
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/procesoContratacion/{idProceso}:
 *   put:
 *     summary: Editar un proceso de contratación existente
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proceso a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               folio:
 *                 type: string
 *               numPlaza:
 *                 type: string
 *               fechaRecibido:
 *                 type: string
 *                 format: date
 *               fechaEntrevista:
 *                  type: string
 *                  format: date
 *               resultadoEvaluacionConocimiento:
 *                   type: string
 *               fechaEnvioDEyDP:
 *                   type: string
 *                   format: date
 *               fechaNotificacion:
 *                   type: string
 *                   format: date
 *               categoriaPuestoOrigen:
 *                   type: string
 *               diasProceso:
 *                   type: string
 *               beneficiado:
 *                   type: boolean
 *               FKIdTipoProceso:
 *                   type: integer
 *               FKIdTipoPersonal:
 *                   type: integer
 *               FKIdEstadoProcesoContratacion:
 *                   type: integer
 *               FKIdTemporalDefinitiva:
 *                   type: integer
 *               FKIdDependencia:
 *                   type: integer
 *               hermesNotificacion:
 *                   type: string
 *               titularPlaza:
 *                   type: string
 *               lineamientoOficioContinuidad:
 *                   type: string
 *               motivo:
 *                   type: string
 *               fechaElaboracionPropuesta:
 *                   type: string
 *                   format: date
 *               fechaLiberacionOficio:
 *                   type: string
 *                   format: date
 *               periodoAutorizadoOficioInicio:
 *                   type: string
 *                   format: date
 *               periodoAutorizadoOficioFin:
 *                   type: string
 *                   format: date
 *               observaciones:
 *                   type: string
 *               numCarpeta:
 *                   type: string
 *               nombreCandidato:
 *                   type: string
 *               funcionDesempeniar:
 *                   type: string
 *               familiaFuncional:
 *                   type: string
 *               fechaEvaluacionCompetencias:
 *                   type: string
 *                   format: date
 *               fechaInicioProcesamiento:
 *                   type: string
 *                   format: date
 *               resultadoEvaluacionCompetencias:
 *                   type: string
 *               experienciaLaboralSolicitada:
 *                   type: string
 *               resultadoReferenciasLaborales:
 *                   type: string
 *               fechaEnvioEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               fechaEntregaEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               resultadoEvaluacionDesempenio:
 *                   type: string
 *               resultadoHabilidadesWord:
 *                   type: string
 *               resultadoHabilidadesExcel:
 *                   type: string
 *               resultadoOrtografia:
 *                   type: string
 *               resultadoProcesoEvaluacion:
 *                   type: string
 *               fechaRevisionOfiEval:
 *                   type: string
 *                   format: date
 *               observacionesAnalista:
 *                   type: string
 *               consecutivoExpediente:
 *                   type: string
 *               seguimientoEvaluacionDesempenio:
 *                   type: boolean
 *               fechaEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               resultadoSeguimientoEvaluacionDesempenio:
 *                   type: string
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *     responses:
 *       200:
 *         description: Proceso actualizado correctamente.
 *       404:
 *         description: No se encontró el proceso.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/procesoContratacion/busqueda:
 *   post:
 *     summary: Obtener un proceso de contratación por sus criterios de búsqueda
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               folio:
 *                 type: string
 *               numPlaza:
 *                 type: string
 *               fechaRecibido:
 *                 type: string
 *                 format: date
 *               fechaEntrevista:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionConocimiento:
 *                 type: string
 *               fechaEnvioDEyDP:
 *                 type: string
 *                 format: date
 *               fechaNotificacion:
 *                 type: string
 *                 format: date
 *               categoriaPuestoOrigen:
 *                 type: string
 *               diasProceso:
 *                 type: string
 *               beneficiado:
 *                 type: boolean
 *               FKIdTipoProceso:
 *                 type: integer
 *               FKIdTipoPersonal:
 *                 type: integer
 *               FKIdEstadoProcesoContratacion:
 *                 type: integer
 *               FKIdTemporalDefinitiva:
 *                 type: integer
 *               FKIdDependencia:
 *                 type: integer
 *               hermesNotificacion:
 *                 type: string
 *               titularPlaza:
 *                 type: string
 *               lineamientoOficioContinuidad:
 *                 type: string
 *               motivo:
 *                 type: string
 *               fechaElaboracionPropuesta:
 *                 type: string
 *                 format: date
 *               fechaLiberacionOficio:
 *                 type: string
 *                 format: date
 *               periodoAutorizadoOficioInicio:
 *                 type: string
 *                 format: date
 *               periodoAutorizadoOficioFin:
 *                 type: string
 *                 format: date
 *               observaciones:
 *                 type: string
 *               numCarpeta:
 *                 type: string
 *               nombreCandidato:
 *                 type: string
 *               funcionDesempeniar:
 *                 type: string
 *               familiaFuncional:
 *                 type: string
 *               fechaEvaluacionCompetencias:
 *                 type: string
 *                 format: date
 *               fechaInicioProcesamiento:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionCompetencias:
 *                 type: string
 *               experienciaLaboralSolicitada:
 *                 type: string
 *               resultadoReferenciasLaborales:
 *                 type: string
 *               fechaEnvioEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               fechaEntregaEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               resultadoEvaluacionDesempenio:
 *                 type: string
 *               resultadoHabilidadesWord:
 *                 type: string
 *               resultadoHabilidadesExcel:
 *                 type: string
 *               resultadoOrtografia:
 *                 type: string
 *               resultadoProcesoEvaluacion:
 *                 type: string
 *               fechaRevisionOfiEval:
 *                 type: string
 *                 format: date
 *               observacionesAnalista:
 *                 type: string
 *               consecutivoExpediente:
 *                 type: string
 *               seguimientoEvaluacionDesempenio:
 *                 type: boolean
 *               fechaEvaluacionDesempenio:
 *                 type: string
 *                 format: date
 *               resultadoSeguimientoEvaluacionDesempenio:
 *                 type: string
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *     responses:
 *       200:
 *         description: Proceso de contratación obtenido correctamente.
 *       404:
 *         description: No se encontró el proceso.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/busqueda/{FKIdAcceso}:
 *   get:
 *     summary: Obtener proceso de contratación por ID de acceso
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               folio:
 *                 type: string
 *               numPlaza:
 *                 type: string
 *               fechaRecibido:
 *                 type: string
 *                 format: date
 *               fechaEntrevista:
 *                  type: string
 *                  format: date
 *               resultadoEvaluacionConocimiento:
 *                   type: string
 *               fechaEnvioDEyDP:
 *                   type: string
 *                   format: date
 *               fechaNotificacion:
 *                   type: string
 *                   format: date
 *               categoriaPuestoOrigen:
 *                   type: string
 *               diasProceso:
 *                   type: string
 *               beneficiado:
 *                   type: boolean
 *               FKIdTipoProceso:
 *                   type: integer
 *               FKIdTipoPersonal:
 *                   type: integer
 *               FKIdEstadoProcesoContratacion:
 *                   type: integer
 *               FKIdTemporalDefinitiva:
 *                   type: integer
 *               FKIdDependencia:
 *                   type: integer
 *               hermesNotificacion:
 *                   type: string
 *               titularPlaza:
 *                   type: string
 *               lineamientoOficioContinuidad:
 *                   type: string
 *               motivo:
 *                   type: string
 *               fechaElaboracionPropuesta:
 *                   type: string
 *                   format: date
 *               fechaLiberacionOficio:
 *                   type: string
 *                   format: date
 *               periodoAutorizadoOficioInicio:
 *                   type: string
 *                   format: date
 *               periodoAutorizadoOficioFin:
 *                   type: string
 *                   format: date
 *               observaciones:
 *                   type: string
 *               numCarpeta:
 *                   type: string
 *               nombreCandidato:
 *                   type: string
 *               funcionDesempeniar:
 *                   type: string
 *               familiaFuncional:
 *                   type: string
 *               fechaEvaluacionCompetencias:
 *                   type: string
 *                   format: date
 *               fechaInicioProcesamiento:
 *                   type: string
 *                   format: date
 *               resultadoEvaluacionCompetencias:
 *                   type: string
 *               experienciaLaboralSolicitada:
 *                   type: string
 *               resultadoReferenciasLaborales:
 *                   type: string
 *               fechaEnvioEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               fechaEntregaEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               resultadoEvaluacionDesempenio:
 *                   type: string
 *               resultadoHabilidadesWord:
 *                   type: string
 *               resultadoHabilidadesExcel:
 *                   type: string
 *               resultadoOrtografia:
 *                   type: string
 *               resultadoProcesoEvaluacion:
 *                   type: string
 *               fechaRevisionOfiEval:
 *                   type: string
 *                   format: date
 *               observacionesAnalista:
 *                   type: string
 *               consecutivoExpediente:
 *                   type: string
 *               seguimientoEvaluacionDesempenio:
 *                   type: boolean
 *               fechaEvaluacionDesempenio:
 *                   type: string
 *                   format: date
 *               resultadoSeguimientoEvaluacionDesempenio:
 *                   type: string
 *             example:
 *               folio: "1183"
 *               numPlaza: "50002"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Analista Jr"
 *               diasProceso: "15"
 *               beneficiado: false
 *               FKIdTipoProceso: 1
 *               FKIdTipoPersonal: 2
 *               FKIdEstadoProcesoContratacion: 3
 *               FKIdTemporalDefinitiva: 1
 *               FKIdDependencia: 10
 *               hermesNotificacion: "YTLQ5952-25"
 *               titularPlaza: "Juan Perez Cordoba"
 *               lineamientoOficioContinuidad: "4.1 y 4.2"
 *               motivo: "Jubilación"
 *               fechaElaboracionPropuesta: "2025-09-16"
 *               fechaLiberacionOficio: "2025-09-20"
 *               periodoAutorizadoOficioInicio: "2025-10-01"
 *               periodoAutorizadoOficioFin: "2025-12-31"
 *               observaciones: "Se recomienda proceder con el candidato seleccionado."
 *               numCarpeta: "10"
 *               nombreCandidato: "Maria Lopez Gutierrez"
 *               funcionDesempeniar: "Gestión de proyectos"
 *               familiaFuncional: "Administrativa"
 *               fechaEvaluacionCompetencias: "2025-09-18"
 *               fechaInicioProcesamiento: "2025-09-05"
 *               resultadoEvaluacionCompetencias: "10"
 *               experienciaLaboralSolicitada: "3 años"
 *               resultadoReferenciasLaborales: "Recomendable"
 *               fechaEnvioEvaluacionDesempenio: "2025-09-22"
 *               fechaEntregaEvaluacionDesempenio: "2025-09-25"
 *               resultadoEvaluacionDesempenio: "10"
 *               resultadoHabilidadesWord: "90"
 *               resultadoHabilidadesExcel: "85"
 *               resultadoOrtografia: "95"
 *               resultadoProcesoEvaluacion: "Recomendable"
 *               fechaRevisionOfiEval: "2025-09-28"
 *               observacionesAnalista: "Buen desempeño en las entrevistas"
 *               consecutivoExpediente: "123"
 *               seguimientoEvaluacionDesempenio: false
 *               fechaEvaluacionDesempenio: "2025-09-30"
 *               resultadoSeguimientoEvaluacionDesempenio: "OK"
 *     parameters:
 *       - in: path
 *         name: FKIdAcceso
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proceso obtenido correctamente.
 *       404:
 *         description: No se encontró el proceso.
 */

/**
 * @swagger
 * /rysuv/procesoContratacion/busqueda/estado/{FKIdEstadoProcesoContratacion}:
 *   get:
 *     summary: Obtener procesos de contratación por estado
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdEstadoProcesoContratacion
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado del proceso de contratación.
 *     responses:
 *       200:
 *         description: Lista de procesos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 estado:
 *                   type: integer
 *                   example: 200
 *                 procesoContratacion:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProceso:
 *                         type: integer
 *                       folio:
 *                         type: string
 *                       numPlaza:
 *                         type: string
 *                       fechaRecibido:
 *                         type: string
 *                         format: date-time
 *                       fechaEntrevista:
 *                         type: string
 *                         format: date-time
 *                       resultadoEvaluacionConocimiento:
 *                         type: string
 *                       fechaEnvioDEyDP:
 *                         type: string
 *                         format: date-time
 *                       fechaNotificacion:
 *                         type: string
 *                         format: date-time
 *                       categoriaPuestoOrigen:
 *                         type: string
 *                       diasProceso:
 *                         type: string
 *                       beneficiado:
 *                         type: boolean
 *                       FKIdTipoProceso:
 *                         type: integer
 *                       FKIdTipoPersonal:
 *                         type: integer
 *                       FKIdEstadoProcesoContratacion:
 *                         type: integer
 *                       FKIdTemporalDefinitiva:
 *                         type: integer
 *                       FKIdDependencia:
 *                         type: integer
 *                       hermesNotificacion:
 *                         type: string
 *                       titularPlaza:
 *                         type: string
 *                       lineamientoOficioContinuidad:
 *                         type: string
 *                       motivo:
 *                         type: string
 *                       fechaElaboracionPropuesta:
 *                         type: string
 *                         format: date-time
 *                       periodoAutorizadoOficioInicio:
 *                         type: string
 *                         format: date-time
 *                       periodoAutorizadoOficioFin:
 *                         type: string
 *                         format: date-time
 *                       observaciones:
 *                         type: string
 *                       nombreCandidato:
 *                         type: string
 *                       funcionDesempeniar:
 *                         type: string
 *                       familiaFuncional:
 *                         type: string
 *                       resultadoProcesoEvaluacion:
 *                         type: string
 *             example:
 *               error: false
 *               estado: 200
 *               procesoContratacion:
 *                 - idProceso: 1
 *                   folio: "FOL12"
 *                   numPlaza: "PLZ123"
 *                   fechaRecibido: "2025-09-04T00:00:00.000Z"
 *                   fechaEntrevista: "2025-09-10T00:00:00.000Z"
 *                   resultadoEvaluacionConocimiento: "APROB"
 *                   fechaEnvioDEyDP: "2025-09-12T00:00:00.000Z"
 *                   fechaNotificacion: "2025-09-15T00:00:00.000Z"
 *                   categoriaPuestoOrigen: "Analista Jr"
 *                   diasProceso: "15"
 *                   beneficiado: false
 *                   FKIdTipoProceso: 1
 *                   FKIdTipoPersonal: 2
 *                   FKIdEstadoProcesoContratacion: 3
 *                   FKIdTemporalDefinitiva: 1
 *                   FKIdDependencia: 10
 *                   hermesNotificacion: "HERM113"
 *                   titularPlaza: "Juan Perez"
 *                   motivo: "Cobertura de vacante por promoción"
 *                   observaciones: "Se recomienda proceder con el candidato seleccionado."
 *                   nombreCandidato: "Maria Lopez"
 *                   resultadoProcesoEvaluacion: "Aprobado"
 *       400:
 *         description: Parámetro inválido o faltante.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/estadistica/{FKIdAcceso}:
 *   get:
 *     summary: Obtener datos estadísticos de procesos de contratación por analista
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdAcceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del analista o usuario de acceso.
 *     responses:
 *       200:
 *         description: Datos estadísticos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 estado:
 *                   type: integer
 *                   example: 200
 *                 evaluacionesAnalista:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProceso:
 *                         type: integer
 *                       folio:
 *                         type: string
 *                       numPlaza:
 *                         type: string
 *                       fechaRecibido:
 *                         type: string
 *                         format: date-time
 *                       fechaEntrevista:
 *                         type: string
 *                         format: date-time
 *                       resultadoEvaluacionConocimiento:
 *                         type: string
 *                       fechaEnvioDEyDP:
 *                         type: string
 *                         format: date-time
 *                       fechaNotificacion:
 *                         type: string
 *                         format: date-time
 *                       categoriaPuestoOrigen:
 *                         type: string
 *                       diasProceso:
 *                         type: string
 *                       beneficiado:
 *                         type: boolean
 *                       FKIdTipoProceso:
 *                         type: integer
 *                       FKIdTipoPersonal:
 *                         type: integer
 *                       FKIdEstadoProcesoContratacion:
 *                         type: integer
 *                       FKIdTemporalDefinitiva:
 *                         type: integer
 *                       FKIdDependencia:
 *                         type: integer
 *                       hermesNotificacion:
 *                         type: string
 *                       titularPlaza:
 *                         type: string
 *                       motivo:
 *                         type: string
 *                       resultadoProcesoEvaluacion:
 *                         type: string
 *                       nombreCandidato:
 *                         type: string
 *                       funcionDesempeniar:
 *                         type: string
 *                       familiaFuncional:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       primerApellido:
 *                         type: string
 *                       segundoApellido:
 *                         type: string
 *             example:
 *               error: false
 *               estado: 200
 *               evaluacionesAnalista:
 *                 - idProceso: 1
 *                   folio: "FOL12"
 *                   numPlaza: "PLZ123"
 *                   fechaRecibido: "2025-09-04T00:00:00.000Z"
 *                   fechaEntrevista: "2025-09-10T00:00:00.000Z"
 *                   resultadoEvaluacionConocimiento: "APROB"
 *                   fechaEnvioDEyDP: "2025-09-12T00:00:00.000Z"
 *                   fechaNotificacion: "2025-09-15T00:00:00.000Z"
 *                   categoriaPuestoOrigen: "Analista Jr"
 *                   diasProceso: "15"
 *                   beneficiado: false
 *                   FKIdTipoProceso: 1
 *                   FKIdTipoPersonal: 2
 *                   FKIdEstadoProcesoContratacion: 3
 *                   FKIdTemporalDefinitiva: 1
 *                   FKIdDependencia: 10
 *                   hermesNotificacion: "HERM113"
 *                   titularPlaza: "Juan Perez"
 *                   motivo: "Cobertura de vacante por promoción"
 *                   resultadoProcesoEvaluacion: "Aprobado"
 *                   nombreCandidato: "Maria Lopez"
 *                   funcionDesempeniar: "Gestión de proyectos"
 *                   familiaFuncional: "Administrativa"
 *                   nombre: "Administrador"
 *                   primerApellido: "Administrador"
 *                   segundoApellido: null
 *       400:
 *         description: Parámetro inválido o faltante.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/control-version:
 *   post:
 *     summary: Registrar un nuevo control de versión para un proceso
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKIdProceso:
 *                 type: integer
 *                 example: 1
 *               jsonDatos:
 *                 type: string
 *                 description: Cadena JSON con los datos del proceso de contratación.
 *                 example: |
 *                   {
 *                     "idProcesoContratacion": 1,
 *                     "folio": "F-1001",
 *                     "hermes": "",
 *                     "fechaRecibido": "2025-06-01",
 *                     "numDependencia": "11102",
 *                     "entidad": "Facultad de Ingeniería Civil",
 *                     "area": "Técnica",
 *                     "region": "Xalapa",
 *                     "tipoPersonal": 1,
 *                     "numPlaza": "P-001",
 *                     "categoria": "",
 *                     "titular": "",
 *                     "lineamiento": "",
 *                     "motivo": "",
 *                     "fechaPropuesta": "",
 *                     "fechaLiberacion": "",
 *                     "pInicio": "",
 *                     "pTermino": "",
 *                     "categoriaAutorizada": "",
 *                     "tipo": "Temporal",
 *                     "observacionesRegistro": "",
 *                     "analista": "",
 *                     "estado": "Notificado",
 *                     "tipoAsignacion": "asignacion",
 *                     "nCarpeta": "",
 *                     "candidato": "",
 *                     "experienciaLaboral": "",
 *                     "resultadoConocimiento": "",
 *                     "fechaEnvioEval": "",
 *                     "resultadoReferencias": "",
 *                     "resultadoOrtografia": "",
 *                     "resultadoWord": "",
 *                     "resultadoExcel": "",
 *                     "resultadoEvaluacion": "Recomendable",
 *                     "beneficiado": "no",
 *                     "fechaRevision": "",
 *                     "fechaEnvio": "",
 *                     "fechaNotificacion": "2025-10-23",
 *                     "tiempoProceso": "",
 *                     "observacionesAnalista": "",
 *                     "consecutivo": "",
 *                     "seguimientoDesempeno": "No",
 *                     "resultadoSeguimiento": "",
 *                     "estadoFinal": "",
 *                     "terminado": false,
 *                     "FKIdDependencia": 2,
 *                     "fechaEvaluacionDesempeno": "2026-01-23"
 *                   }
 *               nombreCompleto:
 *                 type: string
 *                 example: "Admin"
 *     responses:
 *       200:
 *         description: Control de versión registrado correctamente.
 *       400:
 *         description: Parámetro inválido o faltante.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500:
 *         description: Error interno del servidor.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/busqueda/control-version/{FKIdProceso}:
 *   get:
 *     summary: Obtener los registros de control de versiones por proceso
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdProceso
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Registros obtenidos correctamente.
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               estado: 200
 *               versiones:
 *                 - idControlVersion: 1
 *                   FKIdProceso: 1
 *                   jsonDatos:
 *                     idProcesoContratacion: 1
 *                     folio: "F-1001"
 *                     hermes: ""
 *                     fechaRecibido: "2025-06-01"
 *                     numDependencia: "11102"
 *                     entidad: "Facultad de Ingeniería Civil"
 *                     area: "Técnica"
 *                     region: "Xalapa"
 *                     tipoPersonal: 1
 *                     numPlaza: "P-001"
 *                     tipo: "Temporal"
 *                     estado: "Notificado"
 *                     resultadoEvaluacion: "Recomendable"
 *                     beneficiado: "no"
 *                     fechaNotificacion: "2025-10-23"
 *                     FKIdDependencia: 2
 *                     fechaEvaluacionDesempeno: "2026-01-23"
 *                   nombreCompleto: "Admin"
 *                   fechaRegistro: "2025-10-24T10:32:00.000Z"
 *                   descripcionCambio: "Actualización de datos de evaluación"
 *       400:
 *         description: Parámetro inválido o faltante.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/procesoContratacion/eliminacion/{idProceso}:
 *   delete:
 *     summary: Eliminar un proceso de contratación por ID
 *     tags: [ProcesoContratacion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProceso
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proceso eliminado correctamente.
 *       404:
 *         description: No se encontró el proceso.
 *       500:
 *         description: Error de base de datos.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       400:
 *         description: Parámetro inválido o faltante.
 */


import { Router } from "express";
import { ProcesoContratacionControlador } from "../controladores/ProcesoContratacionControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaProcesoContratacion = ({ModeloProcesoContratacion}) =>
{
    const ProcesoContratacionEnrutador = Router();
    const ControladorProcesoContratacionEnrutador = new ProcesoContratacionControlador({ModeloProcesoContratacion});
    ProcesoContratacionEnrutador.post('/',ValidarJwt,ControladorProcesoContratacionEnrutador.RegistrarProcesoContratacion);
    ProcesoContratacionEnrutador.get('/noBeneficiados',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerTodosNoBeneficiados);
    ProcesoContratacionEnrutador.get('/busqueda/procesos/',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosContratacion);
    ProcesoContratacionEnrutador.put('/:idProceso',ValidarJwt,ControladorProcesoContratacionEnrutador.EditarProcesoContratacionExistente);
    ProcesoContratacionEnrutador.post('/busqueda',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoContratacionPorIdProceso);
    ProcesoContratacionEnrutador.get('/busqueda/:FKIdAcceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesoPorFKIdAcceso);
    ProcesoContratacionEnrutador.get('/busqueda/estado/:FKIdEstadoProcesoContratacion',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerProcesosPorFKIdEstado);
    ProcesoContratacionEnrutador.get('/estadistica/:FKIdAcceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerDatosAnalistaParaEstadistica);
    ProcesoContratacionEnrutador.post('/control-version',ValidarJwt,ControladorProcesoContratacionEnrutador.RegistrarControlVersionNuevo);
    ProcesoContratacionEnrutador.get('/busqueda/control-version/:FKIdProceso',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerRegistrosControlVersionesPorFKIdProceso);
    ProcesoContratacionEnrutador.delete('/eliminacion/:idProceso',ValidarJwt,ControladorProcesoContratacionEnrutador.EliminarSolicitudPorIdProceso);
    ProcesoContratacionEnrutador.post('/oficio',ValidarJwt,ControladorProcesoContratacionEnrutador.RegistrarOficio);
    ProcesoContratacionEnrutador.get('/oficios/:FKIdProcesoContratacion',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerOficiosPorFKIdProceso);
    ProcesoContratacionEnrutador.post('/seguimiento-hermes',ValidarJwt,ControladorProcesoContratacionEnrutador.RegistrarActualizarSeguimientoHermes);
    ProcesoContratacionEnrutador.get('/obtencion-seguimiento-hermes',ValidarJwt,ControladorProcesoContratacionEnrutador.ObtenerSeguimientoHermesServicio)
    return ProcesoContratacionEnrutador;
}