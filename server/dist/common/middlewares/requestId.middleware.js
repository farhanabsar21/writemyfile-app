"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = void 0;
const crypto_1 = __importDefault(require("crypto"));
const requestIdMiddleware = (req, res, next) => {
    const requestId = crypto_1.default.randomUUID();
    req.headers["x-request-id"] = requestId;
    res.setHeader("x-request-id", requestId);
    next();
};
exports.requestIdMiddleware = requestIdMiddleware;
