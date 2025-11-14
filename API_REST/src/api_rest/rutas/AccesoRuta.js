/**
 * @swagger
 * tags:
 *   name: Acceso
 *   description: Operaciones relacionadas con el acceso y autenticación de usuarios
 */

/**
 * @swagger
 * /rysuv/acceso/login:
 *   post:
 *     summary: Iniciar sesión en el sistema
 *     tags: [Acceso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: Administrador
 *               contrasenia:
 *                 type: string
 *                 example: ebc2fd5163d9bd7e9a3dc8d13262cabb7ab5776bd5e6189b1fd8a6eaacdffd6d
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente (retorna un JWT)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: false
 *                 estado: 200
 *                 mensaje:
 *                   resultado: 200
 *                   mensaje: "Login exitoso"
 *                 usuario:
 *                   Resultado: 0
 *                   idAcceso: 1
 *                   usuario: "Administrador"
 *                   FKidTipoAcceso: 1
 *                   nombre: "Administrador"
 *                   primerApellido: "Administrador"
 *                   segundoApellido: null
 *                   estado: true
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTc2MzEzMzYxOCwiZXhwIjoxNzYzMTc2ODE4fQ.WRB0goQT7iO_0I2UVEjeX33nVfb2xM2vGFh0FVItfP0"
 *       404:
 *         description: Credenciales inválidas
 *       401:
 *         description: Usuario inactivo
 *       400:
 *         description: Datos con formato inválido
 */


/**
 * @swagger
 * /rysuv/acceso/:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: nuevoUsuario
 *               contrasenia:
 *                 type: string
 *                 example: ebc2fd5163d9bd7e9a3dc8d13262cabb7ab5776bd5e6189b1fd8a6eaacdffd6d
 *               FKIdTipoAcceso:
 *                 type: int
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: Dylan
 *               primerApellido: 
 *                  type: string
 *                  example: Platas
 *               segundoApellido:
 *                  type: string
 *                  example: Huescas
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Usuario duplicado en el sistema
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error de base de datos
 */

/**
 * @swagger
 * /rysuv/acceso/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios registrados
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: false
 *                 estado: 200
 *                 usuarios:
 *                   - idAcceso: 1
 *                     usuario: "Administrador"
 *                     contrasenia: "ebc2fd5163d9bd7e9a3dc8d13262cabb7ab5776bd5e6189b1fd8a6eaacdffd6d"
 *                     FKIdTipoAcceso: 1
 *                     nombre: "Administrador"
 *                     primerApellido: "Administrador"
 *                     segundoApellido: null
 *                     estado: true
 *                   - idAcceso: 2
 *                     usuario: "Guadalupe"
 *                     contrasenia: "70e1c95500b2ea352f4756f7114e8254b57ebe80a0b036e9d9d964a673b45654"
 *                     FKIdTipoAcceso: 4
 *                     nombre: "María Guadalupe"
 *                     primerApellido: "Vázquez"
 *                     segundoApellido: "Castillo"
 *                     estado: true
 *       400:
 *         description: Usuarios no encontrados
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error de base de datos.
 */



/**
 * @swagger
 * /rysuv/acceso/tiposAcceso:
 *   get:
 *     summary: Obtener los tipos de acceso disponibles
 *     tags: [Acceso]
 *     description: Devuelve una lista con los diferentes tipos de acceso disponibles en el sistema.
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTipoAcceso:
 *                     type: integer
 *                   tipo:
 *                     type: string
 *             example:
 *               - idTipoAcceso: 1
 *                 tipo: "Administrador"
 *               - idTipoAcceso: 2
 *                 tipo: "Analista"
 *               - idTipoAcceso: 3
 *                 tipo: "Gestor de solicitudes"
 *               - idTipoAcceso: 4
 *                 tipo: "Jefe de departamento"
 *       400:
 *         description: Tipos de acceso no encontrados.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       500:
 *         description: Error de servidor o base de datos.
 */

/**
 * @swagger
 * /rysuv/acceso/analistas:
 *   get:
 *     summary: Obtener todos los analistas activos
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista de los usuarios con rol de analista registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de analistas obtenida correctamente.
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
 *                 usuarios:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idAcceso:
 *                         type: integer
 *                         example: 4
 *                       usuario:
 *                         type: string
 *                         example: "Karla"
 *                       contrasenia:
 *                         type: string
 *                         example: "e1fc49b97643dae44cacdda1f604006c9c0f98b0b6f3bf37c83e0bc5f306f4f9"
 *                       FKIdTipoAcceso:
 *                         type: integer
 *                         example: 2
 *                       nombre:
 *                         type: string
 *                         example: "Karla"
 *                       primerApellido:
 *                         type: string
 *                         example: "Saldaña"
 *                       segundoApellido:
 *                         type: string
 *                         example: "Ríos"
 *                       estado:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Error en la base de datos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Datos con formato inválido
 */


