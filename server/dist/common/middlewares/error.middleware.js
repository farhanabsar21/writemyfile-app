"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const AppError_1 = require("../errors/AppError");
const env_1 = require("../../config/env");
const errorMiddleware = (error, _req, res, _next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.flatten().fieldErrors,
        });
        return;
    }
    if (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000) {
        res.status(409).json({
            success: false,
            message: "A record with this value already exists",
            details: error.keyValue ?? null,
        });
        return;
    }
    if (error instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json({
            success: false,
            message: "Invalid resource identifier",
        });
        return;
    }
    if (error instanceof AppError_1.AppError) {
        res.status(error.statusCode).json({
            success: false,
            message: error.message,
            ...(error.details ? { details: error.details } : {}),
        });
        return;
    }
    console.error("Unhandled error:", error);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        ...(env_1.env.NODE_ENV !== "production" ? { details: error } : {}),
    });
};
exports.errorMiddleware = errorMiddleware;
