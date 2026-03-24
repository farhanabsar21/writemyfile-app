import { isValidObjectId } from "mongoose";
import { AppError } from "../../common/errors/AppError";
import { processDocumentContent } from "./formatter";
import {
  createDocumentRecord,
  deleteDocumentByIdAndUserId,
  findDocumentByIdAndUserId,
  findDocumentLeanByIdAndUserId,
  findDocumentsByUserId,
  updateDocumentByIdAndUserId,
} from "./document.repository";
import { DocumentListItem, SafeDocument } from "./document.types";
import {
  CreateDocumentInput,
  UpdateDocumentInput,
} from "./document.validation";
import { DocumentStatus } from "./document.enums";

const toSafeDocument = (document: {
  _id: unknown;
  userId: unknown;
  title: string;
  rawContent: string;
  cleanedContent: string;
  structuredContent: SafeDocument["structuredContent"];
  documentType: SafeDocument["documentType"];
  template: SafeDocument["template"];
  status: SafeDocument["status"];
  createdAt?: Date;
  updatedAt?: Date;
}): SafeDocument => {
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

const toDocumentListItem = (document: {
  _id: unknown;
  title: string;
  documentType: DocumentListItem["documentType"];
  template: DocumentListItem["template"];
  status: DocumentListItem["status"];
  createdAt?: Date;
  updatedAt?: Date;
}): DocumentListItem => {
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

const ensureValidDocumentId = (id: string): void => {
  if (!isValidObjectId(id)) {
    throw new AppError("Invalid document id", 400);
  }
};

export const createDocument = async (
  userId: string,
  input: CreateDocumentInput,
): Promise<SafeDocument> => {
  const processed = processDocumentContent(input.title, input.rawContent);

  const document = await createDocumentRecord({
    userId,
    title: input.title,
    rawContent: input.rawContent,
    cleanedContent: processed.cleanedContent,
    structuredContent: processed.structuredContent,
    documentType: input.documentType,
    template: input.template,
    status: DocumentStatus.PROCESSED,
  });

  return toSafeDocument(document);
};

export const getDocuments = async (
  userId: string,
): Promise<DocumentListItem[]> => {
  const documents = await findDocumentsByUserId(userId);
  return documents.map(toDocumentListItem);
};

export const getDocumentById = async (
  userId: string,
  documentId: string,
): Promise<SafeDocument> => {
  ensureValidDocumentId(documentId);

  const document = await findDocumentLeanByIdAndUserId(documentId, userId);

  if (!document) {
    throw new AppError("Document not found", 404);
  }

  return toSafeDocument(document);
};

export const updateDocument = async (
  userId: string,
  documentId: string,
  input: UpdateDocumentInput,
): Promise<SafeDocument> => {
  ensureValidDocumentId(documentId);

  const existingDocument = await findDocumentByIdAndUserId(documentId, userId);

  if (!existingDocument) {
    throw new AppError("Document not found", 404);
  }

  const nextTitle = input.title ?? existingDocument.title;
  const nextRawContent = input.rawContent ?? existingDocument.rawContent;
  const nextDocumentType = input.documentType ?? existingDocument.documentType;
  const nextTemplate = input.template ?? existingDocument.template;

  const contentChanged =
    nextTitle !== existingDocument.title ||
    nextRawContent !== existingDocument.rawContent;

  const processed = contentChanged
    ? processDocumentContent(nextTitle, nextRawContent)
    : {
        cleanedContent: existingDocument.cleanedContent,
        structuredContent: existingDocument.structuredContent,
      };

  const updatedDocument = await updateDocumentByIdAndUserId(
    documentId,
    userId,
    {
      title: nextTitle,
      rawContent: nextRawContent,
      cleanedContent: processed.cleanedContent,
      structuredContent: processed.structuredContent,
      documentType: nextDocumentType,
      template: nextTemplate,
    },
  );

  if (!updatedDocument) {
    throw new AppError("Document not found", 404);
  }

  return toSafeDocument(updatedDocument);
};

export const deleteDocument = async (
  userId: string,
  documentId: string,
): Promise<void> => {
  ensureValidDocumentId(documentId);

  const deletedDocument = await deleteDocumentByIdAndUserId(documentId, userId);

  if (!deletedDocument) {
    throw new AppError("Document not found", 404);
  }
};
