
export function ObtenerTipoDeUsuario(idTipoDeAcceso){
    switch (idTipoDeAcceso) {
        case 1:
            return 'Administrador';
            break;
        case 2:
            return 'Analista';
            break;
        case 3:
            return 'Gestor de solicitudes';
            break;
        case 4:
            return 'Jefe de departamento';
            break;
    }
}