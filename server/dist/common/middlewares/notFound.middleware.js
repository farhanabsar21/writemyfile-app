"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const notFoundMiddleware = (req, res, _next) => {
    res.status(404).json({
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
