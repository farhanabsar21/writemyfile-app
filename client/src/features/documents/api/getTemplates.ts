import { api } from "../../../services/api";
import type { TemplateConfig } from "../types/document.types";

type Response = {
  success: true;
  message: string;
  data: {
    templates: TemplateConfig[];
  };
};

export const getTemplates = async (): Promise<TemplateConfig[]> => {
  const response = await api.get<Response>("/templates");
  return response.data.data.templates;
};
