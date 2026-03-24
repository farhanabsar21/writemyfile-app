"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportDocxHandler = exports.exportPdfHandler = void 0;
const AppError_1 = require("../../common/errors/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const export_service_1 = require("./export.service");
const getAuthenticatedUserId = (req) => {
    if (!req.user?.userId) {
        throw new AppError_1.AppError("Unauthorized", 401);
    }
    return req.user.userId;
};
exports.exportPdfHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");
    const generatedFile = await (0, export_service_1.exportDocumentAsPdf)(userId, id);
    res.setHeader("Content-Type", generatedFile.contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${generatedFile.fileName}"`);
    res.status(200).send(generatedFile.buffer);
});
exports.exportDocxHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");
    const generatedFile = await (0, export_service_1.exportDocumentAsDocx)(userId, id);
    res.setHeader("Content-Type", generatedFile.contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${generatedFile.fileName}"`);
    res.status(200).send(generatedFile.buffer);
});
const getRouteParam = (value, name) => {
    if (!value || Array.isArray(value)) {
        throw new AppError_1.AppError(`Invalid ${name}`, 400);
    }
    return value;
};
