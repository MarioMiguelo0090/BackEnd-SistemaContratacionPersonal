/**
 * @swagger
 * tags:
 *   name: Catálogo
 *   description: Endpoints relacionados con catálogos del sistema
 */

/**
 * @swagger
 * /rysuv/catalogo/tiposProceso:
 *   get:
 *     summary: Obtener los tipos de proceso
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista con los tipos de proceso de contratación disponibles en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tipos de proceso obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTipoProceso:
 *                      type: integer
 *                   proceso:
 *                      type: string
 *             example:
 *               - idTipoProceso: 1
 *                 proceso: "Asignación"
 *               - idTipoProceso: 2
 *                 proceso: "Requisición"
 *               - idTipoProceso: 3
 *                 proceso: "De bolsa"
 *       500:
 *         description: Error de servidor o base de datos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Procesos no encontrados.
 *
 */

/**
 * @swagger
 * /rysuv/catalogo/tiposPersonal:
 *   get:
 *     summary: Obtener los tipos de personal
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista con los tipos de personal registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tipos de personal obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTipoPersonal:
 *                     type: integer
 *                   personal:
 *                     type: string
 *             example:
 *               - idTipoPersonal: 1
 *                 personal: "Confianza"
 *               - idTipoPersonal: 2
 *                 personal: "Eventual"
 *       500:
 *         description: Error de servidor o base de datos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Tipos de personal no encontrados.
 */

/**
 * @swagger
 * /rysuv/catalogo/estadosProcesoContratacion:
 *   get:
 *     summary: Obtener los estados del proceso de contratación
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve los diferentes estados posibles de un proceso de contratación.
 *     responses:
 *       200:
 *         description: Lista de estados de proceso de contratación obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEstadoProcesoContratacion:
 *                     type: integer
 *                   estado:
 *                     type: string
 *             example:
 *                - idEstadoProcesoContratacion: 1
 *                  estado: "Citado"
 *                - idEstadoProcesoContratacion: 2
 *                  estado: "Evaluado"
 *                - idEstadoProcesoContratacion: 3
 *                  estado: "En procesamiento"
 *                - idEstadoProcesoContratacion: 4
 *                  estado: "En revisión"
 *                - idEstadoProcesoContratacion: 5
 *                  estado: "En firma"
 *                - idEstadoProcesoContratacion: 6
 *                  estado: "Notificado"
 *                - idEstadoProcesoContratacion: 7
 *                  estado: "Cancelado"
 *                - idEstadoProcesoContratacion: 8
 *                  estado: "Terminado"
 *                - idEstadoProcesoContratacion: 9
 *                  estado: "Solicitud pendiente"
 *                - idEstadoProcesoContratacion: 10
 *                  estado: "Solicitud entregado"
 *                - idEstadoProcesoContratacion: 11
 *                  estado: "Solicitud notificado"
 *                - idEstadoProcesoContratacion: 12
 *                  estado: "Evaluacion"
 *       500:
 *         description: Error al obtener los estados del proceso.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/catalogo/temporalDefinitiva:
 *   get:
 *     summary: Obtener tipos de contratación (Temporal o Definitiva)
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve las opciones de contratación, indicando si es temporal o definitiva.
 *     responses:
 *       200:
 *         description: Lista de tipos de contratación obtenida correctamente.
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
 *                 temporalDefinitiva:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idTemporalDefinitiva:
 *                         type: integer
 *                       descripcion:
 *                         type: string
 *             example:
 *               error: false
 *               estado: 200
 *               temporalDefinitiva:
 *                 - idTemporalDefinitiva: 1
 *                   descripcion: "Temporal"
 *                 - idTemporalDefinitiva: 2
 *                   descripcion: "Definitiva"
 *       500:
 *         description: Error de servidor o de base de datos.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/catalogo/tiposCedula:
 *   get:
 *     summary: Obtener los tipos de cédula
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve los diferentes tipos de cédula registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de tipos de cédula obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idTipoCedula:
 *                     type: integer
 *                   cedula:
 *                     type: string
 *             example:
 *               estado : 200
 *               tiposCedula:
 *                - idTipoCedula: 1
 *                  cedula: "Interna"
 *                - idTipoCedula: 2
 *                  cedula: "Resultados"
 *                - idTipoCedula: 3
 *                  cedula: "De bolsa"
 *       500:
 *         description: Error al obtener los tipos de cédula.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/catalogo/dependencias:
 *   get:
 *     summary: Obtener dependencias
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve una lista de las dependencias disponibles.
 *     responses:
 *       200:
 *         description: Lista de dependencias obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idDependencia:
 *                     type: integer
 *                   numDependencia:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   area:
 *                     type: string
 *                   zona:
 *                     type: string
 *                   subzona:
 *                     type: string
 *                   areaOrganizacional:
 *                     type: string
 *
 *             example:
 *               dependencias:
 *                 - idDependencia: 1
 *                   numDependencia: "11101"
 *                   nombre: "Unidad Académica de Ingeniería y Ciencias Químicas"
 *                   area: "Técnica"
 *                   zona: "Xalapa"
 *                   subzona: "Xalapa"
 *                   areaOrganizacional: "Secretaría Académica"
 *                 - idDependencia: 2
 *                   numDependencia: "11102"
 *                   nombre: "Facultad de Ingeniería Civil"
 *                   area: "Técnica"
 *                   zona: "Xalapa"
 *                   subzona: "Xalapa"
 *                   areaOrganizacional: "Secretaría Académica"
 *
 *       500:
 *         description: Error al obtener las dependencias.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Error de base de datos.
 */

