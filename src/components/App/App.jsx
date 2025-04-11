import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { AuthProvider } from "../../context/AuthContext.jsx";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
import { signIn, signUp } from "../../services/authService.js";
import css from "./App.module.css";

function AppContent() {
  const navigate = useNavigate();
  const { user, loading: authLoading, logout } = useAuth();

  const [isLoadingPsychologists, setIsLoadingPsychologists] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoadingPsychologists(false), 1000); // тимчасово
  }, []);

  const handleLogin = async ({ name, email, password }) => {
    try {
      await signIn(name, email, password);
      setIsLoginOpen(false);
      navigate("/psychologists");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      await signUp(name, email, password);
      setIsRegisterOpen(false);
      navigate("/psychologists");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleLogout = () => {
    logout(); // очищає user
    navigate("/");
  };

  if (authLoading || isLoadingPsychologists) return <Loader />;

  return (
    <div className={css.appContent}>
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onLoginOpen={() => setIsLoginOpen(true)}
              onRegisterOpen={() => setIsRegisterOpen(true)}
              user={user}
              onLogout={handleLogout}
            />
          }
        >
          <Route
            index
            element={
              <HomePage user={user} setIsRegisterOpen={setIsRegisterOpen} />
            }
          />
          <Route path="/psychologists" element={<PsychologistPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className={css.app}>
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
