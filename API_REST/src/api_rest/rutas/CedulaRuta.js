/**
 * @swagger
 * tags:
 *   name: Cédula
 *   description: Endpoints para la gestión de cédulas y resultados.
 */

/**
 * @swagger
 * /rysuv/cedula:
 *   post:
 *     summary: Inserta una nueva cédula.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               FKIdTipoCedula: 1
 *               FKIdProceso: 2
 *               fechaCedulaInterna: "2025-09-05"
 *               fechaCedulaResultados: "2025-09-10"
 *               edad: "28"
 *               educacionFormal: "Licenciatura en Administración"
 *               referidoPor: "Reclutamiento interno"
 *               antecedentesFamiliaresUV: "Ninguno"
 *               expectativaLaboral: "Crecimiento profesional"
 *               experienciaRelacionada: "2 años en gestión de proyectos"
 *               experiencia: "3 años en administración"
 *               conclusiones: "Perfil adecuado para el puesto"
 *               resultado: "Aprobado"
 *               efectoContratacion: "Contratación inmediata"
 *               competenciaReforzar: "Comunicación escrita"
 *               competenciaDesarrollar: "Liderazgo"
 *               FKIdClasificacionCedula: 5
 *               FKIdResultado: 2
 *               motivoCedulaInterna: "Evaluación interna de desempeño"
 *               motivoCedulaResultados: "Revisión de competencias"
 *               puesto: "Analista Administrativo"
 *               plaza: "16278"
 *               oficioAutorizacionDeOcupacion: "Ninguno"
 *               evaluacionConocimientos: "10"
 *               competenciasSobresaliente: "9"
 *               descripcionDesarrollar: "Talento humano"
 *               descripcionReforzar: "Habilidade de comunicacion"
 *               aprobadoJefeOficina: true
 *               aprobadoDireccion: true
 *               archivoAdjunto: true         
 *     responses:
 *       200:
 *         description: Operación correcta.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/cedula/obtencionCedulas:
 *   get:
 *     summary: Obtiene todas las cédulas registradas.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             example:
 *               error: false
 *               estado: 200
 *               cedulas:
 *                 - idCedula: 10
 *                   FKIdTipoCedula: 1
 *                   FKIdProceso: 2
 *                   fechaCedulaInterna: "2025-09-05"
 *                   fechaCedulaResultados: "2025-09-10"
 *                   edad: "28"
 *                   educacionFormal: "Licenciatura en Administración"
 *                   referidoPor: "Reclutamiento interno"
 *                   antecedentesFamiliaresUV: "Ninguno"
 *                   expectativaLaboral: "Crecimiento profesional"
 *                   experienciaRelacionada: "2 años en gestión de proyectos"
 *                   experiencia: "3 años en administración"
 *                   conclusiones: "Perfil adecuado para el puesto"
 *                   resultado: "Aprobado"
 *                   efectoContratacion: "Contratación inmediata"
 *                   competenciaReforzar: "Comunicación escrita"
 *                   competenciaDesarrollar: "Liderazgo"
 *                   FKIdClasificacionCedula: 5
 *                   FKIdResultado: 2
 *                   motivoCedulaInterna: "Evaluación interna de desempeño"
 *                   motivoCedulaResultados: "Revisión de competencias"
 *                   puesto: "Analista Administrativo"
 *                   plaza: "16278"
 *                   oficioAutorizacionDeOcupacion: "Ninguno"
 *                   evaluacionConocimientos: "10"
 *                   competenciasSobresaliente: "9"
 *                   descripcionDesarrollar: "Talento humano"
 *                   descripcionReforzar: "Habilidade de comunicacion"
 *                   aprobadoJefeOficina: true
 *                   aprobadoDireccion: true
 *                   archivoAdjunto: true
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/{idCedula}:
 *   put:
 *     summary: Edita una cédula existente.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idCedula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cédula a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               FKIdTipoCedula: 1
 *               FKIdProceso: 1
 *               fechaCedulaInterna: "2026-09-05"
 *               fechaCedulaResultados: "2025-09-10"
 *               edad: "28"
 *               educacionFormal: "Licenciatura en Administración"
 *               referidoPor: "Reclutamiento interno"
 *               antecedentesFamiliaresUV: "Ninguno"
 *               expectativaLaboral: "Crecimiento profesional"
 *               experienciaRelacionada: "2 años en gestión de proyectos"
 *               experiencia: "3 años en administración"
 *               conclusiones: "Perfil adecuado para el puesto"
 *               resultado: "Aprobado"
 *               efectoContratacion: "Contratación inmediata"
 *               competenciaReforzar: "Comunicación escrita"
 *               competenciaDesarrollar: "Liderazgo"
 *               FKIdClasificacionCedula: 5
 *               FKIdResultado: 2
 *               motivoCedulaInterna: "Evaluación interna de desempeño"
 *               motivoCedulaResultados: "Revisión de competencias"
 *               puesto: "Analista Administrativo"
 *               estado: false
 *     responses:
 *       200:
 *         description: Operación correcta.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/busqueda/{FKIdProceso}:
 *   get:
 *     summary: Obtener una cédula por ID de proceso.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdProceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proceso relacionado.
 *     responses:
 *       200:
 *         description: Cédula obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idCedula:
 *                   type: integer
 *                 FKIdProceso:
 *                   type: integer
 *                 folio:
 *                   type: string
 *                 numPlaza:
 *                   type: string
 *                 fechaRecibido:
 *                   type: string
 *                   format: date
 *                 fechaEntrevista:
 *                   type: string
 *                   format: date
 *                 resultadoEvaluacionConocimiento:
 *                   type: string
 *                 fechaEnvioDEyDP:
 *                   type: string
 *                   format: date
 *                 fechaNotificacion:
 *                   type: string
 *                   format: date
 *                 categoriaPuestoOrigen:
 *                   type: string
 *                 categoriaPuestoSolicitado:
 *                   type: string
 *                 motivoVacante:
 *                   type: string
 *                 nombreServidorPublico:
 *                   type: string
 *                 observaciones:
 *                   type: string
 *             example:
 *               idCedula: 12
 *               FKIdProceso: 5
 *               folio: "12345"
 *               numPlaza: "1321"
 *               fechaRecibido: "2025-09-04"
 *               fechaEntrevista: "2025-09-10"
 *               resultadoEvaluacionConocimiento: "10"
 *               fechaEnvioDEyDP: "2025-09-12"
 *               fechaNotificacion: "2025-09-15"
 *               categoriaPuestoOrigen: "Auxiliar Administrativo"
 *               categoriaPuestoSolicitado: "Jefe de Departamento"
 *               motivoVacante: "Jubilación"
 *               nombreServidorPublico: "Juan Pérez García"
 *               observaciones: "Todo en orden"
 *
 *       400:
 *         description: Parámetro inválido o faltante.
 *       401:
 *         description: Token JWT no válido o ausente.
 *       404:
 *         description: No se encontró la cédula relacionada al proceso.
 *       500:
 *         description: Error interno del servidor o de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/competencia/{FKIdClasificacionCedula}:
 *   get:
 *     summary: Obtiene las cédulas por clasificación de competencia.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdClasificacionCedula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clasificación de cédula.
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                 estado:
 *                   type: integer
 *                 competencias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idClasificacionCedulas:
 *                         type: integer
 *                       numCedula:
 *                         type: integer
 *                       nombreClasificacion:
 *                         type: string
 *                       idCompetencia:
 *                         type: integer
 *                       nombreCompetencia:
 *                         type: string
 *                       perfil:
 *                         type: integer
 *             example:
 *               error: false
 *               estado: 200
 *               competencias:
 *                 - idClasificacionCedulas: 6
 *                   numCedula: 8
 *                   nombreClasificacion: "Asistente Deporte"
 *                   idCompetencia: 1
 *                   nombreCompetencia: "Comunicación"
 *                   perfil: 3
 *                 - idClasificacionCedulas: 6
 *                   numCedula: 8
 *                   nombreClasificacion: "Asistente Deporte"
 *                   idCompetencia: 3
 *                   nombreCompetencia: "Orientación al servicio"
 *                   perfil: 3
 *                 - idClasificacionCedulas: 6
 *                   numCedula: 8
 *                   nombreClasificacion: "Asistente Deporte"
 *                   idCompetencia: 4
 *                   nombreCompetencia: "Sensibilidad a lineamientos"
 *                   perfil: 3
 *                 - idClasificacionCedulas: 6
 *                   numCedula: 8
 *                   nombreClasificacion: "Asistente Deporte"
 *                   idCompetencia: 7
 *                   nombreCompetencia: "Enfoque a resultados"
 *                   perfil: 3
 *                 - idClasificacionCedulas: 6
 *                   numCedula: 8
 *                   nombreClasificacion: "Asistente Deporte"
 *                   idCompetencia: 8
 *                   nombreCompetencia: "Control de actividades"
 *                   perfil: 3
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/competencia-resultados/{IdProceso}:
 *   get:
 *     summary: Obtiene los resultados psicométricos por ID de proceso.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: IdProceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proceso.
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 FKIdCedula:
 *                   type: integer
 *                 psicometriaComunicacion:
 *                   type: number
 *                 psicometriaTrabajoEnEquipo:
 *                   type: number
 *                 psicometriaOrientacionAlServicio:
 *                   type: number
 *                 psicometriaSensibilidadALineamientos:
 *                   type: number
 *                 psicometriaPlaneacionOrganizacion:
 *                   type: number
 *                 psicometriaAnalisisProblemas:
 *                   type: number
 *                 psicometriaEnfoqueResultados:
 *                   type: number
 *                 psicometriaControlActividades:
 *                   type: number
 *                 psicometriaEnfoqueCalidad:
 *                   type: number
 *                 psicometriaRelacionesInterpersonales:
 *                   type: number
 *                 psicometriaLiderazgo:
 *                   type: number
 *                 psicometriaTomaDecisiones:
 *                   type: number
 *                 psicometriaDinamismo:
 *                   type: number
 *                 psicometriaInnovacion:
 *                   type: number
 *                 psicometriaPensamientoEstrategico:
 *                   type: number
 *                 psicometriaNegociacion:
 *                   type: number
 *             example:
 *               FKIdCedula: 1
 *               psicometriaComunicacion: 85.5
 *               psicometriaTrabajoEnEquipo: 90.0
 *               psicometriaOrientacionAlServicio: 78.2
 *               psicometriaSensibilidadALineamientos: 88.0
 *               psicometriaPlaneacionOrganizacion: 92.3
 *               psicometriaAnalisisProblemas: 80.0
 *               psicometriaEnfoqueResultados: 86.4
 *               psicometriaControlActividades: 79.5
 *               psicometriaEnfoqueCalidad: 91.0
 *               psicometriaRelacionesInterpersonales: 84.7
 *               psicometriaLiderazgo: 87.2
 *               psicometriaTomaDecisiones: 89.0
 *               psicometriaDinamismo: 82.1
 *               psicometriaInnovacion: 77.8
 *               psicometriaPensamientoEstrategico: 90.5
 *               psicometriaNegociacion: 88.6
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/resultado:
 *   post:
 *     summary: Registra un nuevo resultado psicométrico asociado a una cédula.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FKIdCedula:
 *                 type: integer
 *               psicometriaComunicacion:
 *                 type: number
 *               psicometriaTrabajoEnEquipo:
 *                 type: number
 *               psicometriaOrientacionAlServicio:
 *                 type: number
 *               psicometriaSensibilidadALineamientos:
 *                 type: number
 *               psicometriaPlaneacionOrganizacion:
 *                 type: number
 *               psicometriaAnalisisProblemas:
 *                 type: number
 *               psicometriaEnfoqueResultados:
 *                 type: number
 *               psicometriaControlActividades:
 *                 type: number
 *               psicometriaEnfoqueCalidad:
 *                 type: number
 *               psicometriaRelacionesInterpersonales:
 *                 type: number
 *               psicometriaLiderazgo:
 *                 type: number
 *               psicometriaTomaDecisiones:
 *                 type: number
 *               psicometriaDinamismo:
 *                 type: number
 *               psicometriaInnovacion:
 *                 type: number
 *               psicometriaPensamientoEstrategico:
 *                 type: number
 *               psicometriaNegociacion:
 *                 type: number
 *           example:
 *             FKIdCedula: 1
 *             psicometriaComunicacion: 85.5
 *             psicometriaTrabajoEnEquipo: 90.0
 *             psicometriaOrientacionAlServicio: 78.2
 *             psicometriaSensibilidadALineamientos: 88.0
 *             psicometriaPlaneacionOrganizacion: 92.3
 *             psicometriaAnalisisProblemas: 80.0
 *             psicometriaEnfoqueResultados: 86.4
 *             psicometriaControlActividades: 79.5
 *             psicometriaEnfoqueCalidad: 91.0
 *             psicometriaRelacionesInterpersonales: 84.7
 *             psicometriaLiderazgo: 87.2
 *             psicometriaTomaDecisiones: 89.0
 *             psicometriaDinamismo: 82.1
 *             psicometriaInnovacion: 77.8
 *             psicometriaPensamientoEstrategico: 90.5
 *             psicometriaNegociacion: 88.6
 *     responses:
 *       200:
 *         description: Operación correcta.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/resultado/{idResultado}:
 *   put:
 *     summary: Edita un resultado psicométrico existente.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idResultado
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del resultado a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               psicometriaComunicacion:
 *                 type: number
 *               psicometriaTrabajoEnEquipo:
 *                 type: number
 *               psicometriaOrientacionAlServicio:
 *                 type: number
 *               psicometriaSensibilidadALineamientos:
 *                 type: number
 *               psicometriaPlaneacionOrganizacion:
 *                 type: number
 *               psicometriaAnalisisProblemas:
 *                 type: number
 *               psicometriaEnfoqueResultados:
 *                 type: number
 *               psicometriaControlActividades:
 *                 type: number
 *               psicometriaEnfoqueCalidad:
 *                 type: number
 *               psicometriaRelacionesInterpersonales:
 *                 type: number
 *               psicometriaLiderazgo:
 *                 type: number
 *               psicometriaTomaDecisiones:
 *                 type: number
 *               psicometriaDinamismo:
 *                 type: number
 *               psicometriaInnovacion:
 *                 type: number
 *               psicometriaPensamientoEstrategico:
 *                 type: number
 *               psicometriaNegociacion:
 *                 type: number
 *           example:
 *             psicometriaComunicacion: 80.0
 *             psicometriaTrabajoEnEquipo: 88.5
 *             psicometriaOrientacionAlServicio: 75.0
 *             psicometriaSensibilidadALineamientos: 82.0
 *             psicometriaPlaneacionOrganizacion: 90.0
 *             psicometriaAnalisisProblemas: 78.0
 *             psicometriaEnfoqueResultados: 84.0
 *             psicometriaControlActividades: 70.5
 *             psicometriaEnfoqueCalidad: 89.0
 *             psicometriaRelacionesInterpersonales: 80.0
 *             psicometriaLiderazgo: 85.0
 *             psicometriaTomaDecisiones: 88.0
 *             psicometriaDinamismo: 79.0
 *             psicometriaInnovacion: 76.0
 *             psicometriaPensamientoEstrategico: 87.5
 *             psicometriaNegociacion: 82.0
 *     responses:
 *       200:
 *         description: Operación correcta.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/resultado/busqueda/{FKIdCedula}:
 *   get:
 *     summary: Obtiene los resultados asociados a una cédula.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: FKIdCedula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cédula.
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             example:
 *               FKIdCedula: 1
 *               psicometriaComunicacion: 85.5
 *               psicometriaTrabajoEnEquipo: 90.0
 *               psicometriaOrientacionAlServicio: 78.2
 *               psicometriaSensibilidadALineamientos: 88.0
 *               psicometriaPlaneacionOrganizacion: 92.3
 *               psicometriaAnalisisProblemas: 80.0
 *               psicometriaEnfoqueResultados: 86.4
 *               psicometriaControlActividades: 79.5
 *               psicometriaEnfoqueCalidad: 91.0
 *               psicometriaRelacionesInterpersonales: 84.7
 *               psicometriaLiderazgo: 87.2
 *               psicometriaTomaDecisiones: 89.0
 *               psicometriaDinamismo: 82.1
 *               psicometriaInnovacion: 77.8
 *               psicometriaPensamientoEstrategico: 90.5
 *               psicometriaNegociacion: 88.6
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/cedula/activas:
 *   get:
 *     summary: Obtiene todas las cédulas activas del servicio.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             example:
 *               FKIdTipoCedula: 1
 *               FKIdProceso: 12
 *               fechaCedulaInterna: "2025-09-05"
 *               fechaCedulaResultados: "2025-09-10"
 *               edad: "28"
 *               educacionFormal: "Licenciatura en Administración"
 *               referidoPor: "Reclutamiento interno"
 *               antecedentesFamiliaresUV: "Ninguno"
 *               expectativaLaboral: "Crecimiento profesional"
 *               experienciaRelacionada: "2 años en gestión de proyectos"
 *               experiencia: "3 años en administración"
 *               conclusiones: "Perfil adecuado para el puesto"
 *               resultado: "Aprobado"
 *               efectoContratacion: "Contratación inmediata"
 *               competenciaReforzar: "Comunicación escrita"
 *               competenciaDesarrollar: "Liderazgo"
 *               FKIdClasificacionCedula: 5
 *               FKIdResultado: 2
 *               motivoCedulaInterna: "Evaluación interna de desempeño"
 *               motivoCedulaResultados: "Revisión de competencias"
 *               puesto: "Analista Administrativo"
 *               plaza: "12345"
 *               oficioAutorizacionDeOcupacion: "Ninguno"
 *               evaluacionConocimientos: "10"
 *               competenciasSobresaliente: "Si"
 *               descripcionDesarrollar: "Trabajo en equipo"
 *               descripcionReforzar: "Comunicación"
 *               aprobadoJefeOficina: true
 *               aprobadoDireccion: true
 *               archivoAdjunto: true
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */


