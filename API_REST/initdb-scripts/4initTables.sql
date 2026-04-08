-- Table - Bitacora -------------------------------------------------------------------
CREATE TABLE [dbo].[Bitacora] (
    [idBitacora] [int] IDENTITY(1,1) NOT NULL,
    [fecha] [varchar](50) NOT NULL,
    [ip] [varchar](20) NOT NULL,
    [usuario] [varchar](20) NOT NULL,
    [tipoDeUsuario] [varchar](20) NOT NULL,
    [accion] [varchar](255) NOT NULL
)
GO

-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[Acceso](
	[idAcceso] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](64) NOT NULL,
	[contrasenia] [varchar](255) NOT NULL,
	[FKIdTipoAcceso] [int] NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[primerApellido] [varchar](255) NOT NULL,
	[segundoApellido] [varchar](255) NULL,
	[estado] [bit] NOT NULL,
    CONSTRAINT [PK_Acceso] PRIMARY KEY CLUSTERED ([idAcceso] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Acceso]  WITH CHECK ADD  CONSTRAINT [FK_Acceso_TipoAcceso] FOREIGN KEY([FKIdTipoAcceso]) REFERENCES [dbo].[TipoAcceso] ([idTipoAcceso])
GO
ALTER TABLE [dbo].[Acceso] CHECK CONSTRAINT [FK_Acceso_TipoAcceso]
GO

-- Table - AccesoProcesoContratacion --------------------------------------------------
CREATE TABLE [dbo].[AccesoProcesoContratacion](
	[dAccesoProcesoContratacion] [int] NULL
) ON [PRIMARY]
GO

