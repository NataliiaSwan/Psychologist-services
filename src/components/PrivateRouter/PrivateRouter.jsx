import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ user, onLoginOpen, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && window.location.pathname === "/favorites") {
      onLoginOpen("/favorites");
      navigate("/psychologists");
    }
  }, [user, onLoginOpen, navigate]);

  if (!user) {
    return null;
  }

  return children;
};
export default PrivateRoute;
