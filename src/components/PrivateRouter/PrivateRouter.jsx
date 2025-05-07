import { useEffect } from "react";

const PrivateRoute = ({ user, onLoginOpen, children }) => {
  useEffect(() => {
    // Якщо користувач не залогінений і поточна сторінка — /favorites
    if (!user && window.location.pathname === "/favorites") {
      onLoginOpen("/favorites");
    }
  }, [user, onLoginOpen]);

  if (!user) {
    return null;
  }

  return children;
};

export default PrivateRoute;
