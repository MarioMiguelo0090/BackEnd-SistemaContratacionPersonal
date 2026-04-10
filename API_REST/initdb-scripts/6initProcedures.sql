USE [SistemaServicioSocial]
GO

-- Procedure - 1 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[ObtenerAccesosAnalistas] 
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT *
        FROM dbo.Acceso
        WHERE FKIdTipoAcceso = 2;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idAcceso
    END CATCH
END
GO

-- Procedure - 2 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_InsertarSeguimientoHermes]
    @folio VARCHAR(MAX),
    @fechaRecepcion VARCHAR(MAX),
    @importancia VARCHAR(MAX),
    @tipoEnvio VARCHAR(MAX),
    @requiereRespuesta BIT,
    @solicita VARCHAR(MAX),
    @entidadDependencia NVARCHAR(MAX),
    @asunto VARCHAR(MAX),
    @estatus VARCHAR(MAX),
    @acciones VARCHAR(MAX)
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM SeguimientoHermes WHERE folio = @folio)
        BEGIN 
            SELECT 2 AS resultado;
            RETURN;
        END
        INSERT INTO [dbo].[SeguimientoHermes] (
            folio,
            fechaRecepcion,
            importancia,
            tipoEnvio,
            requiereRespuesta,
            solicita,
            entidadDependencia,
            asunto,
            estatus,
            acciones
        )
        VALUES (
            @folio,
            @fechaRecepcion,
            @importancia,
            @tipoEnvio,
            @requiereRespuesta,
            @solicita,
            @entidadDependencia,
            @asunto,
            @estatus,
            @acciones
        );
        SELECT 1 AS resultado;
    END TRY
    BEGIN CATCH
        SELECT -1 AS resultado;
        DECLARE @msg VARCHAR(MAX) = 'sp_InsertarSeguimientoHermes ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;  
    END CATCH
END
GO

-- Procedure - 3 ----------------------------------------------------------------------
CREATE PROCEDURE sp_GuardarOficioConProceso
    @idOficio               INT,
    @FKIdProcesoContratacion INT,
    @folio                  VARCHAR(MAX),
    @fecha                  VARCHAR(MAX),
    @dirigido               VARCHAR(MAX),
    @puestoDirigido         VARCHAR(MAX),
    @machote                VARCHAR(MAX),
    @piePagina              VARCHAR(MAX),
    @tipo                   VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Oficio WHERE idOficio = @idOficio)
        BEGIN
            UPDATE Oficio SET
                FKIdProcesoContratacion = @FKIdProcesoContratacion,
                folio           = @folio,
                fecha           = @fecha,
                dirigido        = @dirigido,
                puestoDirigido  = @puestoDirigido,
                machote         = @machote,
                piePagina       = @piePagina,
                tipo            = @tipo
            WHERE idOficio = @idOficio;
            SELECT 1 AS resultado;
        END
        ELSE
        BEGIN
            INSERT INTO Oficio (
                idOficio, FKIdProcesoContratacion, folio, fecha, dirigido,
                puestoDirigido, machote, piePagina, tipo
            )
            VALUES (
                @idOficio, @FKIdProcesoContratacion, @folio, @fecha, @dirigido,
                @puestoDirigido, @machote, @piePagina, @tipo
            );
            SELECT 1 AS resultado;
        END
    END TRY
    BEGIN CATCH
        SELECT -1 AS resultado;
        DECLARE @msg VARCHAR(MAX) = 'sp_GuardarOficioConProceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 10, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS resultado, @msg AS errorMensaje; 
    END CATCH
END;
GO

-- Procedure - 4 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerOficiosPorProceso]
    @FKIdProcesoContratacion INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT
            idOficio,
            FKIdProcesoContratacion,
            folio,
            fecha,
            dirigido,
            puestoDirigido,
            machote,
            piePagina,
            tipo,
            fechaRegistro
        FROM [dbo].[Oficio]
        WHERE FKIdProcesoContratacion = @FKIdProcesoContratacion
        ORDER BY fechaRegistro ASC;
    END TRY
    BEGIN CATCH
        SELECT
            -1 AS idOficio,
            NULL AS FKIdProcesoContratacion,
            NULL AS folio,
            NULL AS fecha,
            NULL AS dirigido,
            NULL AS puestoDirigido,
            NULL AS machote,
            NULL AS piePagina,
            NULL AS tipo,
            NULL AS fechaRegistro;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerOficiosPorProceso ERROR: ' + ERROR_MESSAGE() +
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;
        SELECT CAST(-1 AS INT) AS idOficio, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 5 ----------------------------------------------------------------------
CREATE PROCEDURE sp_ObtenerDependenciaPorID
	@idDependencia INT
WITH EXECUTE AS OWNER
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		IF NOT EXISTS (SELECT 1 FROM Dependencia WHERE idDependencia = @idDependencia)
		BEGIN
			SELECT 0 AS idDependencia;
		END
		ELSE
		BEGIN
			SELECT 
				D.idDependencia,
				D.area,
				D.areaOrganizacional,
				D.nombre,
				D.numDependencia,
				D.zona,
				D.subzona
			FROM [dbo].Dependencia AS D
			WHERE D.idDependencia = @idDependencia;
		END
	END TRY
	BEGIN CATCH
		SELECT -1 AS idDependencia;
		DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerDependenciaPorID ERROR: ' + ERROR_MESSAGE() +
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;
        SELECT CAST(-1 AS INT) AS idOficio, @msg AS errorMensaje;
	END CATCH
END
GO

-- Procedure - 6 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ActualizarAcceso]
    @idAcceso INT,
    @usuario VARCHAR(64) = NULL,
    @contrasenia VARCHAR(255) = NULL,
    @FKIdTipoAcceso INT = NULL,
    @nombre VARCHAR(255) = NULL,
    @primerApellido VARCHAR(255) = NULL,
    @segundoApellido VARCHAR(255) = NULL,
    @estado BIT = NULL,
    @resultado INT OUTPUT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Verificar si el registro existe
        IF NOT EXISTS (SELECT 1 FROM Acceso WHERE idAcceso = @idAcceso)
        BEGIN
            SET @resultado = 2; -- Registro no encontrado
            RETURN;
        END
        -- Verificar si el nuevo usuario ya existe en otra fila
        IF @usuario IS NOT NULL
           AND EXISTS (SELECT 1 FROM Acceso WHERE usuario = @usuario AND idAcceso <> @idAcceso)
        BEGIN
            SET @resultado = -2; -- Usuario duplicado
            RETURN;
        END
        -- Actualizar registro
        UPDATE Acceso
        SET
            usuario = COALESCE(@usuario, usuario),
            contrasenia = COALESCE(@contrasenia, contrasenia),
            FKIdTipoAcceso = COALESCE(@FKIdTipoAcceso, FKIdTipoAcceso),
            nombre = COALESCE(@nombre, nombre),
            primerApellido = COALESCE(@primerApellido, primerApellido),
            segundoApellido = COALESCE(@segundoApellido, segundoApellido),
            estado = COALESCE(@estado, estado)
        WHERE idAcceso = @idAcceso;
        SET @resultado = 1; -- Actualización exitosa
    END TRY
    BEGIN CATCH
        SET @resultado = -1; -- Error genérico
        DECLARE @msg VARCHAR(MAX) = 'sp_ActualizarAcceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;  
    END CATCH
END;
GO

