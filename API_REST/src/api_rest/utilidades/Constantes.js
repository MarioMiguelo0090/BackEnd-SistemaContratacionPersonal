export const MensajesAcceso = {
    REGISTRO_EXITOSO:  "Registro exitoso",    
    USUARIO_DUPLICADO: "El nombre de usuario ya existe" ,
    ACTUALIZACION_EXITOSA: "Actualización exitosa" ,
    USUARIO_PERDIDO: "No se ha encontrado el usuario",
    DESACTIVACION_EXITOSA: "El usuario fue desactivado",
    LOGIN_EXITOSO:  "Login exitoso",
    CONTRASENIA_INCORRECTA: "Contraseña incorrecta",
    USUARIO_INACTIVO: "El usuario se encuentra inactivo",
    TIPOS_ACCESO_PERDIDOS: "Los tipos de accso no fueron encontrados",
    CREDENCIALES_INVALIDAS: "Las credenciales de acceso son inválidas"
};

export const MensajeGeneralesBD = {
    ERROR_DB: { estado: 500, mensaje: "Ha ocurrido un error en la base de datos" }
};

export const MensajeProcesoContratacion = {
    REGISTRO_EXITOSO: { estado: 200, mensaje: "Registro exitoso" }, 
    REGISTRO_DUPLICADO: {estado: 400, mensaje: "El registro que intenta realizar ya existe en el sistema"},   
    ACTUALIZACION_EXITOSA: {estado:200, mensaje: "Los datos han sido actualizados correctamente"},
    PROCESO_INEXISTENTE: {estado: 404, mensaje: "El proceso no fue encontrado"},
    ELIMINACION_EXITOSA: {estado: 200, mensaje: "Eliminación exitosa"},
};

export const MensajeCedula = {
    REGISTRO_EXITOSO: {estado:200, mensaje:"La cédula ha sido registrada"},
    CEDULA_DUPLICADA: {estado: 400, mensaje:"El registro que intenta realizar ya existe en el sistema"},
    ACTUALIZACION_EXITOSA: {estado: 200, mensaje:"Los datos han sido actualizados correctamente"},
    CEDULA_INEXISTENTE: {estado: 404, mensaje: "La cédula no fue encontrada"},
    COMPETENCIA_INEXISTENTE: {estado: 404, mensaje: "La competencia no fue encontrada"},
    CEDULA_INEXISTENTE: {estado: 404, mensaje: "No hay cédulas que mostrar"}
};

export const MensajeResultado = {
    REGISTRO_EXITOSO: {resultado:200, mensaje:"Los resultados se registraron correctamente"},
    RESULTADO_INEXISTENTE: {resultado: 404, mensaje: "El resultado no fue encontrado"}
};

export const CodigosDeEstado = {
    OK: 200,
    Created: 201,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    MethodNotAllowed: 405,
    Conflict: 409,
    InternalServerError: 500,
    BadGateway: 502
}