/**
 * @swagger
 * /rysuv/cedula/externa:
 *   post:
 *     summary: Inserta una nueva cédula externa.
 *     tags: [Cédula]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               FKIdCedula: 24
 *               nombre: "cedula.pdf"
 *               archivo: "JVBERi0xLjcKJYGBgYEKCjIzMiAwIG9i"
 *     responses:
 *       200:
 *         description: Operación correcta.
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */



/**
 * @swagger
 * /rysuv/cedula/externa/{FKIdCedula}:
 *   get:
 *     summary: Obtiene una cédula externa por ID de cédula.
 *     tags: [Cédula]
 *     parameters:
 *       - in: path
 *         name: FKIdCedula
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cédula externa.
 *     responses:
 *       200:
 *         description: Operación correcta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 FKIdCedula: 24
 *                 nombre: "cedula"
 *                 archivo: "JVBERi0xLjcKJYGBgYEKCjIzMiAwIG9iago8PAovRmlsdGVyIC9GbGF0ZURlY29kZQovTGVuZ3RoIDEyNTgxCi9MZW5ndGgxIDIxMDk2Cj4+..."
 *       400:
 *         description: Datos con formato inválido.
 *       401:
 *         description: Token inválido o ausente.
 *       500:
 *         description: Error de base de datos.
 */



