import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import type { Express } from "express";

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger UI available at /api-docs");
};
