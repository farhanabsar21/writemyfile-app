"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./app/routes"));
const env_1 = require("./config/env");
const app_constants_1 = require("./common/constants/app.constants");
const error_middleware_1 = require("./common/middlewares/error.middleware");
const ratelimit_middleware_1 = require("./common/middlewares/ratelimit.middleware");
const notFound_middleware_1 = require("./common/middlewares/notFound.middleware");
const requestId_middleware_1 = require("./common/middlewares/requestId.middleware");
const app = (0, express_1.default)();
app.use(requestId_middleware_1.requestIdMiddleware);
app.use((0, cors_1.default)({
    origin: env_1.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use((0, morgan_1.default)(":method :url :status :response-time ms - :res[content-length]"));
app.use(ratelimit_middleware_1.globalRateLimiter);
app.use(express_1.default.json({ limit: app_constants_1.APP_CONSTANTS.REQUEST.JSON_LIMIT }));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: app_constants_1.APP_CONSTANTS.REQUEST.URL_ENCODED_LIMIT,
}));
app.use("/api/v1", routes_1.default);
app.use(notFound_middleware_1.notFoundMiddleware);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
