import { CrearServidor } from "./src/api_rest/server.js";
import { ModeloAcceso } from "./src/api_rest/modelo/AccesoModelo.js";
import { ModeloCatalogo } from "./src/api_rest/modelo/CatalogoModelo.js";
import { ModeloProcesoContratacion } from "./src/api_rest/modelo/ProcesoContratacionModelo.js"
import { ModeloCedula } from "./src/api_rest/modelo/CedulaModelo.js";

CrearServidor({ModeloAcceso: ModeloAcceso,
    ModeloCatalogo:ModeloCatalogo, 
    ModeloProcesoContratacion:ModeloProcesoContratacion,
    ModeloCedula:ModeloCedula
});