import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { AuthProvider } from "../../context/AuthContext.jsx";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
import { signIn, signUp } from "../../services/authService.js";
import css from "./App.module.css";

function AppContent() {
  const { loading: authLoading } = useAuth();
  const [isLoadingPsychologists, setIsLoadingPsychologists] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoadingPsychologists(false), 2000);
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      await signIn(email, password);
      setIsLoginOpen(false);
    } catch (error) {
      console.error("Помилка входу:", error.message);
    }
  };

  const handleRegister = async ({ email, password }) => {
    try {
      await signUp(email, password);
      setIsRegisterOpen(false);
    } catch (error) {
      console.error("Помилка реєстрації:", error.message);
    }
  };

  if (authLoading || isLoadingPsychologists) return <Loader />;

  return (
    <div className={css.appContent}>
      <button onClick={() => setIsLoginOpen(true)}>Log In</button>
      <button onClick={() => setIsRegisterOpen(true)}>Sign Up</button>

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
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
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
