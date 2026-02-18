import cors from 'cors';

export const CorsMiddleware = () => cors({
  origin: (origin, callback) => {
    return callback(null, true);
  },
  // TODO-Producción: Restringir orígenes permitidos.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false
});
