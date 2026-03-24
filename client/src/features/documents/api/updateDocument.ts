import { api } from "../../../services/api";
import type { DocumentItem } from "../types/document.types";

type Response = {
  success: true;
  message: string;
  data: {
    document: DocumentItem;
  };
};

export const updateDocument = async (
  id: string,
  payload: Partial<{
    title: string;
    rawContent: string;
    documentType: DocumentItem["documentType"];
    template: DocumentItem["template"];
  }>,
): Promise<DocumentItem> => {
  const response = await api.put<Response>(`/documents/${id}`, payload);
  return response.data.data.document;
};
