import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from "./docs/swagger.json";

const app = express();

//===============================================
// Set up Swagger UI to serve the Swagger docs
//===============================================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//=======================================
// Other routes and middleware...
//=======================================
app.get("/", (_req, res) => {
  res.send("API is running");
});

//==============================================================================
// Enable CORS - this allows your frontend to communicate with your backendsss
//==============================================================================
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//=====================
// Other middleware
//=====================
app.use(express.json());

//=======================
// Register TSOA routes
//=======================
RegisterRoutes(app);

export default app;