/**
 * @swagger
 * /rysuv/catalogo/clasificacionesCedula:
 *   get:
 *     summary: Obtener las clasificaciones de cédula
 *     tags: [Catálogo]
 *     security:
 *       - bearerAuth: []
 *     description: Devuelve las diferentes clasificaciones de cédula registradas.
 *     responses:
 *       200:
 *         description: Lista de clasificaciones obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idClasificacionCedulas:
 *                     type: integer
 *                   numCedula:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *             example:
 *               - idClasificacionCedulas: 1
 *                 numCedula: 1
 *                 nombre: "Asistente Académico Administrativo"
 *               - idClasificacionCedulas: 2
 *                 numCedula: 2
 *                 nombre: "Asistente Administrativo Académico"
 *
 *       500:
 *         description: Error al obtener las clasificaciones de cédula.
 *       401:
 *         description: Token inválido o no proporcionado.
 *       400:
 *         description: Error de base de datos.
 */

import { Router } from "express";
import { CatalogoControlador } from "../controladores/CatalogoControlador.js";
import { ValidarJwt } from "../middlewares/jwt.js";

export const CrearRutaCatalogo = ({ ModeloCatalogo }) => {
  const CatalogoEnrutador = Router();
  const ControladorCatalogoEnrutador = new CatalogoControlador({
    ModeloCatalogo,
  });
  CatalogoEnrutador.get(
    "/tiposProceso",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerTiposProceso,
  );
  CatalogoEnrutador.get(
    "/tiposPersonal",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerTiposPersonal,
  );
  CatalogoEnrutador.get(
    "/estadosProcesoContratacion",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerEstadosProcesoContratacion,
  );
  CatalogoEnrutador.get(
    "/temporalDefinitiva",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerTemporalDefinitiva,
  );
  CatalogoEnrutador.get(
    "/tiposCedula",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerTiposCedula,
  );
  CatalogoEnrutador.get(
    "/dependencias",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerDependencias,
  );
  CatalogoEnrutador.get(
    "/clasificacionesCedula",
    ValidarJwt,
    ControladorCatalogoEnrutador.ObtenerClasificacionesCedula,
  );
  return CatalogoEnrutador;
};
