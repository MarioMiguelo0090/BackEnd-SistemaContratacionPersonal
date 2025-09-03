export const MensajesAcceso = {
    REGISTRO_EXITOSO: { resultado: 200, mensaje: "Registro exitoso" },    
    USUARIO_DUPLICADO: { resultado: 400, mensaje: "El nombre de usuario ya existe" },
    ACTUALIZACION_EXITOSA: { resultado: 200, mensaje: "Actualización exitosa" },
    USUARIO_PERDIDO: {resultado:404, mensaje:"No se ha encontrado el usuario"},
    DESACTIVACION_EXITOSA: {resultado: 200, mensaje: "El usuario fue desactivado"},
    LOGIN_EXITOSO: {resultado: 200, mensaje: "Login exitoso"},
    CONTRASENIA_INCORRECTA: {resultado: 401, mensaje: "Contraseña incorrecta"},
    USUARIO_INACTIVO: {resultado: 403, mensaje: "El usuario se encuentra inactivo"},
    TIPOS_ACCESO_PERDIDOS: {resultado: 404, mensaje:"Los tipos de accso no fueron encontrados"}
};

export const MensajeGeneralesBD = {
    ERROR_DB: { resultado: 500, mensaje: "Ha ocurrido un error en la base de datos" }
};
