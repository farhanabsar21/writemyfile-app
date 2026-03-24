"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const env_1 = require("../config/env");
const apiResponse_1 = require("../utils/apiResponse");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const document_routes_1 = __importDefault(require("../modules/document/document.routes"));
const template_routes_1 = __importDefault(require("../modules/template/template.routes"));
const router = (0, express_1.Router)();
router.get("/health", (_req, res) => {
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Server is running",
        data: {
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            environment: env_1.env.NODE_ENV,
        },
    });
});
router.use("/auth", auth_routes_1.default);
router.use("/documents", document_routes_1.default);
router.use("/templates", template_routes_1.default);
exports.default = router;
