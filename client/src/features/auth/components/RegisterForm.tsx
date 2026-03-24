import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/register";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ErrorState } from "../../../components/feedback/ErrorState";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await registerUser({ name, email, password });
      setAuth(result);
      navigate("/dashboard");
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message ??
          "Registration failed. Please try again.",
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
        <label>Full name</label>
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
};
