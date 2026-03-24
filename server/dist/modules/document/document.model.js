"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = exports.Document = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("../user/user.model");
const document_enums_1 = require("./document.enums");
class StructuredSectionClass {
}
__decorate([
    (0, typegoose_1.prop)({ required: false, trim: true }),
    __metadata("design:type", String)
], StructuredSectionClass.prototype, "heading", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], required: true, default: [] }),
    __metadata("design:type", Array)
], StructuredSectionClass.prototype, "paragraphs", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String], required: false, default: [] }),
    __metadata("design:type", Array)
], StructuredSectionClass.prototype, "bullets", void 0);
class StructuredDocumentClass {
}
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], StructuredDocumentClass.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({
        type: () => [StructuredSectionClass],
        required: true,
        default: [],
        _id: false,
    }),
    __metadata("design:type", Array)
], StructuredDocumentClass.prototype, "sections", void 0);
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typegoose_1.prop)({
        ref: () => user_model_1.User,
        required: true,
        index: true,
    }),
    __metadata("design:type", Object)
], Document.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 150,
    }),
    __metadata("design:type", String)
], Document.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true,
        maxlength: 50000,
    }),
    __metadata("design:type", String)
], Document.prototype, "rawContent", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true,
        maxlength: 50000,
    }),
    __metadata("design:type", String)
], Document.prototype, "cleanedContent", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: () => StructuredDocumentClass,
        _id: false,
    }),
    __metadata("design:type", StructuredDocumentClass)
], Document.prototype, "structuredContent", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: document_enums_1.DocumentType,
        type: String,
    }),
    __metadata("design:type", String)
], Document.prototype, "documentType", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: document_enums_1.DocumentTemplate,
        type: String,
    }),
    __metadata("design:type", String)
], Document.prototype, "template", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: document_enums_1.DocumentStatus,
        type: String,
        default: document_enums_1.DocumentStatus.PROCESSED,
    }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
exports.Document = Document = __decorate([
    (0, typegoose_1.index)({ userId: 1, createdAt: -1 }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            collection: "documents",
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], Document);
exports.DocumentModel = (0, typegoose_1.getModelForClass)(Document);
