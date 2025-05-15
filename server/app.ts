import express from "express";
import { connectDB, closeDB } from "./config/db.config";
import { setupSwagger } from "./config/swagger.config";
import userRoutes from "./routes/user.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().then(() => {
  // API Routes
  app.use("/api/v1/users", userRoutes);

  // Swagger Setup
  setupSwagger(app);

  // Error handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start the server:", err);
  process.exit(1);
});

// Handle shutdown
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDB();
  process.exit(0);
});
