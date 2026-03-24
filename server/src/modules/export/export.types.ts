import { SafeDocument } from "../document/document.types";
import { TemplateConfig } from "../template/template.types";

export type ExportPayload = {
  document: SafeDocument;
  templateConfig: TemplateConfig;
};

export type GeneratedFile = {
  buffer: Buffer;
  fileName: string;
  contentType: string;
};
