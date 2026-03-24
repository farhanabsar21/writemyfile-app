export type TemplateConfig = {
  key: "professional" | "academic" | "minimal";
  displayName: string;
  page: {
    margin: number;
  };
  typography: {
    titleSize: number;
    headingSize: number;
    bodySize: number;
    lineGap: number;
    paragraphGap: number;
    sectionGap: number;
  };
};

export type StructuredSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StructuredDocument = {
  title: string;
  sections: StructuredSection[];
};

export type DocumentListItem = {
  id: string;
  title: string;
  documentType:
    | "report"
    | "assignment"
    | "proposal"
    | "letter"
    | "meeting-summary";
  template: "professional" | "academic" | "minimal";
  status: "draft" | "processed";
  createdAt?: string;
  updatedAt?: string;
};

export type DocumentItem = {
  id: string;
  userId: string;
  title: string;
  rawContent: string;
  cleanedContent: string;
  structuredContent: StructuredDocument;
  documentType:
    | "report"
    | "assignment"
    | "proposal"
    | "letter"
    | "meeting-summary";
  template: "professional" | "academic" | "minimal";
  status: "draft" | "processed";
  createdAt?: string;
  updatedAt?: string;
};
