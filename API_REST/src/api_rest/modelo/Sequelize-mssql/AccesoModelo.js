import {obtenerConexion} from './config/config.js'
import bcrypt from 'bcrypt'
import { MensajesAcceso, MensajeGeneralesBD } from '../../utilidades/Constantes.js';
import { QueryTypes } from 'sequelize';
import {Cifrar, Descifrar} from '../../utilidades/Cifrado.js';

export class ModeloAcceso {
    static async InsertarNuevaCuenta({datos, bitacoraFn, tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        const { usuario, contrasenia, FKIdTipoAcceso, nombre, primerApellido, segundoApellido
        } = datos;
        const contraseniaCifrada = await bcrypt.hash(contrasenia, parseInt(process.env.CONFIGURATION_JUMPS));
        const nombreCifrado = Cifrar(nombre);
        const primerApellidoCifrado = Cifrar(primerApellido);
        const segundoApellidoCifrado = Cifrar(segundoApellido);
        let transaction;
        let resultadoInsercion;
        try {
            transaction = await sequelize.transaction();
            const resultado = await sequelize.query(
                `DECLARE @idAcceso INT;
                EXEC sp_RegistrarAcceso 
                @usuario        = :usuario,
                @contrasenia    = :contraseniaCifrada,
                @FKidTipoAcceso = :FKIdTipoAcceso,
                @nombre         = :nombreCifrado,
                @primerApellido = :primerApellidoCifrado,
                @segundoApellido = :segundoApellidoCifrado,
                @idAcceso       = @idAcceso OUTPUT;
                SELECT @idAcceso AS idAcceso;`,
                {
                    replacements: {
                        usuario,
                        contraseniaCifrada,
                        FKIdTipoAcceso,
                        nombreCifrado,
                        primerApellidoCifrado,
                        segundoApellidoCifrado
                    },
                    type: QueryTypes.RAW,
                    transaction
                }
            );
            const idAcceso = resultado[0]?.[0]?.idAcceso;
            if (idAcceso === -1) {
                await transaction.rollback();
                resultadoInsercion = MensajeGeneralesBD.ERROR_DB;
            } else if (idAcceso === -2){
                await transaction.rollback();
                resultadoInsercion = MensajesAcceso.USUARIO_DUPLICADO;
            } else {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha insertado una nueva cuenta con el usuario: ${usuario}`)
                }
                await transaction.commit();
                resultadoInsercion = MensajesAcceso.REGISTRO_EXITOSO;
            }
        }catch(error){
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoInsercion;
    }

    static async EditarAcceso({datos, bitacoraFn, tipoDeAcceso}){
        const sequelize = obtenerConexion(tipoDeAcceso)
        const {idAcceso,usuario,contrasenia,FKIdTipoAcceso,nombre,primerApellido,segundoApellido,estado} = datos;
        const contraseniaCifrada = await bcrypt.hash(contrasenia, parseInt(process.env.CONFIGURATION_JUMPS));
        const nombreCifrado =  Cifrar(nombre);
        const primerApellidoCifrado = Cifrar(primerApellido);
        const segundoApellidoCifrado = Cifrar(segundoApellido);
        let transaction;
        let resultadoModificacion;
        try{
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `DECLARE @resultado INT; 
                EXEC sp_ActualizarAcceso
                @idAcceso = :idAcceso,
                @usuario = :usuario,
                @contrasenia = :contraseniaCifrada,
                @FKIdTipoAcceso = :FKIdTipoAcceso,
                @nombre = :nombreCifrado,
                @primerApellido = :primerApellidoCifrado,
                @segundoApellido = :segundoApellidoCifrado,
                @estado = :estado,
                @resultado = @resultado OUTPUT;
                SELECT @resultado AS resultado;`,
                {
                    replacements: {
                        idAcceso,
                        usuario,
                        contraseniaCifrada,
                        FKIdTipoAcceso,
                        nombreCifrado,
                        primerApellidoCifrado,
                        segundoApellidoCifrado,
                        estado
                    },
                    type: QueryTypes.RAW,
                    transaction
                }
            );
            const resultado = resultadoProcedimiento[0]?.[0]?.resultado;
            if (resultado === -1) {
                await transaction.rollback();
                resultadoModificacion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };                
            } else if (resultado === -2){
                await transaction.rollback();
                resultadoModificacion = { estado: 409, mensaje: MensajesAcceso.USUARIO_DUPLICADO };
            } else if(resultado === 1) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha editado el usuario con id: ${idAcceso}`)
                }
                await transaction.commit();
                resultadoModificacion = { estado: 200, mensaje: MensajesAcceso.ACTUALIZACION_EXITOSA };
            } else {
                await transaction.rollback();
                resultadoModificacion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };                
            }
        }catch(error){
            if(transaction){
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoModificacion;
    }

    static async BuscarUsuarioPorId({ datos, tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        const { idAcceso } = datos;
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerAccesoPorId 
                    @idAcceso = :idAcceso`,
                {
                    replacements: { idAcceso },
                    type: QueryTypes.RAW
                }
            );
            const ResultadoQueryAcceso = resultadoProcedimiento[0];
            if (ResultadoQueryAcceso.length > 0) {
                const usuario = ResultadoQueryAcceso[0];
                if (usuario.idAcceso > 0) {
                    const {contrasenia: _,...usuarioSinContrasenia} = usuario;
                    const usuarioDescifrado = {
                        ...usuarioSinContrasenia,
                        nombre: Descifrar(usuario.nombre),
                        primerApellido: Descifrar(usuario.primerApellido),
                        segundoApellido: Descifrar(usuario.segundoApellido)
                    }
                    resultadoConsulta = { estado: 200, usuarioEncontrado: usuarioDescifrado };
                } else if (usuario.idAcceso === -1) {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                } else {
                    resultadoConsulta = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async BuscarUsuarioPorNombreUsuario({ datos, tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        const { usuario } = datos;
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerAccesoPorUsuario 
                    @usuario = :usuario`,
                {
                    replacements: { usuario },
                    type: QueryTypes.RAW
                }
            );
            const ResultadoQueryAcceso = resultadoProcedimiento[0];
            if (ResultadoQueryAcceso.length > 0) {
                const usuarioConsultado = ResultadoQueryAcceso[0];
                if (usuarioConsultado.idAcceso > 0) {
                    const {contrasenia: _,...usuarioSinContrasenia} = usuarioConsultado;
                    const usuarioDescifrado = {
                        ...usuarioSinContrasenia,
                        nombre: Descifrar(usuarioConsultado.nombre),
                        primerApellido: Descifrar(usuarioConsultado.primerApellido),
                        segundoApellido: Descifrar(usuarioConsultado.segundoApellido)
                    }
                    resultadoConsulta = { estado: 200, usuarioEncontrado: usuarioDescifrado };
                } else if (usuarioConsultado.idAcceso === -1) {
                    resultadoConsulta = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
                } else {
                    resultadoConsulta = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
                }
            } else {
                resultadoConsulta = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async DesactivarUsuarioPorIdAcceso({ datos, bitacoraFn, tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        const { idAcceso } = datos;
        let resultadoDesactivacion;
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_DesactivarUsuario 
                    @idAcceso = :idAcceso`,
                {
                    replacements: { idAcceso },
                    type: QueryTypes.RAW,
                    transaction
                }
            );
            const ResultadoQuery = resultadoProcedimiento[0]?.[0];
            if (ResultadoQuery.Resultado === 1) {
                if(bitacoraFn){
                    await bitacoraFn(`Se ha desactivado el usuario con id: ${idAcceso}`)
                }
                await transaction.commit();
                resultadoDesactivacion = { estado: 200, mensaje: MensajesAcceso.DESACTIVACION_EXITOSA };
            } else if (ResultadoQuery.Resultado === 0) {
                await transaction.rollback();
                resultadoDesactivacion = { estado: 404, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            } else {
                await transaction.rollback();
                resultadoDesactivacion = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
            }
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw error;
        }
        return resultadoDesactivacion;
    }

    static async LoginAcceso({ datos, bitacoraFn, tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        const { usuario, contrasenia } = datos;
        let resultadoDeLogin;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_LoginAcceso
                    @usuario = :usuario`,
                {
                    replacements: { usuario },
                    type: QueryTypes.RAW
                }
            );
            const ResultadoQuery = resultadoProcedimiento[0]?.[0];
            if (ResultadoQuery.Resultado === 0) {
                const contraseniasCoinciden = await bcrypt.compare(contrasenia,ResultadoQuery.contrasenia);
                if(!contraseniasCoinciden){
                    const {contrasenia: _, ...usuarioSinContrasenia} = ResultadoQuery;
                    const usuarioDescifrado = {
                            ...usuarioSinContrasenia,
                            nombre: Descifrar(usuarioSinContrasenia.nombre),
                            primerApellido: Descifrar(usuarioSinContrasenia.primerApellido),
                            segundoApellido: Descifrar(usuarioSinContrasenia.segundoApellido)
                        }
                    if(bitacoraFn){
                        await bitacoraFn(`Se ha iniciado sesion con el usuario: ${usuario}`,'InicioDeSesion')
                    }      
                    resultadoDeLogin = {estado: 200, Mensaje: MensajesAcceso.LOGIN_EXITOSO, usuario: usuarioDescifrado}
                }else{
                    resultadoDeLogin = {estado: 401, Mensaje: MensajesAcceso.CREDENCIALES_INVALIDAS}
                }
            } else if (ResultadoQuery.Resultado === 1) {
                resultadoDeLogin = { estado: 404, mensaje: MensajesAcceso.CREDENCIALES_INVALIDAS };
            } else if (ResultadoQuery.Resultado === 3) {
                resultadoDeLogin = { estado: 401, mensaje: MensajesAcceso.USUARIO_INACTIVO };
            } else {
                resultadoDeLogin = { estado: 500, mensaje: MensajeGeneralesBD.ERROR_DB };
            }
        } catch (error) {
            throw error;
        }

        return resultadoDeLogin;
    }

    static async ObtenerTodosTiposDeAcceso({tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTodosTiposAcceso`,
                {
                    type: QueryTypes.RAW
                }
            );
            const tiposAcceso = resultadoProcedimiento[0];
            if (tiposAcceso.length > 0) {
                resultadoConsulta = { estado: 200, tiposAcceso };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajesAcceso.TIPOS_ACCESO_PERDIDOS };
            }
        } catch (error) {
            throw error;
        }

        return resultadoConsulta;
    }

    static async ObtenerTodosLosUsuarios({tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC sp_ObtenerTodosAccesos`,
                {
                    type: QueryTypes.RAW
                }
            );
            let usuarios = resultadoProcedimiento[0];
            if (usuarios.length > 0) {
                usuarios = usuarios.map(usuario => {
                    const { contrasenia: _, ...usuarioSinContrasenia } = usuario;
                    return {
                        ...usuarioSinContrasenia,
                        nombre:          Descifrar(usuario.nombre),
                        primerApellido:  Descifrar(usuario.primerApellido),
                        segundoApellido: Descifrar(usuario.segundoApellido)
                    };
                });
                resultadoConsulta = { estado: 200, usuarios };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }

    static async ObtenerTodosLosAnalistas({tipoDeAcceso}) {
        const sequelize = obtenerConexion(tipoDeAcceso)
        let resultadoConsulta;
        try {
            const resultadoProcedimiento = await sequelize.query(
                `EXEC ObtenerAccesosAnalistas`,
                {
                    type: QueryTypes.RAW
                }
            );
            let usuarios = resultadoProcedimiento[0];
            if (usuarios.length > 0) {
                usuarios = usuarios.map(usuario => {
                    const { contrasenia: _, ...usuarioSinContrasenia } = usuario;
                    return {
                        ...usuarioSinContrasenia,
                        nombre:          Descifrar(usuario.nombre),
                        primerApellido:  Descifrar(usuario.primerApellido),
                        segundoApellido: Descifrar(usuario.segundoApellido)
                    };
                });
                resultadoConsulta = { estado: 200, usuarios };
            } else {
                resultadoConsulta = { estado: 400, mensaje: MensajesAcceso.USUARIO_PERDIDO };
            }
        } catch (error) {
            throw error;
        }
        return resultadoConsulta;
    }
}