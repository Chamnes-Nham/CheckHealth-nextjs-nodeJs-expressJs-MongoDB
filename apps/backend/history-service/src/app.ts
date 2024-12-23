import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/src/routes/v1/routes";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errors/errorHandlers";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "credentials", "include"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ========================
// Global Middleware
// ========================
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

//=========================

app.use(function errorHandler(err: any, _req: any, res: any, _next: any) {
  res.status(err.status || 500).send({
    message: err.message || "An error occurred",
    details: err?.details || err,
  });
});

//=========================

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
app.use(errorHandler);

export default app;
