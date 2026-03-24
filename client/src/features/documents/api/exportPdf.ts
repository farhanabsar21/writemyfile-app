import { api } from "../../../services/api";

const getFileNameFromDisposition = (value?: string): string => {
  if (!value) return "document.pdf";

  const match = value.match(/filename="(.+)"/);
  return match?.[1] ?? "document.pdf";
};

export const exportPdf = async (
  id: string,
): Promise<{
  blob: Blob;
  fileName: string;
}> => {
  const response = await api.post(`/documents/${id}/export/pdf`, undefined, {
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
