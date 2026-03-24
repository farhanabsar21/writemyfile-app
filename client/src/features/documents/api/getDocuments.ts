import { api } from "../../../services/api";
import type { DocumentListItem } from "../types/document.types";

type Response = {
  success: true;
  message: string;
  data: {
    documents: DocumentListItem[];
  };
};

export const getDocuments = async (): Promise<DocumentListItem[]> => {
  const response = await api.get<Response>("/documents");
  return response.data.data.documents;
};
