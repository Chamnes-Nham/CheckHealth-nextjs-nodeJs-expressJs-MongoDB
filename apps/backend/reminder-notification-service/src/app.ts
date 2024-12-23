import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/src/routes/v1/routes";
import fs from "fs";
import path from "path";
import { loggerMiddleware } from "./middlewares/logger-middleware";
import restrictAccess from "./middlewares/restrict-access";

import cors from "cors";
import { errorHandler } from "./utils/errors/errorHandler";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// Allow requests from all origins (or specify allowed origins)
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,POST,PUT,DELETE',
// }));
// ========================
// CORS Configuration
// ========================
app.use(
  cors({
    origin: "http://localhost:3000", // Allow specific origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specified methods
  })
);

// restrict access derectly to port 3000
app.use(restrictAccess);

// ========================
// Global Middleware
// ========================
app.use(express.json()); // Help to get the json from request body
app.use(loggerMiddleware);
// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
app.use(errorHandler);

export default app;
