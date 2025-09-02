import zod from 'zod';
import { SoloLetras, SoloLetrasNumerosCaracteres, SoloLetrasYNumeros, SoloRutas } from '../utilidades/RegexValidador.js';

const CuentaEsquema = zod.object({
  usuario: zod.string().regex(SoloLetrasYNumeros),
  contrasenia: zod.string().min(8).max(255),
  FKIdTipoAcceso: zod.number(),
  nombre: zod.string().min(1).max(80).regex(SoloLetras),
  primerApellido: zod.string().min(1).max(80).regex(SoloLetras),
  segundoApellido: zod.string().min(0).max(80).regex(SoloLetras).nullable()
});



export function ValidarInsercionAcceso(entrada)
{
    return CuentaEsquema.safeParse(entrada);
}
