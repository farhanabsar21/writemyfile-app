"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getDocuments = exports.createDocument = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../common/errors/AppError");
const formatter_1 = require("./formatter");
const document_repository_1 = require("./document.repository");
const document_enums_1 = require("./document.enums");
const toSafeDocument = (document) => {
    return {
        id: String(document._id),
        userId: String(document.userId),
        title: document.title,
        rawContent: document.rawContent,
        cleanedContent: document.cleanedContent,
        structuredContent: document.structuredContent,
        documentType: document.documentType,
        template: document.template,
        status: document.status,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
    };
};
const toDocumentListItem = (document) => {
    return {
        id: String(document._id),
        title: document.title,
        documentType: document.documentType,
        template: document.template,
        status: document.status,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
    };
};
const ensureValidDocumentId = (id) => {
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        throw new AppError_1.AppError("Invalid document id", 400);
    }
};
const createDocument = async (userId, input) => {
    const processed = (0, formatter_1.processDocumentContent)(input.title, input.rawContent);
    const document = await (0, document_repository_1.createDocumentRecord)({
        userId,
        title: input.title,
        rawContent: input.rawContent,
        cleanedContent: processed.cleanedContent,
        structuredContent: processed.structuredContent,
        documentType: input.documentType,
        template: input.template,
        status: document_enums_1.DocumentStatus.PROCESSED,
    });
    return toSafeDocument(document);
};
exports.createDocument = createDocument;
const getDocuments = async (userId) => {
    const documents = await (0, document_repository_1.findDocumentsByUserId)(userId);
    return documents.map(toDocumentListItem);
};
exports.getDocuments = getDocuments;
const getDocumentById = async (userId, documentId) => {
    ensureValidDocumentId(documentId);
    const document = await (0, document_repository_1.findDocumentLeanByIdAndUserId)(documentId, userId);
    if (!document) {
        throw new AppError_1.AppError("Document not found", 404);
    }
    return toSafeDocument(document);
};
exports.getDocumentById = getDocumentById;
const updateDocument = async (userId, documentId, input) => {
    ensureValidDocumentId(documentId);
    const existingDocument = await (0, document_repository_1.findDocumentByIdAndUserId)(documentId, userId);
    if (!existingDocument) {
        throw new AppError_1.AppError("Document not found", 404);
    }
    const nextTitle = input.title ?? existingDocument.title;
    const nextRawContent = input.rawContent ?? existingDocument.rawContent;
    const nextDocumentType = input.documentType ?? existingDocument.documentType;
    const nextTemplate = input.template ?? existingDocument.template;
    const contentChanged = nextTitle !== existingDocument.title ||
        nextRawContent !== existingDocument.rawContent;
    const processed = contentChanged
        ? (0, formatter_1.processDocumentContent)(nextTitle, nextRawContent)
        : {
            cleanedContent: existingDocument.cleanedContent,
            structuredContent: existingDocument.structuredContent,
        };
    const updatedDocument = await (0, document_repository_1.updateDocumentByIdAndUserId)(documentId, userId, {
        title: nextTitle,
        rawContent: nextRawContent,
        cleanedContent: processed.cleanedContent,
        structuredContent: processed.structuredContent,
        documentType: nextDocumentType,
        template: nextTemplate,
    });
    if (!updatedDocument) {
        throw new AppError_1.AppError("Document not found", 404);
    }
    return toSafeDocument(updatedDocument);
};
exports.updateDocument = updateDocument;
const deleteDocument = async (userId, documentId) => {
    ensureValidDocumentId(documentId);
    const deletedDocument = await (0, document_repository_1.deleteDocumentByIdAndUserId)(documentId, userId);
    if (!deletedDocument) {
        throw new AppError_1.AppError("Document not found", 404);
    }
};
exports.deleteDocument = deleteDocument;
