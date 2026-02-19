import { CrearServidor } from "./src/api_rest/server.js";
import { ModeloAcceso } from "./src/api_rest/modelo/Sequelize-mssql/AccesoModelo.js";
import { ModeloCatalogo } from "./src/api_rest/modelo/mssql/CatalogoModelo.js";
import { ModeloProcesoContratacion } from "./src/api_rest/modelo/mssql/ProcesoContratacionModelo.js"
import { ModeloCedula } from "./src/api_rest/modelo/mssql/CedulaModelo.js";

CrearServidor({ModeloAcceso: ModeloAcceso,
    ModeloCatalogo:ModeloCatalogo, 
    ModeloProcesoContratacion:ModeloProcesoContratacion,
    ModeloCedula:ModeloCedula
});