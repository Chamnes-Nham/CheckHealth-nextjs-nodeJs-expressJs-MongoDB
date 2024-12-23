import express from "express";
import applyProxy from "@/src/middleware/proxy";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "@/src/middleware/cors";
import {
  authenticateToken,
  authorizeRole,
  routeConfigMiddleware,
} from "@/src/middleware/auth";

const app = express();

// =======================
// GLOBAL MIDDLEWARE
// =======================
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(routeConfigMiddleware);
app.use(authenticateToken);
app.use(authorizeRole);

// =======================
// PROXY MIDDLEWARE
// =======================
applyProxy(app);

export default app;
