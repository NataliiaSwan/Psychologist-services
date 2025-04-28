import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
import css from "./App.module.css";
import { AuthProvider } from "../../context/AuthContext.jsx";
import PrivateRoute from "../../components/PrivateRouter/PrivateRouter.jsx";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

function AppContent() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login, register, logout } = useAuth();

  const [isLoadingPsychologists, setIsLoadingPsychologists] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingPsychologists(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async ({ email, password }) => {
    const result = await login(email, password);

    if (result.success) {
      setIsLoginOpen(false);

      if (redirectAfterLogin) {
        navigate(redirectAfterLogin);
        setRedirectAfterLogin(null);
      } else {
        navigate("/psychologists");
      }
    } else {
      alert(`Помилка входу: ${result.message}`);
    }
  };

  const handleCloseLogin = () => {
    setRedirectAfterLogin(null);
    setIsLoginOpen(false);
  };

  const handleRegister = async ({ name, email, password }) => {
    const result = await register(name, email, password);
    if (result.success) {
      localStorage.setItem("isRegistered", "true");
      setIsRegisterOpen(false);
      navigate("/psychologists");
    } else {
      if (result.message.includes("email-already-in-use")) {
        alert("Ця електронна адреса вже використовується.");
      } else {
        alert(`Помилка реєстрації: ${result.message}`);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("isRegistered");
    console.log("logout: isRegistered removed");
    navigate("/");
  };

  if (authLoading || isLoadingPsychologists) return <Loader />;

  return (
    <div className={css.appContent}>
      {isLoginOpen && (
        <LoginModal onClose={handleCloseLogin} onLogin={handleLogin} />
      )}

      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onRegister={handleRegister}
        />
      )}
      {/* <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="page" timeout={500}> */}
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
              <HomePage
                user={user}
                setIsRegisterOpen={setIsRegisterOpen}
                setIsLoginOpen={setIsLoginOpen}
              />
            }
          />
          <Route path="/psychologists" element={<PsychologistPage />} />

          <Route
            path="/favorites"
            element={
              <PrivateRoute
                user={user}
                onLoginOpen={(path) => {
                  setRedirectAfterLogin(path);
                  setIsLoginOpen(true);
                }}
              >
                <FavoritesPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      {/* </CSSTransition>
      </TransitionGroup> */}
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
