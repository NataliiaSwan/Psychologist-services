import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import HomePage from "../../pages/HomePage/HomePage.jsx";
import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
import PrivateRoute from "../../components/PrivateRouter/PrivateRouter.jsx";

import { useAuth } from "../../hooks/useAuth.js";
import { AuthProvider } from "../../context/AuthContext.jsx";
import { getFavorites } from "../../services/firebaseFunctions.js";
import { FavoritesProvider } from "../../context/FavoritesContext.jsx";

import css from "./App.module.css";

// function AppContent() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, loading: authLoading, login, register, logout } = useAuth();

//   const [showInitialLoader, setShowInitialLoader] = useState(true);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//   const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowInitialLoader(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleLogin = async ({ email, password }) => {
//     const result = await login(email, password);
//     if (result.success) {
//       const user = result.user;
//       const favorites = await getFavorites(user.uid);
//       localStorage.setItem("favorites", JSON.stringify(favorites));
//       setIsLoginOpen(false);
//       navigate(redirectAfterLogin || "/psychologists");
//       setRedirectAfterLogin(null);
//     } else {
//       alert(`Помилка входу: ${result.message}`);
//     }
//   };

//   const handleRegister = async ({ name, email, password }) => {
//     const result = await register(name, email, password);
//     if (result.success) {
//       localStorage.setItem("isRegistered", "true");
//       setIsRegisterOpen(false);
//       navigate("/psychologists");
//     } else {
//       const msg = result.message.includes("email-already-in-use")
//         ? "Ця електронна адреса вже використовується."
//         : `Помилка реєстрації: ${result.message}`;
//       alert(msg);
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     localStorage.removeItem("isRegistered");

//     navigate("/");
//   };

//   const handleCloseLogin = () => {
//     setRedirectAfterLogin(null);
//     setIsLoginOpen(false);
//   };

//   const handleCloseRegister = () => {
//     setIsRegisterOpen(false);
//   };

//   if (authLoading || showInitialLoader) return <Loader />;

//   const layoutElement = (
//     <Layout
//       onLoginOpen={() => setIsLoginOpen(true)}
//       onRegisterOpen={() => setIsRegisterOpen(true)}
//       user={user}
//       onLogout={handleLogout}
//     />
//   );

//   return (
//     <>
//       <AnimatePresence>
//         {isLoginOpen && (
//           <LoginModal onClose={handleCloseLogin} onLogin={handleLogin} />
//         )}
//         {isRegisterOpen && (
//           <RegisterModal
//             onClose={handleCloseRegister}
//             onRegister={handleRegister}
//           />
//         )}
//       </AnimatePresence>

//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={layoutElement}>
//           <Route
//             index
//             element={
//               <HomePage
//                 user={user}
//                 setIsLoginOpen={setIsLoginOpen}
//                 setIsRegisterOpen={setIsRegisterOpen}
//               />
//             }
//           />
//           <Route path="/psychologists" element={<PsychologistPage />} />
//           <Route
//             path="/favorites"
//             element={
//               <PrivateRoute
//                 user={user}
//                 onLoginOpen={(path) => {
//                   setRedirectAfterLogin(path);
//                   setIsLoginOpen(true);
//                 }}
//               >
//                 <FavoritesPage />
//               </PrivateRoute>
//             }
//           />
//         </Route>
//       </Routes>
//     </>
//   );
// }

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading: authLoading, login, register, logout } = useAuth();

  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowInitialLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && isLoginOpen) {
      setIsLoginOpen(false);
      navigate(redirectAfterLogin || "/psychologists");
      setRedirectAfterLogin(null);
    }
  }, [user, isLoginOpen, redirectAfterLogin, navigate]);

  const handleLogin = async ({ email, password }) => {
    const result = await login(email, password);
    if (result.success) {
      const user = result.user;
      const favorites = await getFavorites(user.uid);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      // Перенесено navigate і закриття модалки в useEffect
    } else {
      alert(`Помилка входу: ${result.message}`);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    const result = await register(name, email, password);
    if (result.success) {
      localStorage.setItem("isRegistered", "true");
      setIsRegisterOpen(false);
      navigate("/psychologists");
    } else {
      const msg = result.message.includes("email-already-in-use")
        ? "Ця електронна адреса вже використовується."
        : `Помилка реєстрації: ${result.message}`;
      alert(msg);
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("isRegistered");
    navigate("/");
  };

  const handleCloseLogin = () => {
    setRedirectAfterLogin(null);
    setIsLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  if (authLoading || showInitialLoader) return <Loader />;

  const layoutElement = (
    <Layout
      onLoginOpen={() => setIsLoginOpen(true)}
      onRegisterOpen={() => setIsRegisterOpen(true)}
      user={user}
      onLogout={handleLogout}
    />
  );

  return (
    <>
      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal onClose={handleCloseLogin} onLogin={handleLogin} />
        )}
        {isRegisterOpen && (
          <RegisterModal
            onClose={handleCloseRegister}
            onRegister={handleRegister}
          />
        )}
      </AnimatePresence>

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={layoutElement}>
          <Route
            index
            element={
              <HomePage
                user={user}
                setIsLoginOpen={setIsLoginOpen}
                setIsRegisterOpen={setIsRegisterOpen}
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
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <div className={css.app}>
          <AppContent />
        </div>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
