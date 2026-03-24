import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Button } from "../ui/Button";

export const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link
        to="/"
        style={{
          fontWeight: 800,
          fontSize: 20,
          textDecoration: "none",
          color: "#111827",
        }}
      >
        writemyfile
      </Link>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: "#4b5563" }}>{user?.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/documents">Documents</Link>
            <Link to="/documents/new">New</Link>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};