import { Router } from "express";
import { CedulaControlador } from "../controladores/CedulaControlador.js";
import { BitacoraLogger } from "../middlewares/bitacora.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaCedula = ({ModeloCedula}) =>
{
    const CedulaEnrutador = Router();
    const ControladorCedulaEnrutador = new CedulaControlador({ModeloCedula});
    CedulaEnrutador.post('/',ValidarJwt,BitacoraLogger,ControladorCedulaEnrutador.InsertarNuevaCedula);
    CedulaEnrutador.get('/obtencionCedulas',ValidarJwt,ControladorCedulaEnrutador.ObtenerTodasLasCedulas);    
    CedulaEnrutador.put('/:idCedula',ValidarJwt,BitacoraLogger,ControladorCedulaEnrutador.EditarCedulaExistente);
    CedulaEnrutador.get('/busqueda/:FKIdProceso',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaPorFKIdProceso);    
    CedulaEnrutador.get('/competencia/:FKIdClasificacionCedula',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaPorFKIdClasificacionCedula);
    CedulaEnrutador.get('/competencia-resultados/:IdProceso',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaPorIdCedulaResultados);
    CedulaEnrutador.post('/resultado',ValidarJwt,BitacoraLogger,ControladorCedulaEnrutador.RegistrarNuevoResultado);
    CedulaEnrutador.put('/resultado/:idResultado',ValidarJwt,BitacoraLogger,ControladorCedulaEnrutador.EditarResultados);
    CedulaEnrutador.get('/resultado/busqueda/:FKIdCedula',ValidarJwt,ControladorCedulaEnrutador.ObtenerResultadosPorCedula);
    CedulaEnrutador.get('/activas',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulasActivasServicio);
    CedulaEnrutador.post('/externa',ValidarJwt,BitacoraLogger,ControladorCedulaEnrutador.InsertarNuevaCedulaExterna);
    CedulaEnrutador.get('/externa/:FKIdCedula',ValidarJwt,ControladorCedulaEnrutador.ObtenerCedulaExternaPorIdCedula);
    return CedulaEnrutador;
}
