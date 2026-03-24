import { Link } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Button } from "../components/ui/Button";

export const LandingPage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Navbar />
      <main style={{ maxWidth: 980, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, display: "grid", gap: 18 }}>
          <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0 }}>
            Turn AI conversations into professional documents
          </h1>

          <p style={{ fontSize: 18, color: "#4b5563", margin: 0 }}>
            writemyfile helps you convert raw AI-generated text into polished,
            structured PDF and DOCX files that are ready to share, submit, or
            edit.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
