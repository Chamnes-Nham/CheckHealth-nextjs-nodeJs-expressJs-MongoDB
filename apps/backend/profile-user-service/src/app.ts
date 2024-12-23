import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { RegisterRoutes } from "@/src/routes/auth/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import configs from "@/src/config";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: configs.frontendUrl, // replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());

// tsoa route generator
RegisterRoutes(app);
// route to visit tsoa
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
