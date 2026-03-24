import {
  DocumentStatus,
  DocumentTemplate,
  DocumentType,
} from "./document.enums";

export type StructuredSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StructuredDocument = {
  title: string;
  sections: StructuredSection[];
};

export type SafeDocument = {
  id: string;
  userId: string;
  title: string;
  rawContent: string;
  cleanedContent: string;
  structuredContent: StructuredDocument;
  documentType: DocumentType;
  template: DocumentTemplate;
  status: DocumentStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type DocumentListItem = {
  id: string;
  title: string;
  documentType: DocumentType;
  template: DocumentTemplate;
  status: DocumentStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProcessedDocumentContent = {
  cleanedContent: string;
  structuredContent: StructuredDocument;
};