-- Procedure - 7 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ActualizarCedula]
    @idCedula INT,
    @FKIdTipoCedula INT = NULL,
    @FKIdProceso INT = NULL,
    @fechaCedulaInterna DATE = NULL,
    @fechaCedulaResultados DATE = NULL,
    @edad VARCHAR(MAX) = NULL,
    @educacionFormal VARCHAR(MAX) = NULL,
    @referidoPor VARCHAR(MAX) = NULL,
    @antecedentesFamiliaresUV VARCHAR(MAX) = NULL,
    @expectativaLaboral VARCHAR(MAX) = NULL,
    @experienciaRelacionada VARCHAR(MAX) = NULL,
    @experiencia VARCHAR(MAX) = NULL,
    @conclusiones VARCHAR(MAX) = NULL,
    @resultado VARCHAR(MAX) = NULL,
    @efectoContratacion VARCHAR(MAX) = NULL,
    @competenciaReforzar VARCHAR(MAX) = NULL,
    @competenciaDesarrollar VARCHAR(MAX) = NULL,
    @FKIdClasificacionCedula INT = NULL,
    @FKIdResultado INT = NULL,
    @motivoCedulaInterna VARCHAR(MAX) = NULL,
    @motivoCedulaResultados VARCHAR(MAX) = NULL,
    @competenciasSobresaliente VARCHAR(MAX) = NULL,
    @descripcionDesarrollar VARCHAR(MAX) = NULL,
    @descripcionReforzar VARCHAR(MAX) = NULL,
    @puesto VARCHAR(MAX) = NULL,
    @plaza VARCHAR(MAX) = NULL, 
    @oficioAutorizacionDeOcupacion VARCHAR(MAX) = NULL,
    @evaluacionConocimientos VARCHAR(MAX) = NULL,
    @estado BIT = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY        
        IF NOT EXISTS (SELECT 1 FROM Cedula WHERE idCedula = @idCedula)
        BEGIN
            SELECT 2 AS Resultado; 
            RETURN;
        END        

        UPDATE Cedula
        SET
            FKIdTipoCedula = COALESCE(@FKIdTipoCedula, FKIdTipoCedula),
            FKIdProceso = COALESCE(@FKIdProceso, FKIdProceso),
            fechaCedulaInterna = COALESCE(@fechaCedulaInterna, fechaCedulaInterna),
            fechaCedulaResultados = COALESCE(@fechaCedulaResultados, fechaCedulaResultados),
            edad = COALESCE(@edad, edad),
            educacionFormal = COALESCE(@educacionFormal, educacionFormal),
            referidoPor = COALESCE(@referidoPor, referidoPor),
            antecedentesFamiliaresUV = COALESCE(@antecedentesFamiliaresUV, antecedentesFamiliaresUV),
            expectativaLaboral = COALESCE(@expectativaLaboral, expectativaLaboral),
            experienciaRelacionada = COALESCE(@experienciaRelacionada, experienciaRelacionada),
            experiencia = COALESCE(@experiencia, experiencia),
            conclusiones = COALESCE(@conclusiones, conclusiones),
            resultado = COALESCE(@resultado, resultado),
            efectoContratacion = COALESCE(@efectoContratacion, efectoContratacion),
            competenciaReforzar = COALESCE(@competenciaReforzar, competenciaReforzar),
            competenciaDesarrollar = COALESCE(@competenciaDesarrollar, competenciaDesarrollar),
            FKIdClasificacionCedula = COALESCE(@FKIdClasificacionCedula, FKIdClasificacionCedula),
            FKIdResultado = COALESCE(@FKIdResultado, FKIdResultado),
            motivoCedulaInterna = COALESCE(@motivoCedulaInterna, motivoCedulaInterna),
            motivoCedulaResultados = COALESCE(@motivoCedulaResultados, motivoCedulaResultados),
            competenciasSobresaliente = COALESCE(@competenciasSobresaliente, competenciasSobresaliente),
            descripcionDesarrollar = COALESCE(@descripcionDesarrollar, descripcionDesarrollar),
            descripcionReforzar = COALESCE(@descripcionReforzar, descripcionReforzar),
            puesto = COALESCE(@puesto, puesto),
            plaza = COALESCE(@plaza, plaza), 
            oficioAutorizacionDeOcupacion = COALESCE(@oficioAutorizacionDeOcupacion, oficioAutorizacionDeOcupacion),
            evaluacionConocimientos = COALESCE(@evaluacionConocimientos, evaluacionConocimientos),
            estado = COALESCE(@estado, estado)
        WHERE idCedula = @idCedula;

        SELECT 1 AS Resultado; 
    END TRY
    BEGIN CATCH
        DECLARE @msg VARCHAR(MAX);
        SET @msg = 'sp_ActualizarCedula ERROR: ' + ERROR_MESSAGE() + 
                   ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
                   ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);

        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT -1 AS Resultado, @msg AS errorMensaje; 
    END CATCH
END;
GO


-- Procedure - 8 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ActualizarProcesoContratacion]
    @idProceso                     INT,
    @folio                          VARCHAR(MAX) = NULL,
    @numPlaza                       VARCHAR(MAX) = NULL,
    @fechaRecibido                  VARCHAR(MAX) = NULL,
    @fechaEntrevista                VARCHAR(MAX) = NULL,
    @resultadoEvaluacionConocimiento VARCHAR(MAX) = NULL,
    @fechaEnvioDEyDP                VARCHAR(MAX) = NULL,
    @fechaNotificacion              VARCHAR(MAX) = NULL,
    @categoriaPuestoOrigen          VARCHAR(MAX) = NULL,
    @diasProceso                    VARCHAR(MAX) = NULL,
    @beneficiado                    BIT = NULL,
    @FKIdTipoProceso                INT = NULL,
    @FKIdTipoPersonal               INT = NULL,
    @FKIdEstadoProcesoContratacion  INT = NULL,
    @FKIdTemporalDefinitiva         INT = NULL,
    @FKIdDependencia                INT = NULL,
    @hermesNotificacion             VARCHAR(MAX) = NULL,
    @titularPlaza                   VARCHAR(MAX) = NULL,
    @lineamientoOficioContinuidad   VARCHAR(MAX) = NULL,
    @motivo                         VARCHAR(MAX) = NULL,
    @fechaElaboracionPropuesta      VARCHAR(MAX) = NULL,
    @fechaLiberacionOficio          VARCHAR(MAX) = NULL,
    @periodoAutorizadoOficioInicio  VARCHAR(MAX) = NULL,
    @periodoAutorizadoOficioFin     VARCHAR(MAX) = NULL,
    @categoriaAutorizadaOficio      VARCHAR(MAX) = NULL,
    @observaciones                  VARCHAR(MAX) = NULL,
    @numCarpeta                     VARCHAR(MAX) = NULL,    
    @nombreCandidato                VARCHAR(MAX) = NULL,
    @funcionDesempeniar             VARCHAR(MAX) = NULL,
    @familiaFuncional               VARCHAR(MAX) = NULL,
    @fechaEvaluacionCompetencias    VARCHAR(MAX) = NULL,
    @fechaInicioProcesamiento       VARCHAR(MAX) = NULL,
    @resultadoEvaluacionCompetencias VARCHAR(MAX) = NULL,
    @experienciaLaboralSolicitada   VARCHAR(MAX) = NULL,
    @resultadoReferenciasLaborales  VARCHAR(MAX) = NULL,
    @fechaEnvioEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @fechaEntregaEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @resultadoEvaluacionDesempenio  VARCHAR(MAX) = NULL,
    @resultadoHabilidadesWord       VARCHAR(MAX) = NULL,
    @resultadoHabilidadesExcel      VARCHAR(MAX) = NULL,
    @resultadoOrtografia            VARCHAR(MAX) = NULL,
    @resultadoProcesoEvaluacion     VARCHAR(MAX) = NULL,
    @fechaRevisionOfiEval           VARCHAR(MAX) = NULL,
    @observacionesAnalista          VARCHAR(MAX) = NULL,
    @consecutivoExpediente          VARCHAR(MAX) = NULL,
    @seguimientoEvaluacionDesempenio BIT = NULL,
    @fechaEvaluacionDesempenio      VARCHAR(MAX) = NULL,
    @resultadoSeguimientoEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @FKIdAcceso                     INT = NULL,
	@educacionFormal VARCHAR(MAX) = NULL,
    @avaladoPor VARCHAR(MAX) = NULL,
	@fechaAsignacionAnalista VARCHAR(MAX) = NULL,
	@capacitado BIT = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY        
        IF NOT EXISTS (SELECT 1 FROM ProcesoContratacion WHERE idProceso = @idProceso)
        BEGIN
            SELECT 2 AS Resultado; -- No existe
            RETURN;
        END        
        UPDATE ProcesoContratacion
        SET
            folio = COALESCE(@folio, folio),
            numPlaza = COALESCE(@numPlaza, numPlaza),
            fechaRecibido = COALESCE(@fechaRecibido, fechaRecibido),
            fechaEntrevista = COALESCE(@fechaEntrevista, fechaEntrevista),
            resultadoEvaluacionConocimiento = COALESCE(@resultadoEvaluacionConocimiento, resultadoEvaluacionConocimiento),
            fechaEnvioDEyDP = COALESCE(@fechaEnvioDEyDP, fechaEnvioDEyDP),
            fechaNotificacion = COALESCE(@fechaNotificacion, fechaNotificacion),
            categoriaPuestoOrigen = COALESCE(@categoriaPuestoOrigen, categoriaPuestoOrigen),
            diasProceso = COALESCE(@diasProceso, diasProceso),
            beneficiado = COALESCE(@beneficiado, beneficiado),
            FKIdTipoProceso = COALESCE(@FKIdTipoProceso, FKIdTipoProceso),
            FKIdTipoPersonal = COALESCE(@FKIdTipoPersonal, FKIdTipoPersonal),
            FKIdEstadoProcesoContratacion = COALESCE(@FKIdEstadoProcesoContratacion, FKIdEstadoProcesoContratacion),
            FKIdTemporalDefinitiva = COALESCE(@FKIdTemporalDefinitiva, FKIdTemporalDefinitiva),
            FKIdDependencia = COALESCE(@FKIdDependencia, FKIdDependencia),
            hermesNotificacion = COALESCE(@hermesNotificacion, hermesNotificacion),
            titularPlaza = COALESCE(@titularPlaza, titularPlaza),
            lineamientoOficioContinuidad = COALESCE(@lineamientoOficioContinuidad, lineamientoOficioContinuidad),
            motivo = COALESCE(@motivo, motivo),
            fechaElaboracionPropuesta = COALESCE(@fechaElaboracionPropuesta, fechaElaboracionPropuesta),
            fechaLiberacionOficio = COALESCE(@fechaLiberacionOficio, fechaLiberacionOficio),
            periodoAutorizadoOficioInicio = COALESCE(@periodoAutorizadoOficioInicio, periodoAutorizadoOficioInicio),
            periodoAutorizadoOficioFin = COALESCE(@periodoAutorizadoOficioFin, periodoAutorizadoOficioFin),
            categoriaAutorizadaOficio = COALESCE(@categoriaAutorizadaOficio, categoriaAutorizadaOficio),
            observaciones = COALESCE(@observaciones, observaciones),
            numCarpeta = COALESCE(@numCarpeta, numCarpeta),
            nombreCandidato = COALESCE(@nombreCandidato, nombreCandidato),
            funcionDesempeniar = COALESCE(@funcionDesempeniar, funcionDesempeniar),
            familiaFuncional = COALESCE(@familiaFuncional, familiaFuncional),
            fechaEvaluacionCompetencias = COALESCE(@fechaEvaluacionCompetencias, fechaEvaluacionCompetencias),
            fechaInicioProcesamiento = COALESCE(@fechaInicioProcesamiento, fechaInicioProcesamiento),
            resultadoEvaluacionCompetencias = COALESCE(@resultadoEvaluacionCompetencias, resultadoEvaluacionCompetencias),
            experienciaLaboralSolicitada = COALESCE(@experienciaLaboralSolicitada, experienciaLaboralSolicitada),
            resultadoReferenciasLaborales = COALESCE(@resultadoReferenciasLaborales, resultadoReferenciasLaborales),
            fechaEnvioEvaluacionDesempenio = COALESCE(@fechaEnvioEvaluacionDesempenio, fechaEnvioEvaluacionDesempenio),
            fechaEntregaEvaluacionDesempenio = COALESCE(@fechaEntregaEvaluacionDesempenio, fechaEntregaEvaluacionDesempenio),
            resultadoEvaluacionDesempenio = COALESCE(@resultadoEvaluacionDesempenio, resultadoEvaluacionDesempenio),
            resultadoHabilidadesWord = COALESCE(@resultadoHabilidadesWord, resultadoHabilidadesWord),
            resultadoHabilidadesExcel = COALESCE(@resultadoHabilidadesExcel, resultadoHabilidadesExcel),
            resultadoOrtografia = COALESCE(@resultadoOrtografia, resultadoOrtografia),
            resultadoProcesoEvaluacion = COALESCE(@resultadoProcesoEvaluacion, resultadoProcesoEvaluacion),
            fechaRevisionOfiEval = COALESCE(@fechaRevisionOfiEval, fechaRevisionOfiEval),
            observacionesAnalista = COALESCE(@observacionesAnalista, observacionesAnalista),
            consecutivoExpediente = COALESCE(@consecutivoExpediente, consecutivoExpediente),
            seguimientoEvaluacionDesempenio = COALESCE(@seguimientoEvaluacionDesempenio, seguimientoEvaluacionDesempenio),
            fechaEvaluacionDesempenio = COALESCE(@fechaEvaluacionDesempenio, fechaEvaluacionDesempenio),
            resultadoSeguimientoEvaluacionDesempenio = COALESCE(@resultadoSeguimientoEvaluacionDesempenio, resultadoSeguimientoEvaluacionDesempenio),
            FKIdAcceso = COALESCE(@FKIdAcceso, FKIdAcceso),
			educacionFormal = COALESCE(@educacionFormal, educacionFormal),
            avaladoPor = COALESCE(@avaladoPor, avaladoPor),
			fechaAsignacionAnalista = COALESCE(@fechaAsignacionAnalista, fechaAsignacionAnalista),
			capacitado = COALESCE(@capacitado, capacitado)
        WHERE idProceso = @idProceso;
        SELECT 1 AS Resultado; 
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado; 
        DECLARE @msg VARCHAR(MAX) = 'sp_ActualizarProcesoContratacion ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje; 
    END CATCH
