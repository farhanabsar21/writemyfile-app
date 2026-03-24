import { api } from "../../../services/api";

const getFileNameFromDisposition = (value?: string): string => {
  if (!value) return "document.docx";

  const match = value.match(/filename="(.+)"/);
  return match?.[1] ?? "document.docx";
};

export const exportDocx = async (
  id: string,
): Promise<{
  blob: Blob;
  fileName: string;
}> => {
  const response = await api.post(`/documents/${id}/export/docx`, undefined, {
    responseType: "blob",
  });

  const disposition = response.headers["content-disposition"] as
    | string
    | undefined;

  return {
    blob: response.data,
    fileName: getFileNameFromDisposition(disposition),
  };
};
