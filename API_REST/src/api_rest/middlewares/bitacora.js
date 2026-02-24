import RequestIP from 'request-ip'
import {toZonedTime, format} from 'date-fns-tz'
import {Bitacora} from '../modelo/Sequelize-mssql/models/bitacora.js';
import { ObtenerTipoDeUsuario } from '../utilidades/TipoDeAcceso.js';

export function BitacoraLogger(req, res, next){
    const Ip = RequestIP.getClientIp(req)

    req.Bitacora = async (accion, usuarioBitacora) => {
        let usuario;
        if(usuarioBitacora){
            usuario = usuarioBitacora
        }else{
            usuario = req.usuario
        }
        let tipoDeUsuario;
        if(req.tipoDeAcceso){
            tipoDeUsuario = ObtenerTipoDeUsuario(req.tipoDeAcceso)
        }else{
            tipoDeUsuario =  'InicioDeSesion';
        }
        const zona = 'America/Mexico_City';
        const fechaZona = toZonedTime(new Date(), zona);
        const fecha = format(fechaZona, 'yyyy-MM-dd HH:mm:ss', { timeZone: zona });
        await Bitacora.create({
            fecha: fecha,
            ip: Ip,
            usuario: usuario,
            tipoDeUsuario: tipoDeUsuario,
            accion: accion,
        });
    }
    next();
}