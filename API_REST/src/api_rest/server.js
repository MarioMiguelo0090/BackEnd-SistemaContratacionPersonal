import express, { json } from 'express';
import { CrearRutaAcceso } from './rutas/AccesoRuta.js';

import dotenv from 'dotenv';


export const CrearServidor = ({ModeloAcceso}) => 
{
  const app = express();
  dotenv.config();
  app.use(json());
  app.disable('x-powered-by');
  app.get('/rysuv',(req,res)=>{
    res.json({message:'Bienvenido al servidor de RySUV'});
  });
  app.use('/rysuv/acceso',CrearRutaAcceso({ModeloAcceso}));
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
