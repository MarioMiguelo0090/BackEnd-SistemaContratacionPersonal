import { CrearServidor } from "./src/api_rest/server.js";
import { ModeloAcceso } from "./src/api_rest/modelo/AccesoModelo.js";

CrearServidor({ModeloAcceso: ModeloAcceso});