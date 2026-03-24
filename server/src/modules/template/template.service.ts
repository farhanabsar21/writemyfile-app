import { AppError } from "../../common/errors/AppError";
import { DocumentTemplate } from "../document/document.enums";
import { TEMPLATE_CONFIGS } from "./template.constants";
import { TemplateConfig } from "./template.types";

export const getTemplateConfig = (
  template: DocumentTemplate,
): TemplateConfig => {
  const config = TEMPLATE_CONFIGS[template];

  if (!config) {
    throw new AppError("Template not found", 404);
  }

  return config;
};

export const getAllTemplateConfigs = (): TemplateConfig[] => {
  return Object.values(TEMPLATE_CONFIGS);
};
