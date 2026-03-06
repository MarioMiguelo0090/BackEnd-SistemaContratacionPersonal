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

export const MensajeNoEncontrado = {
    TIPOS_DE_PROCESO: 'No se han encontrado tipos de proceso registrados en la base de datos',
    TIPO_DE_PERSONAL: 'No se ha encontrado ningún tipo de personal registrado en la base de datos',
    PROCESOS_DE_CONTRATACION: 'No se ha encontrado ningún proces de contratación registrado en la base de datos',
    TEMPORAL_DEFINITIVA_COMPLETA: 'No se ha encontrado ningún tipo de temporal definitiva completa',
    TIPOS_DE_CEDULA: 'No se ha encontrado ningún tipo de cédula registrada en la base de datos',
    DEPENDENCIA_COMPLETAS: 'No se ha encontrado ninguna dependencia completa registrada en la base de datos',
    CLASIFICACION_CEDULA: 'No se ha encontrado una clasificación de cédula registrada en la base de datos'
}

export const MensajeGeneralesBD = {
    ERROR_DB: "Ha ocurrido un error en la base de datos"
};

export const MensajeProcesoContratacion = {
    REGISTRO_EXITOSO:  "Registro exitoso", 
    REGISTRO_DUPLICADO: "El registro que intenta realizar ya existe en el sistema",   
    ACTUALIZACION_EXITOSA: "Los datos han sido actualizados correctamente",
    PROCESO_INEXISTENTE: "El proceso no fue encontrado",
    ELIMINACION_EXITOSA: "Eliminación exitosa",
};

export const MensajeCedula = {
    REGISTRO_EXITOSO: "La cédula ha sido registrada",
    CEDULA_DUPLICADA:  "El registro que intenta realizar ya existe en el sistema",
    ACTUALIZACION_EXITOSA: "Los datos han sido actualizados correctamente",
    CEDULA_INEXISTENTE: "La cédula no fue encontrada",
    COMPETENCIA_INEXISTENTE: "La competencia no fue encontrada",
    CEDULA_INEXISTENTE: "No hay cédulas que mostrar"
};

export const MensajeResultado = {
    REGISTRO_EXITOSO: "Los resultados se registraron correctamente",
    RESULTADO_INEXISTENTE: "El resultado no fue encontrado"
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