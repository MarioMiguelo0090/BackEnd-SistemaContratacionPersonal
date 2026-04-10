USE [SistemaServicioSocial]
GO

SET IDENTITY_INSERT [dbo].[EstadoProcesoContratacion] ON 
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (1, N'Citado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (2, N'Evaluado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (3, N'En procesamiento')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (4, N'En revisión')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (5, N'En firma')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (6, N'Notificado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (7, N'Cancelado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (8, N'Terminado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (9, N'Solicitud pendiente')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (10, N'Solicitud entregado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (11, N'Solicitud notificado')
INSERT [dbo].[EstadoProcesoContratacion] ([idEstadoProcesoContratacion], [estado]) VALUES (12, N'Evaluacion')
SET IDENTITY_INSERT [dbo].[EstadoProcesoContratacion] OFF
GO

SET IDENTITY_INSERT [dbo].[TemporalDefinitiva] ON 
INSERT [dbo].[TemporalDefinitiva] ([idTemporalDefinitiva], [descripcion]) VALUES (1, N'Temporal')
INSERT [dbo].[TemporalDefinitiva] ([idTemporalDefinitiva], [descripcion]) VALUES (2, N'Definitiva')
SET IDENTITY_INSERT [dbo].[TemporalDefinitiva] OFF
GO

SET IDENTITY_INSERT [dbo].[TipoAcceso] ON 
INSERT [dbo].[TipoAcceso] ([idTipoAcceso], [tipo]) VALUES (1, N'Administrador')
INSERT [dbo].[TipoAcceso] ([idTipoAcceso], [tipo]) VALUES (2, N'Analista')
INSERT [dbo].[TipoAcceso] ([idTipoAcceso], [tipo]) VALUES (3, N'Gestor de solicitudes')
INSERT [dbo].[TipoAcceso] ([idTipoAcceso], [tipo]) VALUES (4, N'Jefe de departamento')
SET IDENTITY_INSERT [dbo].[TipoAcceso] OFF
GO

SET IDENTITY_INSERT [dbo].[TipoCedula] ON 
INSERT [dbo].[TipoCedula] ([idTipoCedula], [cedula]) VALUES (1, N'Interna')
INSERT [dbo].[TipoCedula] ([idTipoCedula], [cedula]) VALUES (2, N'Resultados')
INSERT [dbo].[TipoCedula] ([idTipoCedula], [cedula]) VALUES (3, N'De bolsa')
SET IDENTITY_INSERT [dbo].[TipoCedula] OFF
GO

SET IDENTITY_INSERT [dbo].[TipoPersonal] ON 
INSERT [dbo].[TipoPersonal] ([idTipoPersonal], [personal]) VALUES (1, N'Confianza')
INSERT [dbo].[TipoPersonal] ([idTipoPersonal], [personal]) VALUES (2, N'Eventual')
SET IDENTITY_INSERT [dbo].[TipoPersonal] OFF
GO

SET IDENTITY_INSERT [dbo].[TipoProceso] ON 
INSERT [dbo].[TipoProceso] ([idTipoProceso], [proceso]) VALUES (1, N'Asignación')
INSERT [dbo].[TipoProceso] ([idTipoProceso], [proceso]) VALUES (2, N'Requisición')
INSERT [dbo].[TipoProceso] ([idTipoProceso], [proceso]) VALUES (3, N'De bolsa')
SET IDENTITY_INSERT [dbo].[TipoProceso] OFF
GO