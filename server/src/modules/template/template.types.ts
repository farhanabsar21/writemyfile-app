import { DocumentTemplate } from "../document/document.enums";

export type TemplateConfig = {
  key: DocumentTemplate;
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

export type TemplateMap = Record<DocumentTemplate, TemplateConfig>;
