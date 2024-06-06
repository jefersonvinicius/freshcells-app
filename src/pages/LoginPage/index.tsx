import { useMemo, useState } from "react";
import { API, InvalidCredentialsError, LoginPayload } from "../../services/api";
import { useAuth } from "../../state/auth";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./styles.css";

export default function LoginPage() {
  const { t } = useTranslation();
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { authData, login } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries()) as LoginPayload;
    try {
      setError(null);
      setIsLogging(true);
      const result = await API.login(payload);
      login(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLogging(false);
    }
  }

  const errorMessage = useMemo(() => {
    if (error instanceof InvalidCredentialsError)
      return t("invalidCredentialsError");
    if (error) return t("unexpectedLoginError");

    return null;
  }, [error, t]);

  if (authData) return <Navigate to="/details" replace />;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="title">Login</h2>
        <input
          name="email"
          placeholder={t("email")}
          required
          type="email"
          aria-label="email"
          className="input"
        />
        <input
          name="password"
          placeholder={t("password")}
          required
          type="password"
          aria-label="password"
          className="input mt-1"
        />
        <button type="submit" disabled={isLogging} className="button mt-2">
          {isLogging ? t("logging") : t("login")}
        </button>
        {!!errorMessage && <p className="error mt-1">{errorMessage}</p>}
      </form>
    </div>
  );
}
