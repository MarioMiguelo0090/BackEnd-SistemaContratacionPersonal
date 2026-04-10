USE [SistemaServicioSocial]
GO

CREATE TYPE [dbo].[TVP_SeguimientoHermes] AS TABLE(
	[folio] [nvarchar](max) NULL,
	[fechaRecepcion] [nvarchar](max) NULL,
	[importancia] [nvarchar](max) NULL,
	[tipoEnvio] [nvarchar](max) NULL,
	[requiereRespuesta] [bit] NULL,
	[solicita] [nvarchar](max) NULL,
	[entidadDependencia] [nvarchar](max) NULL,
	[asunto] [nvarchar](max) NULL,
	[estatus] [nvarchar](max) NULL,
	[acciones] [nvarchar](max) NULL
)
GO