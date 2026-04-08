USE [SistemaServicioSocial]
GO
-- User - usuarioRYSUV ----------------------------------------------------------------
CREATE LOGIN [usuarioRYSUV] WITH PASSWORD=N'RysuvDylan@jr25', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
CREATE USER [usuarioRYSUV] FOR LOGIN [usuarioRYSUV] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [usuarioRYSUV]
GO

-- User - usuario ---------------------------------------------------------------------
CREATE LOGIN [usuario] WITH PASSWORD=N'QWERTY250822', DEFAULT_DATABASE=[master], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
CREATE USER [usuario] FOR LOGIN [usuario] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [usuario]
GO

-- User - JefeDeDepartamento ----------------------------------------------------------
CREATE LOGIN [JefeDeDepartamento] WITH PASSWORD = 'FDw#I0ggO_zWBGEG', DEFAULT_DATABASE=[SistemaServicioSocial]
GO
CREATE USER [JefeDeDepartamentoUsuario] FOR LOGIN [JefeDeDepartamento]
GO
ALTER ROLE [db_datareader] ADD MEMBER [JefeDeDepartamentoUsuario]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [JefeDeDepartamentoUsuario]
GO

-- User - GestorDeSolicitudes ---------------------------------------------------------
CREATE LOGIN [GestorDeSolicitudes] WITH PASSWORD = 'FDw#I0ggO_zWBGEG', DEFAULT_DATABASE=[SistemaServicioSocial]
GO
CREATE USER [GestorDeSolicitudesUsuario] FOR LOGIN [GestorDeSolicitudes]
GO
ALTER ROLE [db_datareader] ADD MEMBER [GestorDeSolicitudesUsuario]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [GestorDeSolicitudesUsuario]
GO

-- User - Login -----------------------------------------------------------------------
CREATE LOGIN [Login] WITH PASSWORD = 'gJSk.x&$-J&M#.1Y', DEFAULT_DATABASE=[SistemaServicioSocial]
GO
CREATE USER [LoginUsuario] FOR LOGIN [Login]
GO
ALTER ROLE [db_datareader] ADD MEMBER [LoginUsuario]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [LoginUsuario]
GO
GRANT EXECUTE ON OBJECT::[sp_LoginAcceso] TO [LoginUsuario]
GO

-- User - Administrador ---------------------------------------------------------------
CREATE LOGIN [Administrador] WITH PASSWORD = 'gEnN%sZ3$8d.ig#g', DEFAULT_DATABASE=[SistemaServicioSocial]
GO
CREATE USER [AdministradorUsuario] FOR LOGIN [Administrador]
GO
ALTER ROLE [db_datareader] ADD MEMBER [AdministradorUsuario]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [AdministradorUsuario]

-- User - Analista --------------------------------------------------------------------
CREATE LOGIN [Analista] WITH PASSWORD = 'FDw#I0ggO_zWBGEG', DEFAULT_DATABASE=[SistemaServicioSocial]
GO
CREATE USER [AnalistaUsuario] FOR LOGIN [Analista]
GO
ALTER ROLE [db_datareader] ADD MEMBER [AnalistaUsuario]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [AnalistaUsuario]
GO