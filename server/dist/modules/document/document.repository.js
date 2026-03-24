"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocumentByIdAndUserId = exports.updateDocumentByIdAndUserId = exports.findDocumentLeanByIdAndUserId = exports.findDocumentByIdAndUserId = exports.findDocumentsByUserId = exports.createDocumentRecord = void 0;
const document_model_1 = require("./document.model");
const createDocumentRecord = async (payload) => {
    return document_model_1.DocumentModel.create(payload);
};
exports.createDocumentRecord = createDocumentRecord;
const findDocumentsByUserId = async (userId) => {
    return document_model_1.DocumentModel.find({ userId })
        .select("title documentType template status createdAt updatedAt")
        .sort({ createdAt: -1 })
        .lean();
};
exports.findDocumentsByUserId = findDocumentsByUserId;
const findDocumentByIdAndUserId = async (id, userId) => {
    return document_model_1.DocumentModel.findOne({ _id: id, userId });
};
exports.findDocumentByIdAndUserId = findDocumentByIdAndUserId;
const findDocumentLeanByIdAndUserId = async (id, userId) => {
    return document_model_1.DocumentModel.findOne({ _id: id, userId }).lean();
};
exports.findDocumentLeanByIdAndUserId = findDocumentLeanByIdAndUserId;
const updateDocumentByIdAndUserId = async (id, userId, update) => {
    return document_model_1.DocumentModel.findOneAndUpdate({ _id: id, userId }, update, {
        new: true,
    });
};
exports.updateDocumentByIdAndUserId = updateDocumentByIdAndUserId;
const deleteDocumentByIdAndUserId = async (id, userId) => {
    return document_model_1.DocumentModel.findOneAndDelete({ _id: id, userId });
};
exports.deleteDocumentByIdAndUserId = deleteDocumentByIdAndUserId;
