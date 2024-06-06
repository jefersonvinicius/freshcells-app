import { Navigate } from "react-router-dom";
import { useUserDetailsQuery } from "../../queries/user-details";
import { useAuth } from "../../state/auth";
import { useTranslation } from "react-i18next";

import "./styles.css";

export default function AccountDetailsPage() {
  const { t } = useTranslation();
  const { authData, logout } = useAuth();
  const { user, isLoadingUser, errorOnUser } = useUserDetailsQuery();

  if (!authData) return <Navigate to="/" replace />;

  return (
    <div className="account-container">
      <h2 className="title">{t("accountDetails")}</h2>
      {isLoadingUser ? (
        <span className="loading">{t("loading")}</span>
      ) : (
        <>
          {errorOnUser && <span className="error">{t("userLoadError")}</span>}
          <div className="user-details">
            <div className="user-detail">
              <span className="label">{t("firstName")}</span>
              <input
                value={user?.firstName}
                name="firstName"
                disabled
                aria-label="firstName"
                className="input"
              />
            </div>
            <div className="user-detail">
              <span className="label">{t("lastName")}</span>
              <input
                value={user?.lastName}
                name="lastName"
                disabled
                aria-label="lastName"
                className="input"
              />
            </div>
          </div>
          <button onClick={logout} className="button">
            {t("logout")}
          </button>
        </>
      )}
    </div>
  );
}
