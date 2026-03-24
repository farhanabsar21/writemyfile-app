import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";
import { connectToDatabase } from "./database/connect";

const startServer = async (): Promise<void> => {
  await connectToDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`Environment: ${env.NODE_ENV}`);
    console.log(`Server running on port ${env.PORT}`);
    console.log(`Health check: http://localhost:${env.PORT}/api/v1/health`);
  });

  const shutdown = async (signal: string) => {
    console.log(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      await mongoose.disconnect();
      console.log("MongoDB disconnected");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
};

void startServer();
