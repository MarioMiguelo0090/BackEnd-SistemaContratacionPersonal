import express, { json } from 'express';
import { CrearRutaAcceso } from './rutas/AccesoRuta.js';
import { CrearRutaCatalogo } from './rutas/CatalogoRuta.js';
import { CrearRutaProcesoContratacion } from './rutas/ProcesoContratacionRuta.js';
import { CrearRutaCedula } from './rutas/CedulaRuta.js';

import dotenv from 'dotenv';

export const CrearServidor = ({ModeloAcceso,ModeloCatalogo,ModeloProcesoContratacion,ModeloCedula}) => 
{
  const app = express();
  dotenv.config();
  app.use(json());
  app.disable('x-powered-by');
  app.get('/rysuv',(req,res)=>{
    res.json({message:'Bienvenido al servidor de RySUV'});
  });
  app.use('/rysuv/acceso',CrearRutaAcceso({ModeloAcceso}));
  app.use('/rysuv/catalogo',CrearRutaCatalogo({ModeloCatalogo}));
  app.use('/rysuv/procesoContratacion',CrearRutaProcesoContratacion({ModeloProcesoContratacion}));
  app.use('/rysuv/cedula',CrearRutaCedula({ModeloCedula}));
  const PUERTO = process.env.PUERTO;
  app.use((err, req, res, next) => {
    if (err.message === 'CORS Invalido'){
      return res.status(401).json({error: 'No se puede enviar solicitudes ni recibir respuestas del servidor'});
    }
    next(err);
  });
  app.listen(PUERTO,()=>{ 
    console.log(`Servidor activo en la siguiente ruta http://localhost:${PUERTO}`);
  });
}
