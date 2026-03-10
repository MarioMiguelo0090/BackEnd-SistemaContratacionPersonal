import dotenv from 'dotenv';
import express, { json, urlencoded  } from 'express';
import fs from 'fs';
import https from 'https';
import cookieparser from 'cookie-parser'
import { CorsMiddleware } from './middlewares/cors.js';
import { CrearRutaAcceso } from './rutas/AccesoRuta.js';
import { CrearRutaCatalogo } from './rutas/CatalogoRuta.js';
import { CrearRutaCedula } from './rutas/CedulaRuta.js';
import { CrearRutaProcesoContratacion } from './rutas/ProcesoContratacionRuta.js';
import { setupSwagger } from './utilidades/swagger.js';

export const CrearServidor = ({ModeloAcceso,ModeloCatalogo,ModeloProcesoContratacion,ModeloCedula}) => 
{
  dotenv.config();
  const app = express();
  
  app.use(cookieparser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.use(CorsMiddleware());
  app.disable('x-powered-by');
  setupSwagger(app);
  app.get('/rysuv', (req, res) => {
    res.json({ message: 'Bienvenido al servidor de RySUV' });
  });
  app.use('/rysuv/acceso', CrearRutaAcceso({ ModeloAcceso }));
  app.use('/rysuv/catalogo', CrearRutaCatalogo({ ModeloCatalogo }));
  app.use('/rysuv/procesoContratacion', CrearRutaProcesoContratacion({ ModeloProcesoContratacion }));
  app.use('/rysuv/cedula', CrearRutaCedula({ ModeloCedula }));  
  app.use((err, req, res, next) => {
    if (err.message === 'CORS Invalido') {
      return res.status(401).json({ error: 'No se puede enviar solicitudes ni recibir respuestas del servidor' });
    }
    next(err);
  });

  const PUERTO = process.env.PUERTO || 3000;  
  const httpsOptions = {
    key: fs.readFileSync('./ssl/server.key'),  
    cert: fs.readFileSync('./ssl/server.crt')  
  };

  https.createServer(httpsOptions, app)
    .listen(PUERTO, () => {
      console.log(`Servidor HTTPS activo en https://localhost:${PUERTO}/rysuv`);
    });
}
