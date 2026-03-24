import { Link } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { useAuth } from "../features/auth/hooks/useAuth";
import { Button } from "../components/ui/Button";

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
          display: "grid",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 8 }}>Welcome back, {user?.name}</h1>
          <p style={{ margin: 0, color: "#6b7280" }}>
            Create polished documents from AI-generated text and export them as
            PDF or DOCX.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/documents/new">
            <Button>Create document</Button>
          </Link>
          <Link to="/documents">
            <Button variant="secondary">View documents</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
