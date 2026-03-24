import { RegisterForm } from "../features/auth/components/RegisterForm";
import { Navbar } from "../components/common/Navbar";

export const RegisterPage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
      <Navbar />
      <main style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
        <h1>Create account</h1>
        <RegisterForm />
      </main>
    </div>
  );
};
