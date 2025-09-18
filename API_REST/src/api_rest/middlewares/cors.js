import cors from 'cors';

export const CorsMiddleware = () => cors({
  origin: (origin, callback) => {
    return callback(null, true); // 🔓 Permitir todos los orígenes
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: false
});
