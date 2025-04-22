import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, onLoginOpen, children }) => {
  useEffect(() => {
    if (!user) {
      onLoginOpen("/favorites"); // Перенаправляємо після рендеру
    }
  }, [user, onLoginOpen]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