END;
GO

-- Procedure - 9 ----------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ActualizarResultado]
    @idResultado INT,
    @psicometriaComunicacion VARCHAR(MAX) = NULL,
    @psicometriaTrabajoEnEquipo VARCHAR(MAX) = NULL,
    @psicometriaOrientacionAlServicio VARCHAR(MAX) = NULL,
    @psicometriaSensibilidadALineamientos VARCHAR(MAX) = NULL,
    @psicometriaPlaneacionOrganizacion VARCHAR(MAX) = NULL,
    @psicometriaAnalisisProblemas VARCHAR(MAX) = NULL,
    @psicometriaEnfoqueResultados VARCHAR(MAX) = NULL,
    @psicometriaControlActividades VARCHAR(MAX) = NULL,
    @psicometriaEnfoqueCalidad VARCHAR(MAX) = NULL,
    @psicometriaRelacionesInterpersonales VARCHAR(MAX) = NULL,
    @psicometriaLiderazgo VARCHAR(MAX) = NULL,
    @psicometriaTomaDecisiones VARCHAR(MAX) = NULL,
    @psicometriaDinamismo VARCHAR(MAX) = NULL,
    @psicometriaInnovacion VARCHAR(MAX) = NULL,
    @psicometriaPensamientoEstrategico VARCHAR(MAX) = NULL,
    @psicometriaNegociacion VARCHAR(MAX) = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE dbo.Resultado
        SET 
            psicometriaComunicacion = ISNULL(@psicometriaComunicacion, psicometriaComunicacion),
            psicometriaTrabajoEnEquipo = ISNULL(@psicometriaTrabajoEnEquipo, psicometriaTrabajoEnEquipo),
            psicometriaOrientacionAlServicio = ISNULL(@psicometriaOrientacionAlServicio, psicometriaOrientacionAlServicio),
            psicometriaSensibilidadALineamientos = ISNULL(@psicometriaSensibilidadALineamientos, psicometriaSensibilidadALineamientos),
            psicometriaPlaneacionOrganizacion = ISNULL(@psicometriaPlaneacionOrganizacion, psicometriaPlaneacionOrganizacion),
            psicometriaAnalisisProblemas = ISNULL(@psicometriaAnalisisProblemas, psicometriaAnalisisProblemas),
            psicometriaEnfoqueResultados = ISNULL(@psicometriaEnfoqueResultados, psicometriaEnfoqueResultados),
            psicometriaControlActividades = ISNULL(@psicometriaControlActividades, psicometriaControlActividades),
            psicometriaEnfoqueCalidad = ISNULL(@psicometriaEnfoqueCalidad, psicometriaEnfoqueCalidad),
            psicometriaRelacionesInterpersonales = ISNULL(@psicometriaRelacionesInterpersonales, psicometriaRelacionesInterpersonales),
            psicometriaLiderazgo = ISNULL(@psicometriaLiderazgo, psicometriaLiderazgo),
            psicometriaTomaDecisiones = ISNULL(@psicometriaTomaDecisiones, psicometriaTomaDecisiones),
            psicometriaDinamismo = ISNULL(@psicometriaDinamismo, psicometriaDinamismo),
            psicometriaInnovacion = ISNULL(@psicometriaInnovacion, psicometriaInnovacion),
            psicometriaPensamientoEstrategico = ISNULL(@psicometriaPensamientoEstrategico, psicometriaPensamientoEstrategico),
            psicometriaNegociacion = ISNULL(@psicometriaNegociacion, psicometriaNegociacion)
        WHERE idResultado = @idResultado;
        IF @@ROWCOUNT > 0
            SELECT 1 AS actualizado;
        ELSE
            SELECT 0 AS actualizado;
    END TRY
    BEGIN CATCH
        SELECT -1 AS actualizado;
        SELECT -1 AS Resultado; 
        DECLARE @msg VARCHAR(MAX) = 'sp_ActualizarResultado ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje; 
    END CATCH
END
GO

