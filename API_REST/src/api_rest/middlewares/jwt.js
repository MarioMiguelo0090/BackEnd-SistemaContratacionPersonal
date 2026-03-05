import jwt from 'jsonwebtoken';
import { logger } from '../utilidades/logger.js';

export const ValidarJwt = (req, res, next) => {
    try {        
        const HeaderAutenticacion = req.header('authorization') || req.header('access_token');
        const Token = HeaderAutenticacion?.startsWith('Bearer ')
            ? HeaderAutenticacion.split(' ')[1]
            : null;

        if (!Token) {
            return res.status(401).json({
                error: true,
                estado: 401,
                mensaje: 'No hay un token de autenticación dentro de la solicitud'
            });
        }
        
        const { correo, usuario, tipoDeAcceso } = jwt.verify(Token, process.env.SECRETO_JWT);        
        req.correo = correo;
        req.usuario = usuario;
        req.tipoDeAcceso = tipoDeAcceso
        next();
    } catch (error) {
        logger(error);
        res.status(401).json({
            error: true,
            estado: 401,
            mensaje: 'La sesión no es válida o ha expirado. Por favor, vuelva a iniciar sesión.'
        });
    }
};
