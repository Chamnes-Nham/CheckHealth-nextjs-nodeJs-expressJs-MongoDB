
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../docs/swagger.json';
import dotenv from 'dotenv';
import routes from './routes/v1/routes';
import { RegisterRoutes } from './routes/routes';

dotenv.config();

const app = express();

//==============
// Enable CORS
//==============
app.use(cors());

//==============
// Middlewares
//==============
app.use(express.json());


//========================
// Register TSOA routes
//========================
RegisterRoutes(app);


//============
// Routes
//============
app.use('/api/v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
