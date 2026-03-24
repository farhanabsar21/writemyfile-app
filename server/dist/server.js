"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const connect_1 = require("./database/connect");
const startServer = async () => {
    await (0, connect_1.connectToDatabase)();
    const server = app_1.default.listen(env_1.env.PORT, () => {
        console.log(`Environment: ${env_1.env.NODE_ENV}`);
        console.log(`Server running on port ${env_1.env.PORT}`);
        console.log(`Health check: http://localhost:${env_1.env.PORT}/api/v1/health`);
    });
    const shutdown = async (signal) => {
        console.log(`${signal} received. Shutting down gracefully...`);
        server.close(async () => {
            await mongoose_1.default.disconnect();
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
