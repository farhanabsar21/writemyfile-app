"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocumentHandler = exports.updateDocumentHandler = exports.getDocumentByIdHandler = exports.getDocumentsHandler = exports.createDocumentHandler = void 0;
const AppError_1 = require("../../common/errors/AppError");
const asyncHandler_1 = require("../../utils/asyncHandler");
const apiResponse_1 = require("../../utils/apiResponse");
const document_service_1 = require("./document.service");
const getAuthenticatedUserId = (req) => {
    if (!req.user?.userId) {
        throw new AppError_1.AppError("Unauthorized", 401);
    }
    return req.user.userId;
};
exports.createDocumentHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const document = await (0, document_service_1.createDocument)(userId, req.body);
    (0, apiResponse_1.sendSuccess)(res, {
        statusCode: 201,
        message: "Document created successfully",
        data: {
            document,
        },
    });
});
exports.getDocumentsHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const documents = await (0, document_service_1.getDocuments)(userId);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Documents fetched successfully",
        data: {
            documents,
        },
    });
});
exports.getDocumentByIdHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");
    const document = await (0, document_service_1.getDocumentById)(userId, id);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Document fetched successfully",
        data: {
            document,
        },
    });
});
exports.updateDocumentHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");
    const document = await (0, document_service_1.updateDocument)(userId, id, req.body);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Document updated successfully",
        data: {
            document,
        },
    });
});
exports.deleteDocumentHandler = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = getAuthenticatedUserId(req);
    const id = getRouteParam(req.params.id, "document id");
    await (0, document_service_1.deleteDocument)(userId, id);
    (0, apiResponse_1.sendSuccess)(res, {
        message: "Document deleted successfully",
    });
});
const getRouteParam = (value, name) => {
    if (!value || Array.isArray(value)) {
        throw new AppError_1.AppError(`Invalid ${name}`, 400);
    }
    return value;
};