-- Table - Cedula ---------------------------------------------------------------------
CREATE TABLE [dbo].[Cedula](
	[idCedula] [int] IDENTITY(1,1) NOT NULL,
	[FKIdTipoCedula] [int] NULL,
	[FKIdProceso] [int] NULL,
	[fechaCedulaInterna] [varchar](MAX) NULL,
	[fechaCedulaResultados][varchar](MAX) NULL,
	[edad] [varchar](MAX) NULL,
	[educacionFormal] [varchar](max) NULL,
	[referidoPor] [varchar](max) NULL,
	[antecedentesFamiliaresUV] [varchar](max) NULL,
	[expectativaLaboral] [varchar](max) NULL,
	[experienciaRelacionada] [varchar](max) NULL,
	[experiencia] [varchar](max) NULL,
	[conclusiones] [varchar](max) NULL,
	[resultado] [varchar](max) NULL,
	[efectoContratacion] [varchar](max) NULL,
	[competenciaReforzar] [varchar](max) NULL,
	[competenciaDesarrollar] [varchar](max) NULL,
	[FKIdClasificacionCedula] [int] NULL,
	[FKIdResultado] [int] NULL,
	[motivoCedulaInterna] [varchar](max) NULL,
	[motivoCedulaResultados] [varchar](max) NULL,
	[puesto] [varchar](max) NULL,
	[plaza] [varchar](max) NULL,
	[oficioAutorizacionDeOcupacion] [varchar](max) NULL,
	[evaluacionConocimientos] [varchar](max) NULL,
	[competenciasSobresaliente] [varchar](max) NULL,
	[descripcionDesarrollar] [varchar](max) NULL,
	[descripcionReforzar] [varchar](max) NULL,
	[estado] [bit] NULL,
	[aprobadoJefeOficina] [bit] NULL,
	[aprobadoDireccion] [bit] NULL,
	[archivoAdjunto] [bit] NULL,
    CONSTRAINT [PK_Cedula] PRIMARY KEY CLUSTERED ([idCedula] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cedula]  WITH CHECK ADD  CONSTRAINT [FK_Cedula_ClasificacionCedula] FOREIGN KEY([FKIdClasificacionCedula])
REFERENCES [dbo].[ClasificacionCedula] ([idClasificacionCedulas])
GO
ALTER TABLE [dbo].[Cedula] CHECK CONSTRAINT [FK_Cedula_ClasificacionCedula]
GO
ALTER TABLE [dbo].[Cedula]  WITH CHECK ADD  CONSTRAINT [FK_Cedula_ProcesoContratacion] FOREIGN KEY([FKIdProceso]) REFERENCES [dbo].[ProcesoContratacion] ([idProceso])
GO
ALTER TABLE [dbo].[Cedula] CHECK CONSTRAINT [FK_Cedula_ProcesoContratacion]
GO
ALTER TABLE [dbo].[Cedula]  WITH CHECK ADD  CONSTRAINT [FK_Cedula_TipoCedula] FOREIGN KEY([FKIdTipoCedula]) REFERENCES [dbo].[TipoCedula] ([idTipoCedula])
GO
ALTER TABLE [dbo].[Cedula] CHECK CONSTRAINT [FK_Cedula_TipoCedula]
GO

-- Table - ClasificacionCedula --------------------------------------------------------
CREATE TABLE [dbo].[ClasificacionCedula](
	[idClasificacionCedulas] [int] IDENTITY(1,1) NOT NULL,
	[numCedula] [int] NOT NULL,
	[nombre] [varchar](max) NOT NULL,
    CONSTRAINT [PK_ClasificacionCedula] PRIMARY KEY CLUSTERED ([idClasificacionCedulas] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Table - Competencia ----------------------------------------------------------------
CREATE TABLE [dbo].[Competencia](
	[idCompetencia] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](max) NOT NULL,
    CONSTRAINT [PK_Competencia] PRIMARY KEY CLUSTERED ([idCompetencia] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Table - ControlVersion -------------------------------------------------------------
CREATE TABLE [dbo].[ControlVersion](
	[idControlVersion] [int] IDENTITY(1,1) NOT NULL,
	[FKIdProceso] [int] NOT NULL,
	[nombreCompleto] [varchar](max) NOT NULL,
	[jsonDatos] [varchar](max) NOT NULL,
	[fechaModificacion] [datetime] NOT NULL,
    CONSTRAINT [PK_ControlVersion] PRIMARY KEY CLUSTERED ([idControlVersion] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ControlVersion]  WITH CHECK ADD  CONSTRAINT [FK_ControlVersion_ProcesoContratacion] FOREIGN KEY([FKIdProceso]) REFERENCES [dbo].[ProcesoContratacion] ([idProceso])
GO
ALTER TABLE [dbo].[ControlVersion] CHECK CONSTRAINT [FK_ControlVersion_ProcesoContratacion]
GO

-- Table - Dependencia ----------------------------------------------------------------
CREATE TABLE [dbo].[Dependencia](
	[idDependencia] [int] IDENTITY(1,1) NOT NULL,
	[numDependencia] [varchar](10) NOT NULL,
	[nombre] [varchar](max) NOT NULL,
	[area] [varchar](max) NOT NULL,
	[zona] [varchar](200) NOT NULL,
	[subzona] [varchar](200) NOT NULL,
	[areaOrganizacional] [varchar](max) NOT NULL,
    CONSTRAINT [PK_Dependencia] PRIMARY KEY CLUSTERED ([idDependencia] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Table - DetalleCedulaCompetencia ---------------------------------------------------
CREATE TABLE [dbo].[DetalleCedulaCompetencia](
	[idDetalleCedulaCompetencia] [int] IDENTITY(1,1) NOT NULL,
	[FKIdCedula] [int] NOT NULL,
	[FKIdCompetencia] [int] NOT NULL,
	[psicometria] [float] NOT NULL,
    CONSTRAINT [PK_DetalleCedulaCompetencia] PRIMARY KEY CLUSTERED ([idDetalleCedulaCompetencia] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetalleCedulaCompetencia]  WITH CHECK ADD  CONSTRAINT [FK_DetalleCedulaCompetencia_Cedula] FOREIGN KEY([FKIdCedula]) REFERENCES [dbo].[Cedula] ([idCedula])
GO
ALTER TABLE [dbo].[DetalleCedulaCompetencia] CHECK CONSTRAINT [FK_DetalleCedulaCompetencia_Cedula]
GO
ALTER TABLE [dbo].[DetalleCedulaCompetencia]  WITH CHECK ADD  CONSTRAINT [FK_DetalleCedulaCompetencia_Competencia] FOREIGN KEY([FKIdCompetencia]) REFERENCES [dbo].[Competencia] ([idCompetencia])
GO
ALTER TABLE [dbo].[DetalleCedulaCompetencia] CHECK CONSTRAINT [FK_DetalleCedulaCompetencia_Competencia]
GO

-- Table - DetalleClasificacionCedulaCompetencia --------------------------------------
CREATE TABLE [dbo].[DetalleClasificacionCedulaCompetencia](
	[FKIdClasificacionCedula] [int] NOT NULL,
	[FKIdCompetencia] [int] NOT NULL,
	[perfil] [int] NOT NULL,
	[IdDetalleClasificacionCedulaCompetencia] [int] IDENTITY(1,1) NOT NULL,
    CONSTRAINT [PK_DetalleClasificacionCedulaCompetencia] PRIMARY KEY CLUSTERED ([IdDetalleClasificacionCedulaCompetencia] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[DetalleClasificacionCedulaCompetencia]  WITH CHECK ADD  CONSTRAINT [FK_DetalleClasificacionCedulaCompetencia_ClasificacionCedula] FOREIGN KEY([FKIdClasificacionCedula])
REFERENCES [dbo].[ClasificacionCedula] ([idClasificacionCedulas])
GO
ALTER TABLE [dbo].[DetalleClasificacionCedulaCompetencia] CHECK CONSTRAINT [FK_DetalleClasificacionCedulaCompetencia_ClasificacionCedula]
GO
ALTER TABLE [dbo].[DetalleClasificacionCedulaCompetencia]  WITH CHECK ADD  CONSTRAINT [FK_DetalleClasificacionCedulaCompetencia_Competencia] FOREIGN KEY([FKIdCompetencia])
REFERENCES [dbo].[Competencia] ([idCompetencia])
GO
ALTER TABLE [dbo].[DetalleClasificacionCedulaCompetencia] CHECK CONSTRAINT [FK_DetalleClasificacionCedulaCompetencia_Competencia]
GO

-- Table - Documento ------------------------------------------------------------------
CREATE TABLE [dbo].[Documento](
	[idDocumento] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](max) NOT NULL,
	[archivo] [varchar](max) NOT NULL,
	[fechaSubida] [varchar](max) NOT NULL,
	[FKIdCedula] [int] NULL,
    CONSTRAINT [PK_Documento] PRIMARY KEY CLUSTERED ([idDocumento] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Documento]  WITH CHECK ADD  CONSTRAINT [FK_Documento_Cedula] FOREIGN KEY([FKIdCedula])
REFERENCES [dbo].[Cedula] ([idCedula])
GO
ALTER TABLE [dbo].[Documento] CHECK CONSTRAINT [FK_Documento_Cedula]
GO

-- Table - EstadoProcesoContratacion --------------------------------------------------
CREATE TABLE [dbo].[EstadoProcesoContratacion](
	[idEstadoProcesoContratacion] [int] IDENTITY(1,1) NOT NULL,
	[estado] [varchar](20) NOT NULL,
    CONSTRAINT [PK_EstadoProcesoContratacion] PRIMARY KEY CLUSTERED ([idEstadoProcesoContratacion] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - ProcesoContratacion --------------------------------------------------------
CREATE TABLE [dbo].[ProcesoContratacion](
    [idProceso] [int] IDENTITY(1,1) NOT NULL,
    [folio] [varchar](max) NULL,
    [numPlaza] [varchar](max) NULL,
    [fechaRecibido] [varchar](max) NULL,
    [fechaEntrevista] [varchar](max) NULL,
    [resultadoEvaluacionConocimiento] [varchar](max) NULL,
    [fechaEnvioDEyDP] [varchar](max) NULL,
    [fechaNotificacion] [varchar](max) NULL,
    [categoriaPuestoOrigen] [varchar](max) NULL,
    [diasProceso] [varchar](max) NULL,
    [beneficiado] [bit] NULL,
    [FKIdTipoProceso] [int] NULL,
    [FKIdTipoPersonal] [int] NULL,
    [FKIdEstadoProcesoContratacion] [int] NULL,
    [FKIdTemporalDefinitiva] [int] NULL,
    [FKIdDependencia] [int] NULL,
    [hermesNotificacion] [varchar](max) NULL,
    [titularPlaza] [varchar](max) NULL,
    [lineamientoOficioContinuidad] [varchar](max) NULL,
    [motivo] [varchar](max) NULL,
    [fechaElaboracionPropuesta] [varchar](max) NULL,
    [fechaLiberacionOficio] [varchar](max) NULL,
    [periodoAutorizadoOficioInicio] [varchar](max) NULL, -- Corregido aquí
    [periodoAutorizadoOficioFin] [varchar](max) NULL,
    [categoriaAutorizadaOficio] [varchar](max) NULL,
    [observaciones] [varchar](max) NULL,
    [numCarpeta] [varchar](max) NULL,
    [nombreCandidato] [varchar](max) NULL,
    [funcionDesempeniar] [varchar](max) NULL,
    [familiaFuncional] [varchar](max) NULL,
    [fechaEvaluacionCompetencias] [varchar](max) NULL,
    [fechaInicioProcesamiento] [varchar](max) NULL,
    [resultadoEvaluacionCompetencias] [varchar](max) NULL,
    [experienciaLaboralSolicitada] [varchar](max) NULL,
    [resultadoReferenciasLaborales] [varchar](max) NULL,
    [fechaEnvioEvaluacionDesempenio] [varchar](max) NULL,
    [fechaEntregaEvaluacionDesempenio] [varchar](max) NULL,
    [resultadoEvaluacionDesempenio] [varchar](max) NULL,
    [resultadoHabilidadesWord] [varchar](max) NULL,
    [resultadoHabilidadesExcel] [varchar](max) NULL,
    [resultadoOrtografia] [varchar](max) NULL,
    [resultadoProcesoEvaluacion] [varchar](max) NULL,
    [fechaRevisionOfiEval] [varchar](max) NULL,
    [observacionesAnalista] [varchar](max) NULL,
    [consecutivoExpediente] [varchar](max) NULL,
    [seguimientoEvaluacionDesempenio] [bit] NULL,
    [fechaEvaluacionDesempenio] [varchar](max) NULL,
    [resultadoSeguimientoEvaluacionDesempenio] [varchar](max) NULL,
    [FKIdAcceso] [int] NULL,
    [autorizacion] [bit] NULL,
    [educacionFormal] [varchar](max) NULL,
    [avaladoPor] [varchar](max) NULL,
    [fechaAsignacionAnalista] [varchar](max) NULL,
    [capacitado] [bit] NULL,
    CONSTRAINT [PK_ProcesoContratacion] PRIMARY KEY CLUSTERED ([idProceso] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_Acceso] FOREIGN KEY([FKIdAcceso]) REFERENCES [dbo].[Acceso] ([idAcceso])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_Acceso]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_Dependencia] FOREIGN KEY([FKIdDependencia]) REFERENCES [dbo].[Dependencia] ([idDependencia])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_Dependencia]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_EstadoProcesoContratacion] FOREIGN KEY([FKIdEstadoProcesoContratacion]) REFERENCES [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_EstadoProcesoContratacion]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_TemporalDefinitiva] FOREIGN KEY([FKIdTemporalDefinitiva]) REFERENCES [dbo].[TemporalDefinitiva] ([idTemporalDefinitiva])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_TemporalDefinitiva]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_TipoPersonal] FOREIGN KEY([FKIdTipoPersonal]) REFERENCES [dbo].[TipoPersonal] ([idTipoPersonal])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_TipoPersonal]
GO
ALTER TABLE [dbo].[ProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_ProcesoContratacion_TipoProceso] FOREIGN KEY([FKIdTipoProceso]) REFERENCES [dbo].[TipoProceso] ([idTipoProceso])
GO
ALTER TABLE [dbo].[ProcesoContratacion] CHECK CONSTRAINT [FK_ProcesoContratacion_TipoProceso]
GO

-- Table - RelacionAccesoProcesoContratacion ------------------------------------------
CREATE TABLE [dbo].[RelacionAccesoProcesoContratacion](
	[IdRelacionAccesoProcesoContratacion] [int] NOT NULL,
	[FKIdProceso] [int] NOT NULL,
	[FKIdAcceso] [int] NOT NULL,
	[asignado] [bit] NOT NULL,
    CONSTRAINT [PK_RelacionAccesoProcesoContratacion] PRIMARY KEY CLUSTERED ([IdRelacionAccesoProcesoContratacion] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[RelacionAccesoProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_RelacionAccesoProcesoContratacion_Acceso] FOREIGN KEY([FKIdAcceso]) REFERENCES [dbo].[Acceso] ([idAcceso])
GO
ALTER TABLE [dbo].[RelacionAccesoProcesoContratacion] CHECK CONSTRAINT [FK_RelacionAccesoProcesoContratacion_Acceso]
GO
ALTER TABLE [dbo].[RelacionAccesoProcesoContratacion]  WITH CHECK ADD  CONSTRAINT [FK_RelacionAccesoProcesoContratacion_ProcesoContratacion] FOREIGN KEY([FKIdProceso]) REFERENCES [dbo].[ProcesoContratacion] ([idProceso])
GO
ALTER TABLE [dbo].[RelacionAccesoProcesoContratacion] CHECK CONSTRAINT [FK_RelacionAccesoProcesoContratacion_ProcesoContratacion]
GO

-- Table - Resultado ------------------------------------------------------------------
CREATE TABLE [dbo].[Resultado](
	[idResultado] [int] IDENTITY(1,1) NOT NULL,
	[FKIdCedula] [int] NOT NULL,
	[psicometriaComunicacion] [varchar](max)NULL,
	[psicometriaTrabajoEnEquipo] [varchar](max) NULL,
	[psicometriaOrientacionAlServicio] [varchar](max) NULL,
	[psicometriaSensibilidadALineamientos][varchar](max) NULL,
	[psicometriaPlaneacionOrganizacion] [varchar](max) NULL,
	[psicometriaAnalisisProblemas] [varchar](max) NULL,
	[psicometriaEnfoqueResultados][varchar](max)NULL,
	[psicometriaControlActividades] [varchar](max) NULL,
	[psicometriaEnfoqueCalidad] [varchar](max) NULL,
	[psicometriaRelacionesInterpersonales] [varchar](max) NULL,
	[psicometriaLiderazgo] [varchar](max) NULL,
	[psicometriaTomaDecisiones] [varchar](max) NULL,
	[psicometriaDinamismo] [varchar](max) NULL,
	[psicometriaInnovacion] [varchar](max) NULL,
	[psicometriaPensamientoEstrategico] [varchar](max) NULL,
	[psicometriaNegociacion] [varchar](max) NULL,
	[resultadoPorcentaje] [varchar](max) NULL,
    CONSTRAINT [PK_Resultado] PRIMARY KEY CLUSTERED ([idResultado] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Resultado]  WITH CHECK ADD  CONSTRAINT [FK_Resultado_Cedula] FOREIGN KEY([FKIdCedula]) REFERENCES [dbo].[Cedula] ([idCedula])
GO
ALTER TABLE [dbo].[Resultado] CHECK CONSTRAINT [FK_Resultado_Cedula]
GO

-- Table - SeguimientoHermes ----------------------------------------------------------
CREATE TABLE [dbo].[SeguimientoHermes](
	[idSeguimiento] [int] IDENTITY(1,1) NOT NULL,
	[folio] [varchar](max) NULL,
	[fechaRecepcion] [varchar](max) NULL,
	[importancia] [varchar](max) NULL,
	[tipoEnvio] [varchar](max) NULL,
	[requiereRespuesta] [bit] NULL,
	[solicita] [varchar](max) NULL,
	[entidadDependencia] [varchar](max) NULL,
	[asunto] [varchar](max) NULL,
	[estatus] [varchar](max) NULL,
	[acciones] [varchar](max) NULL,
	[estadoArchivado] [bit] NULL,
    CONSTRAINT [PK_SeguimientoHermes] PRIMARY KEY CLUSTERED ([idSeguimiento] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[TemporalDefinitiva](
	[idTemporalDefinitiva] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](15) NOT NULL,
    CONSTRAINT [PK_TemporalDefinitiva] PRIMARY KEY CLUSTERED ([idTemporalDefinitiva] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[TipoAcceso](
	[idTipoAcceso] [int] IDENTITY(1,1) NOT NULL,
	[tipo] [varchar](50) NOT NULL,
    CONSTRAINT [PK_TipoAcceso] PRIMARY KEY CLUSTERED ([idTipoAcceso] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[TipoCedula](
	[idTipoCedula] [int] IDENTITY(1,1) NOT NULL,
	[cedula] [varchar](50) NOT NULL,
    CONSTRAINT [PK_TipoCedula] PRIMARY KEY CLUSTERED ([idTipoCedula] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[TipoPersonal](
	[idTipoPersonal] [int] IDENTITY(1,1) NOT NULL,
	[personal] [varchar](10) NOT NULL,
    CONSTRAINT [PK_TipoPersonal] PRIMARY KEY CLUSTERED ([idTipoPersonal] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[TipoProceso](
	[idTipoProceso] [int] IDENTITY(1,1) NOT NULL,
	[proceso] [varchar](20) NOT NULL,
    CONSTRAINT [PK_TipoProceso] PRIMARY KEY CLUSTERED ([idTipoProceso] ASC) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

-- Table - Acceso ---------------------------------------------------------------------
-- Table - Acceso ---------------------------------------------------------------------
CREATE TABLE [dbo].[Oficio] (
    [idOficio]                  INT NOT NULL,
    [FKIdProcesoContratacion]   INT NOT NULL,
    [folio]                     VARCHAR(MAX),
    [fecha]                     VARCHAR(MAX),
    [dirigido]                  VARCHAR(MAX),
    [puestoDirigido]            VARCHAR(MAX),
    [machote]                   VARCHAR(MAX),
    [piePagina]                 VARCHAR(MAX),
    [tipo]                      VARCHAR(MAX),
    [fechaRegistro]             DATETIME DEFAULT GETDATE(),

    CONSTRAINT [PK_Oficio] PRIMARY KEY CLUSTERED ([idOficio] ASC),
    CONSTRAINT [FK_Oficio_ProcesoContratacion]
        FOREIGN KEY ([FKIdProcesoContratacion])
        REFERENCES [dbo].[ProcesoContratacion]([idProceso])  
) ON [PRIMARY];
GO
