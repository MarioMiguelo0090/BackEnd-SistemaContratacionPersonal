import cors from "cors";

export const CorsMiddleware = () =>
  cors({
    origin: [process.env.FRONTEND_CLIENT],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });
