import zod from 'zod';
import { SoloLetras, SoloLetrasNumerosCaracteres, SoloLetrasYNumeros, SoloRutas } from '../utilidades/RegexValidador.js';

const CuentaEsquema = zod.object({
  usuario: zod.string({
      invalid_type_error: 'El nombre de usuario no es válido',
      required_error: 'El nombre de usuario es un campo requerido'
    }).regex(SoloLetrasYNumeros),
  contrasenia: zod.string({
    invalid_type_error: 'La contraseña ingresado no es válido',
    required_error: 'El contraseña es un campo requerido'
  }).min(8).max(64),
  FKIdTipoAcceso: zod.number(),
  nombre: zod.string({
    invalid_type_error: 'El nombre ingresado no es válido',
    required_error: 'El nombre es un campo requerido'
  }).min(1).max(80).regex(SoloLetras),
  primerApellido: zod.string({
    invalid_type_error: 'El primer apellido ingresado no es válido',
    required_error: 'El primer apellido es un campo requerido'
  }).min(1).max(80).regex(SoloLetras),
  segundoApellido: zod.string({
    invalid_type_error: 'El segundo apellido no es válido'
  }).min(1).max(80).regex(SoloLetras).optional()
});

const CuentaEsquemaEdicion = zod.object({  
  idAcceso: zod.number(),
  usuario: zod.string({
    invalid_type_error: 'El nombre de usuario no es válido',
    required_error: 'El nombre de usuario es un campo requerido'
  }).regex(SoloLetrasYNumeros),
  contrasenia: zod.string({
    invalid_type_error: 'La contraseña ingresado no es válido',
    required_error: 'El contraseña es un campo requerido'
  }).min(8).max(64),
  FKIdTipoAcceso: zod.number(),
  nombre: zod.string({
    invalid_type_error: 'El nombre ingresado no es válido',
    required_error: 'El nombre es un campo requerido'
  }).min(1).max(80).regex(SoloLetras),
  primerApellido: zod.string({
    invalid_type_error: 'El primer apellido ingresado no es válido',
    required_error: 'El primer apellido es un campo requerido'
  }).min(1).max(80).regex(SoloLetras),
  segundoApellido: zod.string({
    invalid_type_error: 'El segundo apellido no es válido'
  }).min(1).max(80).regex(SoloLetras).optional(),
  estado: zod.union([zod.boolean(), zod.number().int().min(0).max(1)])
});

const CuentaLogin = zod.object({
  usuario: zod.string({
    invalid_type_error: 'El nombre de usuario no es válido',
    required_error: 'El nombre de usuario es un campo requerido'
  }).regex(SoloLetrasYNumeros),
  contrasenia: zod.string({
    invalid_type_error: 'La contraseña ingresado no es válido',
    required_error: 'El contraseña es un campo requerido'
  }).min(8).max(64)
});



export function ValidarInsercionAcceso(entrada)
{
    return CuentaEsquema.safeParse(entrada);
}

export function ValidarEdicionParcialAcceso(entrada)
{
    return CuentaEsquemaEdicion.partial().safeParse(entrada);
}

export function ValidarInicioSesion(entrada){
  return CuentaLogin.safeParse(entrada);
}

export function ValidarEdicionParcialProcesoContratacion(entrada) {
    return ProcesoContratacionEsquema.partial().safeParse(entrada);
}