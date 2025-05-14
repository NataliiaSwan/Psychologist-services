import { useEffect } from "react";

const PrivateRoute = ({ user, onLoginOpen, children }) => {
  useEffect(() => {
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
