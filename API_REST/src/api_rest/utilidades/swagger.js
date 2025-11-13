import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API REST - RySUV",
      version: "1.0.0",
      description:
        "Documentación de la API REST del sistema **RySUV** (Reclutamiento y Seleccion de personal).",
      contact: {
        name: "Equipo de Desarrollo RySUV",        
      },
    },
    servers: [
      {
        url: "https://localhost:3000/rysuv",
        description: "Servidor local HTTPS",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [join(__dirname, "../rutas/*.js")], 
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
