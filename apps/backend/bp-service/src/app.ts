// import cors from 'cors';
// import express from 'express';
// import bloodPressureTipRoutes from './routes/v1/routes';
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDocument from '../docs/swagger.json';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // Enable CORS
// app.use(cors());

// // Middlewares
// app.use(express.json());

// // Routes
// app.use('/api/v1', bloodPressureTipRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// export default app;

// app.js
import express from "express";
import bloodPressureTipRoutes from "./routes/v1/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../docs/swagger.json";
import dotenv from "dotenv";
import cors from "cors";
import { RegisterRoutes } from "./routes/routes";

dotenv.config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend origin
  })
);

// Middlewares
app.use(express.json());
RegisterRoutes(app);

// Routes
app.use("/api/v1", bloodPressureTipRoutes);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
