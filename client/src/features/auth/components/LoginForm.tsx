import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ErrorState } from "../../../components/feedback/ErrorState";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await loginUser({ email, password });
      setAuth(result);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ?? "Login failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gap: 16,
        maxWidth: 420,
        background: "#ffffff",
        padding: 24,
        borderRadius: 16,
        border: "1px solid #e5e7eb",
      }}
    >
      <div>
        <label>Email</label>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errorMessage ? <ErrorState message={errorMessage} /> : null}

      <Button type="submit" disabled={isSubmitting} fullWidth>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};
