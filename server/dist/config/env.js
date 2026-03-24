"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    MONGO_URI: zod_1.z.string().min(1, "MONGO_URI is required"),
    JWT_SECRET: zod_1.z.string().min(10, "JWT_SECRET must be at least 10 characters"),
    CLIENT_URL: zod_1.z.string().url("CLIENT_URL must be a valid URL"),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error(" Invalid environment variables:");
    console.error(parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}
exports.env = parsedEnv.data;
