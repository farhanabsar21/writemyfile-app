import { LoginForm } from "../features/auth/components/LoginForm";
import { Navbar } from "../components/common/Navbar";

export const LoginPage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Navbar />
      <main style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
        <h1>Login</h1>
        <LoginForm />
      </main>
    </div>
  );
};