/**
 * @swagger
 * /rysuv/acceso/usuario/{usuario}:
 *   get:
 *     summary: Buscar usuario por nombre de usuario
 *     tags: [Acceso]
 *     parameters:
 *       - in: path
 *         name: usuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 error: false
 *                 estado: 200
 *                 usuario:
 *                   - idAcceso: 5
 *                     usuario: "Fernanda"
 *                     contrasenia: "1607bbe6f3b6a147523e4f3f0dc2d464e7d58a02d1f18c7ed1f726cd11084b75"
 *                     FKidTipoAcceso: 2
 *                     nombre: "María Fernanda"
 *                     primerApellido: "Gómez"
 *                     segundoApellido: "Cuevas"
 *                     estado: true
 *       400:
 *         description: Datos con formato inválido
 *       401:
 *         description: Token inválido o no proporcionado.
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error de base de datos
 */


/**
 * @swagger
 * /rysuv/acceso/usuario/{idAcceso}:
 *   put:
 *     summary: Desactivar usuario por ID
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     description: Desactiva el acceso de un usuario mediante su ID.
 *     parameters:
 *       - in: path
 *         name: idAcceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a desactivar.
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente.
 *       400:
 *         description: Datos con formato inválido
 *       401:
 *         description: Token inválido o no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /rysuv/acceso/{idAcceso}:
 *   put:
 *     summary: Editar datos de un acceso
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     description: Permite modificar los datos de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: idAcceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a editar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "Miguel"
 *               contrasenia:
 *                 type: string
 *                 example: "e1fc49b97643dae44cacdda1f604006c9c0f98b0b6f3bf37c83e0bc5f306f4f9"
 *               FKIdTipoAcceso:
 *                 type: integer
 *                 example: 2
 *               nombre: 
 *                 type: string
 *                 example: "Mike"
 *               primerApellido:
 *                 type: string
 *                 example: "Casas"
 *               segundoApellido:
 *                 type: string
 *                 example: "Vasquez"
 *               estado:
 *                 type: integer
 *                 example: 1
 *               
 *     responses:
 *       200:
 *         description: Usuario editado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token inválido o no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /rysuv/acceso/{idAcceso}:
 *   get:
 *     summary: Buscar usuario por ID
 *     tags: [Acceso]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna los datos de un usuario específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: idAcceso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a consultar.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idAcceso:
 *                   type: integer
 *                   example: 7
 *                 usuario:
 *                   type: string
 *                   example: "Guadalupe"
 *                 nombre:
 *                   type: string
 *                   example: "María Guadalupe"                 
 *                 primerApellido:
 *                   type: string
 *                   example: "Vázquez"
 *                 segundoApellido:
 *                   type: string 
 *                   example: "Castillo"
 *                 estado:
 *                   type: boolean
 *                   example: true
 *                 FKIdTipoAcceso:
 *                   type: integer
 *                   example: 4
 *                 
 *       401:
 *         description: Token inválido o no autorizado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

import { Router } from "express";
import { AccesoControlador } from "../controladores/AccesoControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaAcceso = ({ModeloAcceso}) =>
{
    const AccesoEnrutador = Router();
    const ControladorAccesoEnrutador = new AccesoControlador({ModeloAcceso});    
    AccesoEnrutador.post('/login',ControladorAccesoEnrutador.RealizarLogin);
    AccesoEnrutador.post('/',ValidarJwt,ControladorAccesoEnrutador.RegistrarAcceso);
    AccesoEnrutador.get('/usuarios',ValidarJwt,ControladorAccesoEnrutador.ObtenerUsuarios);
    AccesoEnrutador.get('/tiposAcceso',ControladorAccesoEnrutador.ObtenerTiposDeAccesos);
    AccesoEnrutador.get('/analistas',ValidarJwt,ControladorAccesoEnrutador.ObtenerTodosAnalistas);
    AccesoEnrutador.get('/usuario/:usuario',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorNombreDeUsuario);
    AccesoEnrutador.put('/usuario/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.DesactivarUsuarioPorId);
    AccesoEnrutador.put('/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.EditarAcceso);
    AccesoEnrutador.get('/:idAcceso',ValidarJwt,ControladorAccesoEnrutador.BuscarUsuarioPorId);
    return AccesoEnrutador;
}