import { DocumentTemplate } from "../document/document.enums";
import { TemplateMap } from "./template.types";

export const TEMPLATE_CONFIGS: TemplateMap = {
  [DocumentTemplate.PROFESSIONAL]: {
    key: DocumentTemplate.PROFESSIONAL,
    displayName: "Professional",
    page: {
      margin: 50,
    },
    typography: {
      titleSize: 20,
      headingSize: 15,
      bodySize: 11,
      lineGap: 6,
      paragraphGap: 10,
      sectionGap: 14,
    },
  },
  [DocumentTemplate.ACADEMIC]: {
    key: DocumentTemplate.ACADEMIC,
    displayName: "Academic",
    page: {
      margin: 60,
    },
    typography: {
      titleSize: 18,
      headingSize: 14,
      bodySize: 12,
      lineGap: 7,
      paragraphGap: 12,
      sectionGap: 16,
    },
  },
  [DocumentTemplate.MINIMAL]: {
    key: DocumentTemplate.MINIMAL,
    displayName: "Minimal",
    page: {
      margin: 40,
    },
    typography: {
      titleSize: 18,
      headingSize: 14,
      bodySize: 10,
      lineGap: 5,
      paragraphGap: 8,
      sectionGap: 12,
    },
  },
};
