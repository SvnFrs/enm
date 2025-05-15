import express from 'express';
const app = express();
// @ts-ignore
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
import swaggerDocument from './swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
