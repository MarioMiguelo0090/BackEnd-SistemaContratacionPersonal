import {
  ValidarInsercionAcceso,
  ValidarEdicionParcialAcceso,
  ValidarInicioSesion,
} from "../esquemas/AccesoValidador.js";
import { logger } from "../utilidades/logger.js";
import { GenerarJWT } from "../utilidades/generadorjwt.js";

export class AccesoControlador {
  constructor({ ModeloAcceso }) {
    this.modeloAcceso = ModeloAcceso;
  }

  RegistrarAcceso = async (req, res) => {
    try {
      const ResultadoValidacion = ValidarInsercionAcceso(req.body);
      if (ResultadoValidacion.success) {
        const ResultadoInsercion = await this.modeloAcceso.InsertarNuevaCuenta({
          datos: ResultadoValidacion.data,
          bitacoraFn: req.Bitacora,
          tipoDeAcceso: req.tipoDeAcceso,
        });
        let resultadoInsercion = parseInt(ResultadoInsercion.resultado);
        if (resultadoInsercion === 500) {
          res.status(resultadoInsercion).json({
            error: true,
            estado: ResultadoInsercion.resultado,
            mensaje:
              "Ha ocurrido un error al intentar realizar el registro de Acceso.",
          });
        } else {
          res.status(resultadoInsercion).json({
            error: resultadoInsercion !== 200,
            estado: ResultadoInsercion.resultado,
            mensaje: ResultadoInsercion.mensaje,
          });
        }
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje:
            "Datos con formato inválido, por favor verifique los datos enviados.",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  EditarAcceso = async (req, res) => {
    try {
      const idAcceso = parseInt(req.params["idAcceso"]);
      const {
        usuario,
        contrasenia,
        FKIdTipoAcceso,
        nombre,
        primerApellido,
        segundoApellido,
        estado,
      } = req.body;
      const Datos = {
        idAcceso,
        usuario,
        contrasenia,
        FKIdTipoAcceso,
        nombre,
        primerApellido,
        segundoApellido,
        estado,
      };
      const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
      if (ResultadoValidacion.success) {
        const ResultadoEdicion = await this.modeloAcceso.EditarAcceso({
          datos: ResultadoValidacion.data,
          bitacoraFn: req.Bitacora,
          tipoDeAcceso: req.tipoDeAcceso,
        });
        let resultadoEdicion = parseInt(ResultadoEdicion.estado);
        if (resultadoEdicion === 500) {
          res.status(resultadoEdicion).json({
            error: true,
            estado: ResultadoEdicion.estado,
            mensaje:
              "Ha ocurrido un error al intentar editar los datos de acceso",
          });
        } else {
          res.status(resultadoEdicion).json({
            error: resultadoEdicion !== 200,
            estado: resultadoEdicion,
            mensaje: ResultadoEdicion.mensaje,
          });
        }
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje:
            "Datos con formato inválido, por favor verifique los datos enviados.",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  BuscarUsuarioPorId = async (req, res) => {
    try {
      const idAcceso = parseInt(req.params["idAcceso"]);
      const Datos = { idAcceso };
      const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
      if (ResultadoValidacion.success) {
        const ResultadoConsulta = await this.modeloAcceso.BuscarUsuarioPorId({
          datos: ResultadoValidacion.data,
          tipoDeAcceso: req.tipoDeAcceso,
        });
        let resultadoConsulta = parseInt(ResultadoConsulta.estado);
        res.status(resultadoConsulta).json({
          error: resultadoConsulta !== 200,
          estado: resultadoConsulta,
          ...(resultadoConsulta === 200
            ? { usuario: ResultadoConsulta.usuarioEncontrado }
            : { mensaje: ResultadoConsulta.mensaje }),
        });
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje:
            "Datos con formato inválido, por favor verifique los datos enviados.",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  BuscarUsuarioPorNombreDeUsuario = async (req, res) => {
    try {
      const usuario = req.params["usuario"];
      const Datos = { usuario };
      const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
      if (ResultadoValidacion.success) {
        const ResultadoConsulta =
          await this.modeloAcceso.BuscarUsuarioPorNombreUsuario({
            datos: ResultadoValidacion.data,
            tipoDeAcceso: req.tipoDeAcceso,
          });
        let resultadoConsulta = parseInt(ResultadoConsulta.estado);
        res.status(resultadoConsulta).json({
          error: resultadoConsulta !== 200,
          estado: resultadoConsulta,
          ...(resultadoConsulta === 200
            ? { usuario: ResultadoConsulta.usuarioEncontrado }
            : { mensaje: ResultadoConsulta.mensaje }),
        });
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje:
            "Datos con formato inválido, por favor verifique los datos enviados.",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  DesactivarUsuarioPorId = async (req, res) => {
    try {
      const idAcceso = parseInt(req.params["idAcceso"]);
      const Datos = { idAcceso };
      const ResultadoValidacion = ValidarEdicionParcialAcceso(Datos);
      if (ResultadoValidacion.success) {
        const ResultadoDesactivacion =
          await this.modeloAcceso.DesactivarUsuarioPorIdAcceso({
            datos: ResultadoValidacion.data,
            bitacoraFn: req.Bitacora,
            tipoDeAcceso: req.tipoDeAcceso,
          });
        let resultado = parseInt(ResultadoDesactivacion.estado);
        res.status(resultado).json({
          error: resultado !== 200,
          estado: resultado,
          mensaje: ResultadoDesactivacion.mensaje,
        });
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje:
            "Datos con formato inválido, por favor verifique los datos enviados.",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  RealizarLogin = async (req, res) => {
    try {
      const ResultadoValidacion = ValidarInicioSesion(req.body);
      if (ResultadoValidacion.success) {
        const ResultadoLogin = await this.modeloAcceso.LoginAcceso({
          datos: ResultadoValidacion.data,
          bitacoraFn: req.Bitacora,
          tipoDeAcceso: "Inicio de sesion",
        });
        let DatosUsuario;
        let token;
        if (ResultadoLogin.estado === 200) {
          DatosUsuario = {
            correo: req.body.correo,
            usuario: req.body.usuario,
            tipoDeAcceso: ResultadoLogin.usuario.tipoDeAcceso,
          };
          token = await GenerarJWT(DatosUsuario);
          res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 8,
          });
        }
        res.status(ResultadoLogin.estado).json({
          error: ResultadoLogin.estado !== 200,
          estado: ResultadoLogin.estado,
          mensaje: ResultadoLogin.mensaje,
          ...(ResultadoLogin.estado === 200
            ? { usuario: ResultadoLogin.usuario }
            : {}),
        });
      } else {
        res.status(400).json({
          error: true,
          estado: 400,
          mensaje: "Datos de inicio de sesión inválidos",
        });
      }
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  ObtenerTiposDeAccesos = async (req, res) => {
    try {
      const ResultadoConsulta =
        await this.modeloAcceso.ObtenerTodosTiposDeAcceso({
          tipoDeAcceso: req.tipoDeAcceso,
        });
      let resultadoConsulta = parseInt(ResultadoConsulta.estado);
      res.status(resultadoConsulta).json({
        error: resultadoConsulta !== 200,
        estado: resultadoConsulta,
        ...(resultadoConsulta === 200
          ? { tiposAcceso: ResultadoConsulta.tiposAcceso }
          : { mensaje: ResultadoConsulta.mensaje }),
      });
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  ObtenerUsuarios = async (req, res) => {
    try {
      const ResultadoConsulta = await this.modeloAcceso.ObtenerTodosLosUsuarios(
        { tipoDeAcceso: req.tipoDeAcceso },
      );
      let resultadoConsulta = parseInt(ResultadoConsulta.estado);
      res.status(resultadoConsulta).json({
        error: resultadoConsulta !== 200,
        estado: resultadoConsulta,
        ...(resultadoConsulta === 200
          ? { usuarios: ResultadoConsulta.usuarios }
          : { mensaje: ResultadoConsulta.mensaje }),
      });
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };

  ObtenerTodosAnalistas = async (req, res) => {
    try {
      const ResultadoConsulta =
        await this.modeloAcceso.ObtenerTodosLosAnalistas({
          tipoDeAcceso: req.tipoDeAcceso,
        });
      let resultadoConsulta = parseInt(ResultadoConsulta.estado);
      res.status(resultadoConsulta).json({
        error: resultadoConsulta !== 200,
        estado: resultadoConsulta,
        ...(resultadoConsulta === 200
          ? { usuarios: ResultadoConsulta.usuarios }
          : { mensaje: ResultadoConsulta.mensaje }),
      });
    } catch (error) {
      logger({ mensaje: error });
      res.status(500).json({
        error: true,
        estado: 500,
        mensaje: "Ha ocurrido un error en el servidor",
      });
    }
  };
}
