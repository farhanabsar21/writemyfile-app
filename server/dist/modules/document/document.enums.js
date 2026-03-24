"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentStatus = exports.DocumentTemplate = exports.DocumentType = void 0;
var DocumentType;
(function (DocumentType) {
    DocumentType["REPORT"] = "report";
    DocumentType["ASSIGNMENT"] = "assignment";
    DocumentType["PROPOSAL"] = "proposal";
    DocumentType["LETTER"] = "letter";
    DocumentType["MEETING_SUMMARY"] = "meeting-summary";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var DocumentTemplate;
(function (DocumentTemplate) {
    DocumentTemplate["PROFESSIONAL"] = "professional";
    DocumentTemplate["ACADEMIC"] = "academic";
    DocumentTemplate["MINIMAL"] = "minimal";
})(DocumentTemplate || (exports.DocumentTemplate = DocumentTemplate = {}));
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["DRAFT"] = "draft";
    DocumentStatus["PROCESSED"] = "processed";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
