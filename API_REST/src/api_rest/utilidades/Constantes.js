export const MensajesAcceso = {
    REGISTRO_EXITOSO: { resultado: 200, mensaje: "Registro exitoso" },    
    USUARIO_DUPLICADO: { resultado: 400, mensaje: "El nombre de usuario ya existe" },
    ACTUALIZACION_EXITOSA: { resultado: 200, mensaje: "Actualización exitosa" },
    USUARIO_PERDIDO: {resultado:404, mensaje:"No se ha encontrado el usuario"},
    DESACTIVACION_EXITOSA: {resultado: 200, mensaje: "El usuario fue desactivado"},
    LOGIN_EXITOSO: {resultado: 200, mensaje: "Login exitoso"},
    CONTRASENIA_INCORRECTA: {resultado: 401, mensaje: "Contraseña incorrecta"},
    USUARIO_INACTIVO: {resultado: 403, mensaje: "El usuario se encuentra inactivo"},
    TIPOS_ACCESO_PERDIDOS: {resultado: 404, mensaje:"Los tipos de accso no fueron encontrados"},
    CREDENCIALES_INVALIDAS: {resultado: 401, mensaje: "Las credenciales de acceso son inválidas"}
};

export const MensajeGeneralesBD = {
    ERROR_DB: { resultado: 500, mensaje: "Ha ocurrido un error en la base de datos" }
};

export const MensajeProcesoContratacion = {
    REGISTRO_EXITOSO: { resultado: 200, mensaje: "Registro exitoso" }, 
    REGISTRO_DUPLICADO: {resultado: 400, mensaje: "El registro que intenta realizar ya existe en el sistema"},   
    ACTUALIZACION_EXITOSA: {resultado:200, mensaje: "Los datos han sido actualizados correctamente"},
    PROCESO_INEXISTENTE: {resultado: 404, mensaje: "El proceso no fue encontrado"}
};

export const MensajeCedula = {
    REGISTRO_EXITOSO: {resultado:200, mensaje:"La cédula ha sido registrada"},
    CEDULA_DUPLICADA: {resultado: 400, mensaje:"El registro que intenta realizar ya existe en el sistema"},
    ACTUALIZACION_EXITOSA: {resultado: 200, mensaje:"Los datos han sido actualizados correctamente"},
    CEDULA_INEXISTENTE: {resultado: 404, mensaje: "La cédula no fue encontrada"},
    COMPETENCIA_INEXISTENTE: {resultado: 404, mensaje: "La competencia no fue encontrada"}
};

export const MensajeResultado = {
    REGISTRO_EXITOSO: {resultado:200, mensaje:"Los resultados se registraron correctamente"},
    RESULTADO_INEXISTENTE: {resultado: 404, mensaje: "El resultado no fue encontrado"}
};