-- Procedure - 10 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_DesactivarUsuario]
    @idAcceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        UPDATE Acceso
        SET estado = 0
        WHERE idAcceso = @idAcceso;        
        IF @@ROWCOUNT = 0
            SELECT CAST(0 AS INT) AS Resultado; 
        ELSE
            SELECT CAST(1 AS INT) AS Resultado; 
    END TRY
    BEGIN CATCH        
        SELECT CAST(-1 AS INT) AS Resultado;
        DECLARE @msg VARCHAR(MAX) = 'sp_DesactivarUsuario ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 11 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_EliminarProcesoContratacion]
    @idProceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Verificar si el registro existe
        IF EXISTS (SELECT 1 FROM [dbo].[ProcesoContratacion] WHERE idProceso = @idProceso)
        BEGIN
            DELETE FROM [dbo].[ProcesoContratacion]
            WHERE idProceso = @idProceso;

            -- Retorna el idProceso eliminado
            SELECT @idProceso AS idProceso, 'Registro eliminado correctamente.' AS mensaje;
        END
        ELSE
        BEGIN
            -- No existe el registro
            SELECT 0 AS idProceso, 'No se encontró ningún registro con el idProceso proporcionado.' AS mensaje;
        END
    END TRY
    BEGIN CATCH
        -- Error de base de datos
        SELECT -1 AS idProceso, ERROR_MESSAGE() AS mensaje;
        DECLARE @msg VARCHAR(MAX) = 'sp_EliminarProcesoContratacion ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 12 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_InsertarDocumentoCedulaExterna]
    @FKIdCedula INT,
    @nombre VARCHAR(MAX),
    @archivo VARCHAR(MAX),
    @fechaSubida VARCHAR(50)
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM Documento WHERE FKIdCedula = @FKIdCedula)
        BEGIN
            -- Si ya existe, actualiza el registro
            UPDATE Documento
            SET nombre = @nombre,
                archivo = @archivo,
                fechaSubida = @fechaSubida
            WHERE FKIdCedula = @FKIdCedula;
        END
        ELSE
        BEGIN
            -- Si no existe, inserta un nuevo registro
            INSERT INTO Documento (FKIdCedula, nombre, archivo, fechaSubida)
            VALUES (@FKIdCedula, @nombre, @archivo, @fechaSubida);
        END
        SELECT 1 AS Codigo;
    END TRY
    BEGIN CATCH
        SELECT 0 AS Codigo;
        DECLARE @msg VARCHAR(MAX) = 'sp_InsertarDocumentoCedulaExterna ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 13 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_LoginAcceso]
    @usuario VARCHAR(64)
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @idAcceso INT;
        DECLARE @estado INT;
        IF NOT EXISTS (SELECT 1 FROM Acceso WHERE usuario = @usuario)
        BEGIN
            SELECT 1 AS Resultado,
                NULL AS idAcceso, NULL AS usuario, NULL AS contrasenia,
                NULL AS FKidTipoAcceso, NULL AS nombre, NULL AS primerApellido,
                NULL AS segundoApellido, NULL AS estado;
            RETURN;
        END
        SELECT TOP 1
            @idAcceso = idAcceso,
            @estado   = estado
        FROM Acceso
        WHERE usuario = @usuario;
        IF @estado <> 1
        BEGIN
            SELECT 3 AS Resultado,
                NULL AS idAcceso, NULL AS usuario, NULL AS contrasenia,
                NULL AS FKidTipoAcceso, NULL AS nombre, NULL AS primerApellido,
                NULL AS segundoApellido, NULL AS estado;
            RETURN;
        END
        SELECT
            0 AS Resultado,
            idAcceso,
            usuario,
            contrasenia,  
            FKidTipoAcceso AS tipoDeAcceso,
            nombre,
            primerApellido,
            segundoApellido,
            estado
        FROM Acceso
        WHERE idAcceso = @idAcceso;
    END TRY
    BEGIN CATCH
        SELECT -1 AS Resultado,
            NULL AS idAcceso, NULL AS usuario, NULL AS contrasenia,
            NULL AS FKidTipoAcceso, NULL AS nombre, NULL AS primerApellido,
            NULL AS segundoApellido, NULL AS estado;
        DECLARE @msg VARCHAR(MAX) = 'sp_LoginAcceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 14 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerAccesoPorId]
    @idAcceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idAcceso,
            usuario,
            contrasenia,
            FKidTipoAcceso,
            nombre,
            primerApellido,
            segundoApellido,
            estado
        FROM Acceso
        WHERE idAcceso = @idAcceso;
    END TRY
    BEGIN CATCH
        -- Error en la BD: devolver una fila con idAcceso = 0 para indicar fallo
        SELECT 
            -1 AS idAcceso,
            NULL AS usuario,
            NULL AS contrasenia,
            NULL AS FKidTipoAcceso,
            NULL AS nombre,
            NULL AS primerApellido,
            NULL AS segundoApellido,
            NULL AS estado;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerAccesoPorId ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 15 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerAccesoPorUsuario]
    @usuario VARCHAR(64)
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT 
            idAcceso,
            usuario,
            contrasenia,
            FKidTipoAcceso,
            nombre,
            primerApellido,
            segundoApellido,
            estado
        FROM Acceso
        WHERE usuario = @usuario;
    END TRY
    BEGIN CATCH        
        SELECT 
            -1 AS idAcceso,
            NULL AS usuario,
            NULL AS contrasenia,
            NULL AS FKidTipoAcceso,
            NULL AS nombre,
            NULL AS primerApellido,
            NULL AS segundoApellido,
            NULL AS estado;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerAccesoPorUsuario ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 16 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerCedulaPorIdProceso]
    @idProceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Verifica si existe una cédula asociada al proceso
        IF EXISTS (
            SELECT 1 
            FROM Cedula 
            WHERE FKIdProceso = @idProceso
        )
        BEGIN
            SELECT 
                c.*,
                d.numDependencia,
                d.idDependencia,
                d.nombre        AS nombreDependencia,
                d.area          AS areaDependencia,
                d.zona          AS zonaDependencia,
                d.subzona       AS subzonaDependencia,
                d.areaOrganizacional
            FROM Cedula c
            LEFT JOIN ProcesoContratacion pc ON c.FKIdProceso = pc.idProceso
            LEFT JOIN Dependencia d ON pc.FKIdDependencia = d.idDependencia
            WHERE c.FKIdProceso = @idProceso;
        END
        ELSE
        BEGIN
            -- Si no se encuentra, devuelve una fila por defecto con valores nulos
            SELECT
                -1 AS idCedula,
                NULL AS FKIdTipoCedula,
                NULL AS FKIdProceso,
                NULL AS fechaCedulaInterna,
                NULL AS fechaCedulaResultados,
                NULL AS edad,
                NULL AS educacionFormal,
                NULL AS referidoPor,
                NULL AS antecedentesFamiliaresUV,
                NULL AS expectativaLaboral,
                NULL AS experienciaRelacionada,
                NULL AS experiencia,
                NULL AS conclusiones,
                NULL AS resultado,
                NULL AS efectoContratacion,
                NULL AS competenciaReforzar,
                NULL AS competenciaDesarrollar,
                NULL AS FKIdClasificacionCedula,
                NULL AS FKIdResultado,
                NULL AS motivoCedulaInterna,
                NULL AS motivoCedulaResultados,
                NULL AS puesto;
        END
    END TRY
    BEGIN CATCH
        -- En caso de error, devuelve una fila por defecto
        SELECT
            -1 AS idCedula,
            NULL AS FKIdTipoCedula,
            NULL AS FKIdProceso,
            NULL AS fechaCedulaInterna,
            NULL AS fechaCedulaResultados,
            NULL AS edad,
            NULL AS educacionFormal,
            NULL AS referidoPor,
            NULL AS antecedentesFamiliaresUV,
            NULL AS expectativaLaboral,
            NULL AS experienciaRelacionada,
            NULL AS experiencia,
            NULL AS conclusiones,
            NULL AS resultado,
            NULL AS efectoContratacion,
            NULL AS competenciaReforzar,
            NULL AS competenciaDesarrollar,
            NULL AS FKIdClasificacionCedula,
            NULL AS FKIdResultado,
            NULL AS motivoCedulaInterna,
            NULL AS motivoCedulaResultados,
            NULL AS puesto;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerCedulaPorIdProceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 17 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerCedulasActivas]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            c.*,
            p.nombreCandidato,
            d.idDependencia,
            d.numDependencia,
            d.nombre        AS nombreDependencia,
            d.area          AS areaDependencia,
            d.zona          AS zonaDependencia,
            d.subzona       AS subzonaDependencia,
            d.areaOrganizacional
        FROM Cedula AS c
        INNER JOIN ProcesoContratacion AS p
            ON c.FKIdProceso = p.idProceso
        LEFT JOIN Dependencia d ON p.FKIdDependencia = d.idDependencia
        WHERE 
            p.FKIdEstadoProcesoContratacion = 8
            AND p.beneficiado = 1;
    END TRY
    BEGIN CATCH
        SELECT
            -1 AS idCedula;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerCedulasActivas ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 18 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerClasificacionCedula]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idClasificacionCedulas,
            numCedula,
            nombre
        FROM ClasificacionCedula;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idClasificacionCedulas;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerClasificacionCedula ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 19 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerCompetenciasPorClasificacionCedula]
    @idClasificacionCedula INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        ccc.idClasificacionCedulas,
        ccc.numCedula,
        ccc.nombre AS nombreClasificacion,
        comp.idCompetencia,
        comp.nombre AS nombreCompetencia,
        dcc.perfil
    FROM ClasificacionCedula ccc
    INNER JOIN DetalleClasificacionCedulaCompetencia dcc 
        ON ccc.idClasificacionCedulas = dcc.FKIdClasificacionCedula
    INNER JOIN Competencia comp 
        ON dcc.FKIdCompetencia = comp.idCompetencia
    WHERE ccc.idClasificacionCedulas = @idClasificacionCedula;
END
GO

-- Procedure - 20 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerControlVersionPorProceso]
    @FKIdProceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idControlVersion,
            FKIdProceso,
            nombreCompleto,
            jsonDatos,
            fechaModificacion
        FROM [dbo].[ControlVersion]
        WHERE FKIdProceso = @FKIdProceso
        ORDER BY fechaModificacion DESC; 
    END TRY
    BEGIN CATCH
        -- Devuelve una fila con -1 y valores nulos si ocurre un error
        SELECT 
            CAST(-1 AS INT) AS idControlVersion,
            NULL AS FKIdProceso,
            NULL AS nombreCompleto,
            NULL AS jsonDatos,
            NULL AS fechaModificacion,
            ERROR_MESSAGE() AS mensajeError;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerControlVersionPorProceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 21 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerDependencias]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idDependencia,
            numDependencia,
            nombre,
            area,
            zona,
            subzona,
            areaOrganizacional
        FROM Dependencia
        ORDER BY numDependencia ASC; 
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idDependencia;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerDependencias ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 22 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerDocumentoExternoPorCedula]
    @FKIdCedula INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            d.idDocumento,
            d.FKIdCedula,
            d.nombre,
            d.fechaSubida,
            d.archivo
        FROM Documento AS d
        WHERE d.FKIdCedula = @FKIdCedula;        
    END TRY
    BEGIN CATCH
        -- En caso de error, devuelves un código 0 para manejarlo desde Node.js
        SELECT 
            0 AS Codigo,
            ERROR_MESSAGE() AS MensajeError;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerDocumentoExternoPorCedula ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 23 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerEstadosProcesoContratacion]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
         SELECT 
            idEstadoProcesoContratacion,
            estado
        FROM EstadoProcesoContratacion;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idEstadoProcesoContratacion;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerEstadosProcesoContratacion ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 24 ---------------------------------------------------------------------
