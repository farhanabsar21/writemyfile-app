import { api } from "../../../services/api";
import type { DocumentItem } from "../types/document.types";

type Response = {
  success: true;
  message: string;
  data: {
    document: DocumentItem;
  };
};

export const getDocumentById = async (id: string): Promise<DocumentItem> => {
  const response = await api.get<Response>(`/documents/${id}`);
  return response.data.data.document;
};
