import { api } from "../../../services/api";

type Response = {
  success: true;
  message: string;
};

export const deleteDocument = async (id: string): Promise<void> => {
  await api.delete<Response>(`/documents/${id}`);
};