Create PROCEDURE [dbo].[sp_ObtenerProcesoPorIdProceso]
    @idProceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT *
        FROM ProcesoContratacion
        WHERE idProceso = @idProceso;
    END TRY
    BEGIN CATCH        
        SELECT 
            -1 AS idProceso,
            NULL AS folio,
            NULL AS numPlaza,
            NULL AS fechaRecibido,
            NULL AS fechaEntrevista,
            NULL AS resultadoEvaluacionConocimiento,
            NULL AS fechaEnvioDEyDP,
            NULL AS fechaNotificacion,
            NULL AS categoriaPuestoOrigen,
            NULL AS diasProceso,
            NULL AS beneficiado,
            NULL AS FKIdTipoProceso,
            NULL AS FKIdTipoPersonal,
            NULL AS FKIdEstadoProcesoContratacion,
            NULL AS FKIdTemporalDefinitiva,
            NULL AS FKIdDependencia,
            NULL AS hermesNotificacion,
            NULL AS titularPlaza,
            NULL AS lineamientoOficioContinuidad,
            NULL AS motivo,
            NULL AS fechaElaboracionPropuesta,
            NULL AS fechaLiberacionOficio,
            NULL AS periodoAutorizadoOficioInicio,
            NULL AS periodoAutorizadoOficioFin,
            NULL AS categoriaAutorizadaOficio,
            NULL AS observaciones,
            NULL AS numCarpeta,
            NULL AS nombreCandidato,
            NULL AS funcionDesempeniar,
            NULL AS familiaFuncional,
            NULL AS fechaEvaluacionCompetencias,
            NULL AS fechaInicioProcesamiento,
            NULL AS resultadoEvaluacionCompetencias,
            NULL AS experienciaLaboralSolicitada,
            NULL AS resultadoReferenciasLaborales,
            NULL AS fechaEnvioEvaluacionDesempenio,
            NULL AS fechaEntregaEvaluacionDesempenio,
            NULL AS resultadoEvaluacionDesempenio,
            NULL AS resultadoHabilidadesWord,
            NULL AS resultadoHabilidadesExcel,
            NULL AS resultadoOrtografia,
            NULL AS resultadoProcesoEvaluacion,
            NULL AS fechaRevisionOfiEval,
            NULL AS observacionesAnalista,
            NULL AS consecutivoExpediente,
            NULL AS seguimientoEvaluacionDesempenio,
            NULL AS fechaEvaluacionDesempenio,
            NULL AS resultadoSeguimientoEvaluacionDesempenio,
            NULL AS FKIdAcceso,
            NULL AS hermes;
            DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerProcesoPorIdProceso ERROR: ' + ERROR_MESSAGE() + 
                ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
                ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
            RAISERROR(@msg, 16, 1) WITH LOG;  
            SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 25 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerProcesosNoBeneficiadosBolsa]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM dbo.ProcesoContratacion
    WHERE beneficiado = 0;      
END
GO

-- Procedure - 26 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerProcesosPorIdAcceso]
    @FKIdAcceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        idProceso,
        folio,
        numPlaza,
        fechaRecibido,
        fechaEntrevista,
        resultadoEvaluacionConocimiento,
        fechaEnvioDEyDP,
        fechaNotificacion,
        categoriaPuestoOrigen,
        diasProceso,
        beneficiado,
        FKIdTipoProceso,
        FKIdTipoPersonal,
        FKIdEstadoProcesoContratacion,
        FKIdTemporalDefinitiva,
        FKIdDependencia,
        hermesNotificacion,
        titularPlaza,
        lineamientoOficioContinuidad,
        motivo,
        fechaElaboracionPropuesta,
        fechaLiberacionOficio,
        periodoAutorizadoOficioInicio,
        periodoAutorizadoOficioFin,
        categoriaAutorizadaOficio,
        observaciones,
        numCarpeta,        
        nombreCandidato,
        funcionDesempeniar,
        familiaFuncional,
        fechaEvaluacionCompetencias,
        fechaInicioProcesamiento,
        resultadoEvaluacionCompetencias,
        experienciaLaboralSolicitada,
        resultadoReferenciasLaborales,
        fechaEnvioEvaluacionDesempenio,
        fechaEntregaEvaluacionDesempenio,
        resultadoEvaluacionDesempenio,
        resultadoHabilidadesWord,
        resultadoHabilidadesExcel,
        resultadoOrtografia,
        resultadoProcesoEvaluacion,
        fechaRevisionOfiEval,
        observacionesAnalista,
        consecutivoExpediente,
        seguimientoEvaluacionDesempenio,
        fechaEvaluacionDesempenio,
        resultadoSeguimientoEvaluacionDesempenio,
        FKIdAcceso
    FROM ProcesoContratacion
    WHERE FKIdAcceso = @FKIdAcceso
    ORDER BY fechaRecibido DESC;
END
GO

-- Procedure - 27 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerProcesosPorIdAccesoParaEstadistica]
    @FKIdAcceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        pc.*,                              
        a.nombre, 
        a.primerApellido, 
        a.segundoApellido
    FROM [dbo].[ProcesoContratacion] AS pc
    INNER JOIN [dbo].[Acceso] AS a
        ON pc.[FKIdAcceso] = a.[idAcceso]
    WHERE pc.[FKIdAcceso] = @FKIdAcceso;
END
GO

-- Procedure - 28 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerProcesosPorIdEstado]
    @FKIdEstadoProcesoContratacion INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        idProceso,
        folio,
        numPlaza,
        fechaRecibido,
        fechaEntrevista,
        resultadoEvaluacionConocimiento,
        fechaEnvioDEyDP,
        fechaNotificacion,
        categoriaPuestoOrigen,
        diasProceso,
        beneficiado,
        FKIdTipoProceso,
        FKIdTipoPersonal,
        FKIdEstadoProcesoContratacion,
        FKIdTemporalDefinitiva,
        FKIdDependencia,
        hermesNotificacion,
        titularPlaza,
        lineamientoOficioContinuidad,
        motivo,
        fechaElaboracionPropuesta,
        fechaLiberacionOficio,
        periodoAutorizadoOficioInicio,
        periodoAutorizadoOficioFin,
        categoriaAutorizadaOficio,
        observaciones,
        numCarpeta,        
        nombreCandidato,
        funcionDesempeniar,
        familiaFuncional,
        fechaEvaluacionCompetencias,
        fechaInicioProcesamiento,
        resultadoEvaluacionCompetencias,
        experienciaLaboralSolicitada,
        resultadoReferenciasLaborales,
        fechaEnvioEvaluacionDesempenio,
        fechaEntregaEvaluacionDesempenio,
        resultadoEvaluacionDesempenio,
        resultadoHabilidadesWord,
        resultadoHabilidadesExcel,
        resultadoOrtografia,
        resultadoProcesoEvaluacion,
        fechaRevisionOfiEval,
        observacionesAnalista,
        consecutivoExpediente,
        seguimientoEvaluacionDesempenio,
        fechaEvaluacionDesempenio,
        resultadoSeguimientoEvaluacionDesempenio,
        FKIdAcceso
    FROM ProcesoContratacion
    WHERE FKIdEstadoProcesoContratacion = @FKIdEstadoProcesoContratacion
    ORDER BY fechaRecibido DESC;
END
GO

-- Procedure - 29 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerResultadoPorCedulaRelacionada]
    @IdProceso INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @IdCedulaTipo1 INT;
    -- Buscar la cédula del proceso con tipo = 1
    SELECT TOP 1 @IdCedulaTipo1 = IdCedula
    FROM Cedula
    WHERE FKIdProceso = @IdProceso
      AND FKIdTipoCedula = 1;
    -- Devolver el resultado asociado a esa cédula tipo 1
    SELECT R.*
    FROM Resultado AS R
    WHERE R.FKIdCedula = @IdCedulaTipo1;
END;
GO

