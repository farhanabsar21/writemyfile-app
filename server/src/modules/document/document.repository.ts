import { FilterQuery } from "mongoose";
import { DocumentModel, Document } from "./document.model";
import {
  DocumentStatus,
  DocumentTemplate,
  DocumentType,
} from "./document.enums";
import { StructuredDocument } from "./document.types";

type CreateDocumentRecordInput = {
  userId: string;
  title: string;
  rawContent: string;
  cleanedContent: string;
  structuredContent: StructuredDocument;
  documentType: DocumentType;
  template: DocumentTemplate;
  status: DocumentStatus;
};

export const createDocumentRecord = async (
  payload: CreateDocumentRecordInput,
) => {
  return DocumentModel.create(payload);
};

export const findDocumentsByUserId = async (userId: string) => {
  return DocumentModel.find({ userId })
    .select("title documentType template status createdAt updatedAt")
    .sort({ createdAt: -1 })
    .lean();
};

export const findDocumentByIdAndUserId = async (id: string, userId: string) => {
  return DocumentModel.findOne({ _id: id, userId });
};

export const findDocumentLeanByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  return DocumentModel.findOne({ _id: id, userId }).lean();
};

export const updateDocumentByIdAndUserId = async (
  id: string,
  userId: string,
  update: FilterQuery<Document>,
) => {
  return DocumentModel.findOneAndUpdate({ _id: id, userId }, update, {
    new: true,
  });
};

export const deleteDocumentByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  return DocumentModel.findOneAndDelete({ _id: id, userId });
};
