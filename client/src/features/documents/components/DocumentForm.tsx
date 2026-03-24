import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDocument } from "../api/createDocument";
import { getTemplates } from "../api/getTemplates";
import { updateDocument } from "../api/updateDocument";
import type { DocumentItem, TemplateConfig } from "../types/document.types";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Textarea } from "../../../components/ui/Textarea";
import { ErrorState } from "../../../components/feedback/ErrorState";
import { Loader } from "../../../components/feedback/Loader";

type Props = {
  mode?: "create" | "edit";
  initialValues?: Partial<DocumentItem>;
  documentId?: string;
};

export const DocumentForm = ({
  mode = "create",
  initialValues,
  documentId,
}: Props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [rawContent, setRawContent] = useState(initialValues?.rawContent ?? "");
  const [documentType, setDocumentType] = useState<
    "report" | "assignment" | "proposal" | "letter" | "meeting-summary"
  >((initialValues?.documentType as any) ?? "report");
  const [template, setTemplate] = useState<
    "professional" | "academic" | "minimal"
  >((initialValues?.template as any) ?? "professional");
  const [templates, setTemplates] = useState<TemplateConfig[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await getTemplates();
        setTemplates(response);

        if (!initialValues?.template && response.length > 0) {
          setTemplate(response[0].key);
        }
      } catch {
        setErrorMessage("Failed to load templates");
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    void loadTemplates();
  }, [initialValues?.template]);

  useEffect(() => {
    setTitle(initialValues?.title ?? "");
    setRawContent(initialValues?.rawContent ?? "");
    setDocumentType(
      (initialValues?.documentType as
        | "report"
        | "assignment"
        | "proposal"
        | "letter"
        | "meeting-summary") ?? "report",
    );
    setTemplate(
      (initialValues?.template as "professional" | "academic" | "minimal") ??
        "professional",
    );
  }, [
    initialValues?.title,
    initialValues?.rawContent,
    initialValues?.documentType,
    initialValues?.template,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!title.trim() || !rawContent.trim()) {
      setErrorMessage("Title and content are required");
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === "edit") {
        if (!documentId) {
          throw new Error("Document id is required for editing");
        }

        const document = await updateDocument(documentId, {
          title,
          rawContent,
          documentType,
          template,
        });

        navigate(`/documents/${document.id}`);
      } else {
        const document = await createDocument({
          title,
          rawContent,
          documentType,
          template,
        });

        navigate(`/documents/${document.id}`);
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ??
          (mode === "edit"
            ? "Failed to update document"
            : "Failed to create document"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingTemplates) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 18,
        background: "#ffffff",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #e5e7eb",
      }}
    >
      <div>
        <label>Document title</label>
        <Input
          placeholder="Document title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label>Document type</label>
        <Select
          value={documentType}
          onChange={(e) =>
            setDocumentType(e.target.value as typeof documentType)
          }
        >
          <option value="report">Report</option>
          <option value="assignment">Assignment</option>
          <option value="proposal">Proposal</option>
          <option value="letter">Letter</option>
          <option value="meeting-summary">Meeting Summary</option>
        </Select>
      </div>

      <div>
        <label>Template</label>
        <Select
          value={template}
          onChange={(e) => setTemplate(e.target.value as typeof template)}
        >
          {templates.map((item) => (
            <option key={item.key} value={item.key}>
              {item.displayName}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label>AI-generated content</label>
        <Textarea
          placeholder="Paste AI-generated content here..."
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
        />
      </div>

      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? mode === "edit"
            ? "Saving..."
            : "Generating..."
          : mode === "edit"
            ? "Save changes"
            : "Create document"}
      </Button>
    </form>
  );
};