-- Procedure - 30 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerResultadosPorIdCedula]
    @idCedula INT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT *
        FROM Resultado
        WHERE FKIdCedula = @idCedula;
    END TRY
    BEGIN CATCH        
        SELECT 
            -1 AS idResultado,
            NULL AS FKIdCedula,
            NULL AS psicometriaComunicacion,
            NULL AS psicometriaTrabajoEnEquipo,
            NULL AS psicometriaOrientacionAlServicio,
            NULL AS psicometriaSensibilidadALineamientos,
            NULL AS psicometriaPlaneacionOrganizacion,
            NULL AS psicometriaAnalisisProblemas,
            NULL AS psicometriaEnfoqueResultados,
            NULL AS psicometriaControlActividades,
            NULL AS psicometriaEnfoqueCalidad,
            NULL AS psicometriaRelacionesInterpersonales,
            NULL AS psicometriaLiderazgo,
            NULL AS psicometriaTomaDecisiones,
            NULL AS psicometriaDinamismo,
            NULL AS psicometriaInnovacion,
            NULL AS psicometriaPensamientoEstrategico,
            NULL AS psicometriaNegociacion;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerResultadosPorIdCedula ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 31 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerSeguimientoHermes]
    @estadoArchivado BIT = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT
            idSeguimiento,
            folio,
            fechaRecepcion,
            importancia,
            tipoEnvio,
            requiereRespuesta,
            solicita,
            entidadDependencia,
            asunto,
            estatus,
            acciones,
            estadoArchivado
        FROM SeguimientoHermes
        WHERE
            @estadoArchivado IS NULL
            OR estadoArchivado = @estadoArchivado
        ORDER BY fechaRecepcion DESC;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idSeguimiento;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerSeguimientoHermes ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 32 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTemporalDefinitiva]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idTemporalDefinitiva,
            descripcion
        FROM TemporalDefinitiva;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idTemporalDefinitiva;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTemporalDefinitiva ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 33 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTiposCedula]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idTipoCedula,
            cedula
        FROM TipoCedula;
    END TRY
    BEGIN CATCH
        SELECT
            -1 AS idTipoCedula;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTiposCedula ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 34 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTiposPersonal]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
         SELECT 
            idTipoPersonal,
            personal
        FROM TipoPersonal;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idTipoPersonal;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTiposPersonal ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 35 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTiposProceso]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idTipoProceso,
            proceso
        FROM TipoProceso;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idTipoProceso;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTiposProceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 36 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTodasCedulas]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
         SELECT
            c.idCedula,
            c.FKIdTipoCedula,
            c.FKIdProceso,
            c.fechaCedulaInterna,
            c.fechaCedulaResultados,
            c.edad,        
            c.referidoPor,
            c.antecedentesFamiliaresUV,
            c.expectativaLaboral,
            c.experienciaRelacionada,
            c.experiencia,
            c.conclusiones,
            c.resultado,
            c.efectoContratacion,
            c.competenciaReforzar,
            c.competenciaDesarrollar,
            c.FKIdClasificacionCedula,
            c.FKIdResultado,
            c.motivoCedulaInterna,
            c.motivoCedulaResultados,
            c.puesto,
            c.estado, c.plaza, c.oficioAutorizacionDeOcupacion, c.descripcionReforzar,c.evaluacionConocimientos, c.descripcionDesarrollar,
            c.competenciasSobresaliente,
            c.aprobadoDireccion,
            c.aprobadoJefeOficina,
            pc.*,
            d.idDependencia,
            d.numDependencia,
            d.nombre        AS nombreDependencia,
            d.area          AS areaDependencia,
            d.zona          AS zonaDependencia,
            d.subzona       AS subzonaDependencia,
            d.areaOrganizacional,
            r.*,
            a.nombre        AS analistaNombre,
            a.primerApellido AS analistaPrimerApellido,
            a.segundoApellido AS analistaSegundoApellido
        FROM [dbo].[Cedula] c
        LEFT JOIN [dbo].[ProcesoContratacion] pc
            ON c.FKIdProceso = pc.idProceso
        LEFT JOIN [dbo].[Dependencia] d
            ON pc.FKIdDependencia = d.idDependencia 
        LEFT JOIN [dbo].[Resultado] r
            ON r.FKIdCedula = c.idCedula
        LEFT JOIN [dbo].[Acceso] a
            ON pc.FKIdAcceso = a.idAcceso
        ORDER BY c.idCedula ASC;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idCedula;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTodasCedulas ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 37 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTodosAccesos]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        SELECT 
            idAcceso,
            usuario,
            contrasenia,
            FKIdTipoAcceso,
            nombre,
            primerApellido,
            segundoApellido,
            estado
        FROM dbo.Acceso
        ORDER BY idAcceso ASC;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idAcceso;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTodosAccesos ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 38 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTodosProcesosContratacion]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        p.idProceso,
        p.folio,
        p.numPlaza,
        p.fechaRecibido,
        p.fechaEntrevista,
        p.resultadoEvaluacionConocimiento,
        p.fechaEnvioDEyDP,
        p.fechaNotificacion,
        p.categoriaPuestoOrigen,
        p.diasProceso,
        p.beneficiado,
        p.FKIdTipoProceso,
        p.FKIdTipoPersonal,
        p.FKIdEstadoProcesoContratacion,
        p.FKIdTemporalDefinitiva,
        p.FKIdDependencia,
        p.hermesNotificacion,
        p.titularPlaza,
        p.lineamientoOficioContinuidad,
        p.motivo,
        p.fechaElaboracionPropuesta,
        p.fechaLiberacionOficio,
        p.periodoAutorizadoOficioInicio,
        p.periodoAutorizadoOficioFin,
        p.categoriaAutorizadaOficio,
        p.observaciones,
        p.numCarpeta,
        p.nombreCandidato,
        p.funcionDesempeniar,
        p.familiaFuncional,
        p.fechaEvaluacionCompetencias,
        p.fechaInicioProcesamiento,
        p.resultadoEvaluacionCompetencias,
        p.experienciaLaboralSolicitada,
        p.resultadoReferenciasLaborales,
        p.fechaEnvioEvaluacionDesempenio,
        p.fechaEntregaEvaluacionDesempenio,
        p.resultadoEvaluacionDesempenio,
        p.resultadoHabilidadesWord,
        p.resultadoHabilidadesExcel,
        p.resultadoOrtografia,
        p.resultadoProcesoEvaluacion,
        p.fechaRevisionOfiEval,
        p.observacionesAnalista,
        p.consecutivoExpediente,
        p.seguimientoEvaluacionDesempenio,
        p.fechaEvaluacionDesempenio,
        p.resultadoSeguimientoEvaluacionDesempenio,
        p.FKIdAcceso,
		p.autorizacion,
		p.educacionFormal,
		p.avaladoPor,
		p.fechaAsignacionAnalista,
        d.numDependencia,
        d.nombre,
        d.areaOrganizacional AS area,
        d.zona
    FROM [dbo].[ProcesoContratacion] p
    LEFT JOIN [dbo].[Dependencia] d
        ON p.FKIdDependencia = d.idDependencia;
END
GO

-- Procedure - 39 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_ObtenerTodosTiposAcceso]
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        SELECT 
            idTipoAcceso,
            tipo
        FROM 
            TipoAcceso;
    END TRY
    BEGIN CATCH
        SELECT 
            -1 AS idTipoAcceso,
            NULL AS tipo;
        SELECT 
            -1 AS idAcceso;
        DECLARE @msg VARCHAR(MAX) = 'sp_ObtenerTodosTiposAcceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 40 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_RegistrarAcceso]
    @usuario        VARCHAR(64),
    @contrasenia    VARCHAR(255),
    @FKidTipoAcceso INT,
    @nombre         VARCHAR(255),
    @primerApellido VARCHAR(255),
    @segundoApellido VARCHAR(255) = NULL,
    @idAcceso       INT OUTPUT
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY        
        IF EXISTS (SELECT 1 FROM Acceso WHERE usuario = @usuario)
        BEGIN
            SET @idAcceso = -2; 
            RETURN;
        END        
        INSERT INTO Acceso (
            usuario,
            contrasenia,
            FKidTipoAcceso,
            nombre,
            primerApellido,
            segundoApellido,
            estado
        )
        VALUES (
            @usuario,
            @contrasenia,
            @FKidTipoAcceso,
            @nombre,
            @primerApellido,
            @segundoApellido,
            1
        );        
        SET @idAcceso = CAST(SCOPE_IDENTITY() AS INT);        
    END TRY
    BEGIN CATCH
        SET @idAcceso = -1;
        DECLARE @msg VARCHAR(MAX) = 'sp_RegistrarAcceso ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 41 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_RegistrarCedula]
    @FKIdTipoCedula INT = NULL,
    @FKIdProceso INT = NULL,
    @fechaCedulaInterna VARCHAR(MAX) = NULL,
    @fechaCedulaResultados VARCHAR(MAX) = NULL,
    @edad VARCHAR(MAX) = NULL,
    @educacionFormal VARCHAR(MAX) = NULL,
    @referidoPor VARCHAR(MAX) = NULL,
    @antecedentesFamiliaresUV VARCHAR(MAX) = NULL,
    @expectativaLaboral VARCHAR(MAX) = NULL,
    @experienciaRelacionada VARCHAR(MAX) = NULL,
    @experiencia VARCHAR(MAX) = NULL,
    @conclusiones VARCHAR(MAX) = NULL,
    @resultado VARCHAR(MAX) = NULL,
    @efectoContratacion VARCHAR(MAX) = NULL,
    @competenciaReforzar VARCHAR(MAX) = NULL,
    @competenciaDesarrollar VARCHAR(MAX) = NULL,
    @FKIdClasificacionCedula INT = NULL,
    @FKIdResultado INT = NULL,
    @motivoCedulaInterna VARCHAR(MAX) = NULL,
    @motivoCedulaResultados VARCHAR(MAX) = NULL,
	@competenciasSobresaliente VARCHAR(MAX) = NULL,
	@descripcionDesarrollar VARCHAR(MAX) = NULL,
	@descripcionReforzar VARCHAR(MAX) = NULL,
    @puesto VARCHAR(MAX) = NULL,
	@plaza VARCHAR(MAX) = NULL,
	@oficioAutorizacionDeOcupacion VARCHAR(MAX) = NULL,
	@evaluacionConocimientos VARCHAR(MAX) = NULL,
	@aprobadoJefeOficina  BIT = NULL,
	@aprobadoDireccion BIT = NULL,
	@archivoAdjunto BIT = NULL,
    @estado BIT = 0
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @existingId INT;
        -- Buscar si ya existe una cédula con ese proceso y tipo
        SELECT TOP 1 @existingId = idCedula
        FROM [dbo].[Cedula]
        WHERE FKIdProceso = @FKIdProceso
          AND FKIdTipoCedula = @FKIdTipoCedula;

        IF @existingId IS NOT NULL
        BEGIN
            -- UPDATE si ya existe
            UPDATE [dbo].[Cedula]
            SET 
                fechaCedulaInterna = @fechaCedulaInterna,
                fechaCedulaResultados = @fechaCedulaResultados,
                edad = @edad,
                educacionFormal = @educacionFormal,
                referidoPor = @referidoPor,
                antecedentesFamiliaresUV = @antecedentesFamiliaresUV,
                expectativaLaboral = @expectativaLaboral,
                experienciaRelacionada = @experienciaRelacionada,
                experiencia = @experiencia,
                conclusiones = @conclusiones,
                resultado = @resultado,
                efectoContratacion = @efectoContratacion,
                competenciaReforzar = @competenciaReforzar,
                competenciaDesarrollar = @competenciaDesarrollar,
                FKIdClasificacionCedula = @FKIdClasificacionCedula,
                FKIdResultado = @FKIdResultado,
                motivoCedulaInterna = @motivoCedulaInterna,
                motivoCedulaResultados = @motivoCedulaResultados,
				competenciasSobresaliente = @competenciasSobresaliente,
				descripcionDesarrollar = @descripcionDesarrollar,
				descripcionReforzar = @descripcionReforzar,
                puesto = @puesto,
				plaza = @plaza,
				oficioAutorizacionDeOcupacion = @oficioAutorizacionDeOcupacion,
				evaluacionConocimientos = @evaluacionConocimientos,
				aprobadoJefeOficina = @aprobadoJefeOficina,
				aprobadoDireccion = @aprobadoDireccion,
				archivoAdjunto = @archivoAdjunto,
                estado = @estado
            WHERE idCedula = @existingId;
            -- Devuelvo el id actualizado
            SELECT @existingId AS idCedula;
        END
        ELSE
        BEGIN
            -- INSERT si no existe
            INSERT INTO [dbo].[Cedula] (
                FKIdTipoCedula,
                FKIdProceso,
                fechaCedulaInterna,
                fechaCedulaResultados,
                edad,
                educacionFormal,
                referidoPor,
                antecedentesFamiliaresUV,
                expectativaLaboral,
                experienciaRelacionada,
                experiencia,
                conclusiones,
                resultado,
                efectoContratacion,
                competenciaReforzar,
                competenciaDesarrollar,
                FKIdClasificacionCedula,
                FKIdResultado,
                motivoCedulaInterna,
                motivoCedulaResultados,
				competenciasSobresaliente,
				descripcionDesarrollar,
				descripcionReforzar,
                puesto,
				plaza, 
				oficioAutorizacionDeOcupacion,
				evaluacionConocimientos,
				aprobadoJefeOficina,
				aprobadoDireccion,
				archivoAdjunto,
                estado
            )
            VALUES (
                @FKIdTipoCedula,
                @FKIdProceso,
                @fechaCedulaInterna,
                @fechaCedulaResultados,
                @edad,
                @educacionFormal,
                @referidoPor,
                @antecedentesFamiliaresUV,
                @expectativaLaboral,
                @experienciaRelacionada,
                @experiencia,
                @conclusiones,
                @resultado,
                @efectoContratacion,
                @competenciaReforzar,
                @competenciaDesarrollar,
                @FKIdClasificacionCedula,
                @FKIdResultado,
                @motivoCedulaInterna,
                @motivoCedulaResultados,
				@competenciasSobresaliente,
				@descripcionDesarrollar,
				@descripcionReforzar,
                @puesto,
				@plaza, 
				@oficioAutorizacionDeOcupacion,
				@evaluacionConocimientos,
				@aprobadoJefeOficina,
				@aprobadoDireccion,
				@archivoAdjunto,
                @estado
            );
            DECLARE @newId INT = SCOPE_IDENTITY();
            SELECT @newId AS idCedula;
        END
    END TRY
    BEGIN CATCH        
        SELECT ERROR_MESSAGE() AS idCedula;
        DECLARE @msg VARCHAR(MAX) = 'sp_RegistrarCedula ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 42 ---------------------------------------------------------------------
