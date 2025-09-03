import { CrearServidor } from "./src/api_rest/server.js";
import { ModeloAcceso } from "./src/api_rest/modelo/AccesoModelo.js";
import { ModeloCatalogo } from "./src/api_rest/modelo/CatalogoModelo.js";

CrearServidor({ModeloAcceso: ModeloAcceso,
    ModeloCatalogo:ModeloCatalogo
});