Create PROCEDURE [dbo].[sp_RegistrarControlVersion]
    @FKIdProceso INT,
    @nombreCompleto VARCHAR(MAX),
    @jsonDatos VARCHAR(MAX)
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @fechaActual DATETIME = GETDATE();
        INSERT INTO [dbo].[ControlVersion] (
            FKIdProceso,
            nombreCompleto,
            jsonDatos,
            fechaModificacion
        )
        VALUES (
            @FKIdProceso,
            @nombreCompleto,
            @jsonDatos,
            @fechaActual
        );
        -- Retornar el ID recién insertado
        SELECT SCOPE_IDENTITY() AS idControlVersion;
    END TRY
    BEGIN CATCH
        -- En caso de error, devolver -1
        SELECT CAST(-1 AS INT) AS idControlVersion; 
        DECLARE @msg VARCHAR(MAX) = 'sp_RegistrarControlVersion ERROR: ' + ERROR_MESSAGE() + 
        ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
        ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END
GO

-- Procedure - 43 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_RegistrarProcesoContratacion]
    @folio                          VARCHAR(MAX),
    @numPlaza                       varchar(MAX)= NULL,
    @fechaRecibido                  VARCHAR(MAX) = NULL,
    @fechaEntrevista                VARCHAR(MAX) = NULL,
    @resultadoEvaluacionConocimiento VARCHAR(MAX) = NULL,
    @fechaEnvioDEyDP                VARCHAR(MAX) = NULL,
    @fechaNotificacion              VARCHAR(MAX) = NULL,
    @categoriaPuestoOrigen          VARCHAR(MAX) = NULL,
    @diasProceso                    VARCHAR(MAX) = NULL,
    @beneficiado                    BIT = NULL,
    @FKIdTipoProceso                INT = NULL,
    @FKIdTipoPersonal               INT = NULL,
    @FKIdEstadoProcesoContratacion  INT = NULL,
    @FKIdTemporalDefinitiva         INT = NULL,
    @FKIdDependencia                INT = NULL,
    @hermesNotificacion             VARCHAR(MAX) = NULL,
    @titularPlaza                   VARCHAR(MAX) = NULL,
    @lineamientoOficioContinuidad   VARCHAR(MAX) = NULL,
    @motivo                         VARCHAR(MAX) = NULL,
    @fechaElaboracionPropuesta      VARCHAR(MAX) = NULL,
    @fechaLiberacionOficio          VARCHAR(MAX) = NULL,
    @periodoAutorizadoOficioInicio  VARCHAR(MAX) = NULL,
    @periodoAutorizadoOficioFin     VARCHAR(MAX) = NULL,
    @categoriaAutorizadaOficio      VARCHAR(MAX) = NULL,
    @observaciones                  VARCHAR(MAX) = NULL,
    @numCarpeta                     VARCHAR(MAX) = NULL,    
    @nombreCandidato                VARCHAR(MAX) = NULL,
    @funcionDesempeniar             VARCHAR(MAX) = NULL,
    @familiaFuncional               VARCHAR(MAX) = NULL,
    @fechaEvaluacionCompetencias    VARCHAR(MAX) = NULL,
    @fechaInicioProcesamiento       VARCHAR(MAX) = NULL,
    @resultadoEvaluacionCompetencias VARCHAR(MAX) = NULL,
    @experienciaLaboralSolicitada   VARCHAR(MAX) = NULL,
    @resultadoReferenciasLaborales  VARCHAR(MAX) = NULL,
    @fechaEnvioEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @fechaEntregaEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @resultadoEvaluacionDesempenio  VARCHAR(MAX) = NULL,
    @resultadoHabilidadesWord       VARCHAR(MAX) = NULL,
    @resultadoHabilidadesExcel      VARCHAR(MAX) = NULL,
    @resultadoOrtografia            VARCHAR(MAX) = NULL,
    @resultadoProcesoEvaluacion     VARCHAR(MAX) = NULL,
    @fechaRevisionOfiEval           VARCHAR(MAX) = NULL,
    @observacionesAnalista          VARCHAR(MAX) = NULL,
    @consecutivoExpediente          VARCHAR(MAX) = NULL,
    @seguimientoEvaluacionDesempenio BIT = NULL,
    @fechaEvaluacionDesempenio      VARCHAR(MAX) = NULL,
    @resultadoSeguimientoEvaluacionDesempenio VARCHAR(MAX) = NULL,
    @FKIdAcceso                     INT = NULL,
	@autorizacion BIT = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @newId INT;        
        INSERT INTO ProcesoContratacion (
            folio,
            numPlaza,
            fechaRecibido,
            fechaEntrevista,
            resultadoEvaluacionConocimiento,
            fechaEnvioDEyDP,
            fechaNotificacion,
            categoriaPuestoOrigen,
            diasProceso,
            beneficiado,
            FKIdTipoProceso,
            FKIdTipoPersonal,
            FKIdEstadoProcesoContratacion,
            FKIdTemporalDefinitiva,
            FKIdDependencia,
            hermesNotificacion,
            titularPlaza,
            lineamientoOficioContinuidad,
            motivo,
            fechaElaboracionPropuesta,
            fechaLiberacionOficio,
            periodoAutorizadoOficioInicio,
            periodoAutorizadoOficioFin,
            categoriaAutorizadaOficio,
            observaciones,
            numCarpeta,        
            nombreCandidato,
            funcionDesempeniar,
            familiaFuncional,
            fechaEvaluacionCompetencias,
            fechaInicioProcesamiento,
            resultadoEvaluacionCompetencias,
            experienciaLaboralSolicitada,
            resultadoReferenciasLaborales,
            fechaEnvioEvaluacionDesempenio,
            fechaEntregaEvaluacionDesempenio,
            resultadoEvaluacionDesempenio,
            resultadoHabilidadesWord,
            resultadoHabilidadesExcel,
            resultadoOrtografia,
            resultadoProcesoEvaluacion,
            fechaRevisionOfiEval,
            observacionesAnalista,
            consecutivoExpediente,
            seguimientoEvaluacionDesempenio,
            fechaEvaluacionDesempenio,
            resultadoSeguimientoEvaluacionDesempenio,
            FKIdAcceso,
			autorizacion
        )
        VALUES (
            @folio,
            @numPlaza,
            @fechaRecibido,
            @fechaEntrevista,
            @resultadoEvaluacionConocimiento,
            @fechaEnvioDEyDP,
            @fechaNotificacion,
            @categoriaPuestoOrigen,
            @diasProceso,
            @beneficiado,
            @FKIdTipoProceso,
            @FKIdTipoPersonal,
            @FKIdEstadoProcesoContratacion,
            @FKIdTemporalDefinitiva,
            @FKIdDependencia,
            @hermesNotificacion,
            @titularPlaza,
            @lineamientoOficioContinuidad,
            @motivo,
            @fechaElaboracionPropuesta,
            @fechaLiberacionOficio,
            @periodoAutorizadoOficioInicio,
            @periodoAutorizadoOficioFin,
            @categoriaAutorizadaOficio,
            @observaciones,
            @numCarpeta,        
            @nombreCandidato,
            @funcionDesempeniar,
            @familiaFuncional,
            @fechaEvaluacionCompetencias,
            @fechaInicioProcesamiento,
            @resultadoEvaluacionCompetencias,
            @experienciaLaboralSolicitada,
            @resultadoReferenciasLaborales,
            @fechaEnvioEvaluacionDesempenio,
            @fechaEntregaEvaluacionDesempenio,
            @resultadoEvaluacionDesempenio,
            @resultadoHabilidadesWord,
            @resultadoHabilidadesExcel,
            @resultadoOrtografia,
            @resultadoProcesoEvaluacion,
            @fechaRevisionOfiEval,
            @observacionesAnalista,
            @consecutivoExpediente,
            @seguimientoEvaluacionDesempenio,
            @fechaEvaluacionDesempenio,
            @resultadoSeguimientoEvaluacionDesempenio,
            @FKIdAcceso,
			@autorizacion
        );
        SET @newId = CAST(SCOPE_IDENTITY() AS INT);        
        SELECT @newId AS idProceso;
    END TRY
    BEGIN CATCH        
        SELECT CAST(-1 AS INT) AS idProceso;
        DECLARE @msg VARCHAR(MAX) = 
            'sp_RegistrarProcesoContratacion ERROR: ' + ERROR_MESSAGE() + 
            ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
            ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);  
        RAISERROR(@msg, 16, 1) WITH LOG; 
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 44 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_RegistrarResultado]
    @FKIdCedula INT,
    @psicometriaComunicacion VARCHAR(MAX) = NULL,
    @psicometriaTrabajoEnEquipo VARCHAR(MAX) = NULL,
    @psicometriaOrientacionAlServicio VARCHAR(MAX) = NULL,
    @psicometriaSensibilidadALineamientos VARCHAR(MAX) = NULL,
    @psicometriaPlaneacionOrganizacion VARCHAR(MAX) = NULL,
    @psicometriaAnalisisProblemas VARCHAR(MAX) = NULL,
    @psicometriaEnfoqueResultados VARCHAR(MAX) = NULL,
    @psicometriaControlActividades VARCHAR(MAX) = NULL,
    @psicometriaEnfoqueCalidad VARCHAR(MAX) = NULL,
    @psicometriaRelacionesInterpersonales VARCHAR(MAX) = NULL,
    @psicometriaLiderazgo VARCHAR(MAX) = NULL,
    @psicometriaTomaDecisiones VARCHAR(MAX) = NULL,
    @psicometriaDinamismo VARCHAR(MAX) = NULL,
    @psicometriaInnovacion VARCHAR(MAX) = NULL,
    @psicometriaPensamientoEstrategico VARCHAR(MAX) = NULL,
    @psicometriaNegociacion VARCHAR(MAX) = NULL,
    @resultadoPorcentaje VARCHAR(MAX) = NULL
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        DECLARE @idExistente INT;
        -- Verificar si ya existe un resultado para la cédula
        SELECT @idExistente = idResultado
        FROM dbo.Resultado
        WHERE FKIdCedula = @FKIdCedula;
        IF @idExistente IS NOT NULL
        BEGIN
            -- Primero, poner en NULL todos los campos psicométricos
            UPDATE dbo.Resultado
            SET
                psicometriaComunicacion = NULL,
                psicometriaTrabajoEnEquipo = NULL,
                psicometriaOrientacionAlServicio = NULL,
                psicometriaSensibilidadALineamientos = NULL,
                psicometriaPlaneacionOrganizacion = NULL,
                psicometriaAnalisisProblemas = NULL,
                psicometriaEnfoqueResultados = NULL,
                psicometriaControlActividades = NULL,
                psicometriaEnfoqueCalidad = NULL,
                psicometriaRelacionesInterpersonales = NULL,
                psicometriaLiderazgo = NULL,
                psicometriaTomaDecisiones = NULL,
                psicometriaDinamismo = NULL,
                psicometriaInnovacion = NULL,
                psicometriaPensamientoEstrategico = NULL,
                psicometriaNegociacion = NULL,
				resultadoPorcentaje = NULL
            WHERE FKIdCedula = @FKIdCedula;

            -- Luego actualizar con los nuevos valores
            UPDATE dbo.Resultado
            SET
                psicometriaComunicacion = @psicometriaComunicacion,
                psicometriaTrabajoEnEquipo = @psicometriaTrabajoEnEquipo,
                psicometriaOrientacionAlServicio = @psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos = @psicometriaSensibilidadALineamientos,
                psicometriaPlaneacionOrganizacion = @psicometriaPlaneacionOrganizacion,
                psicometriaAnalisisProblemas = @psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados = @psicometriaEnfoqueResultados,
                psicometriaControlActividades = @psicometriaControlActividades,
                psicometriaEnfoqueCalidad = @psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales = @psicometriaRelacionesInterpersonales,
                psicometriaLiderazgo = @psicometriaLiderazgo,
                psicometriaTomaDecisiones = @psicometriaTomaDecisiones,
                psicometriaDinamismo = @psicometriaDinamismo,
                psicometriaInnovacion = @psicometriaInnovacion,
                psicometriaPensamientoEstrategico = @psicometriaPensamientoEstrategico,
                psicometriaNegociacion = @psicometriaNegociacion,
				resultadoPorcentaje = @resultadoPorcentaje
            WHERE FKIdCedula = @FKIdCedula;
            SELECT @idExistente AS idResultado;
        END
        ELSE
        BEGIN
            -- Si no existe, inserta nuevo registro
            INSERT INTO dbo.Resultado (
                FKIdCedula,
                psicometriaComunicacion,
                psicometriaTrabajoEnEquipo,
                psicometriaOrientacionAlServicio,
                psicometriaSensibilidadALineamientos,
                psicometriaPlaneacionOrganizacion,
                psicometriaAnalisisProblemas,
                psicometriaEnfoqueResultados,
                psicometriaControlActividades,
                psicometriaEnfoqueCalidad,
                psicometriaRelacionesInterpersonales,
                psicometriaLiderazgo,
                psicometriaTomaDecisiones,
                psicometriaDinamismo,
                psicometriaInnovacion,
                psicometriaPensamientoEstrategico,
                psicometriaNegociacion,
				resultadoPorcentaje
            )
            VALUES (
                @FKIdCedula,
                @psicometriaComunicacion,
                @psicometriaTrabajoEnEquipo,
                @psicometriaOrientacionAlServicio,
                @psicometriaSensibilidadALineamientos,
                @psicometriaPlaneacionOrganizacion,
                @psicometriaAnalisisProblemas,
                @psicometriaEnfoqueResultados,
                @psicometriaControlActividades,
                @psicometriaEnfoqueCalidad,
                @psicometriaRelacionesInterpersonales,
                @psicometriaLiderazgo,
                @psicometriaTomaDecisiones,
                @psicometriaDinamismo,
                @psicometriaInnovacion,
                @psicometriaPensamientoEstrategico,
                @psicometriaNegociacion,
				@resultadoPorcentaje
            );
            SELECT CAST(SCOPE_IDENTITY() AS INT) AS idResultado;
        END
    END TRY
    BEGIN CATCH
        SELECT CAST(-1 AS INT) AS idResultado;
        DECLARE @msg VARCHAR(MAX) = 'sp_RegistrarResultado ERROR: ' + ERROR_MESSAGE() + 
        ' | Línea: ' + CAST(ERROR_LINE() AS VARCHAR) +
        ' | Número: ' + CAST(ERROR_NUMBER() AS VARCHAR);
        RAISERROR(@msg, 16, 1) WITH LOG;  
        SELECT CAST(-1 AS INT) AS idProceso, @msg AS errorMensaje;
    END CATCH
END;
GO

-- Procedure - 45 ---------------------------------------------------------------------
CREATE PROCEDURE [dbo].[sp_UpsertSeguimientoHermes]
    @Registros dbo.TVP_SeguimientoHermes READONLY
WITH EXECUTE AS OWNER
AS
BEGIN
    SET NOCOUNT ON;
    MERGE SeguimientoHermes AS target
    USING @Registros AS source
        ON target.folio = source.folio
    WHEN MATCHED THEN
        UPDATE SET
            target.fechaRecepcion     = source.fechaRecepcion,
            target.importancia        = source.importancia,
            target.tipoEnvio          = source.tipoEnvio,
            target.requiereRespuesta  = source.requiereRespuesta,
            target.solicita           = source.solicita,
            target.entidadDependencia = source.entidadDependencia,
            target.asunto             = source.asunto,
            target.estatus            = source.estatus,
            target.acciones           = source.acciones
    WHEN NOT MATCHED THEN
        INSERT (
            folio,
            fechaRecepcion,
            importancia,
            tipoEnvio,
            requiereRespuesta,
            solicita,
            entidadDependencia,
            asunto,
            estatus,
            acciones,
            estadoArchivado
        )
        VALUES (
            source.folio,
            source.fechaRecepcion,
            source.importancia,
            source.tipoEnvio,
            source.requiereRespuesta,
            source.solicita,
            source.entidadDependencia,
            source.asunto,
            source.estatus,
            source.acciones,
            0
        );
END;
GO