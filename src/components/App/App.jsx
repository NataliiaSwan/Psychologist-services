// import { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import HomePage from "../../pages/HomePage/HomePage.jsx";
// import PsychologistPage from "../../pages/PsychologistPage/PsychologistPage.jsx";
// import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage.jsx";
// import Layout from "../../components/Layout/Layout.jsx";
// import Loader from "../../components/Loader/Loader.jsx";
// import { useAuth } from "../../hooks/useAuth.js";
// import { AuthProvider } from "../../context/AuthContext.jsx";
// import LoginModal from "../../components/LoginModal/LoginModal.jsx";
// import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
// import { signIn, signUp } from "../../services/authService.js";
// import css from "./App.module.css";

// function AppContent() {
//   const navigate = useNavigate();
//   const { user, loading: authLoading, logout } = useAuth();

//   const [isLoadingPsychologists, setIsLoadingPsychologists] = useState(true);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoadingPsychologists(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     // Якщо користувач авторизований, автоматично переходимо на психологів
//     if (user) {
//       navigate("/psychologists", { replace: true });
//     }
//   }, [user, navigate]);

//   const handleLogin = async (credentials) => {
//     const { email, password } = credentials;
//     try {
//       await signIn(email, password);
//       setIsLoginOpen(false);
//       navigate("/psychologists");
//     } catch (error) {
//       alert(`Login error: ${error.message}`);
//     }
//   };

//   const handleRegister = async (credentials) => {
//     const { name, email, password } = credentials;
//     try {
//       await signUp(name, email, password);
//       setIsRegisterOpen(false);
//       navigate("/psychologists");
//     } catch (error) {
//       if (error.code === "auth/email-already-in-use") {
//         alert(
//           "Ця електронна адреса вже використовується. Будь ласка, виберіть іншу."
//         );
//       } else {
//         alert(`Помилка реєстрації: ${error.message}`);
//       }
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   if (authLoading || isLoadingPsychologists) return <Loader />;

//   return (
//     <div className={css.appContent}>
//       {isLoginOpen && (
//         <LoginModal
//           onClose={() => setIsLoginOpen(false)}
//           onLogin={handleLogin}
//         />
//       )}
//       {isRegisterOpen && (
//         <RegisterModal
//           onClose={() => setIsRegisterOpen(false)}
//           onRegister={handleRegister}
//         />
//       )}

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Layout
//               onLoginOpen={() => setIsLoginOpen(true)}
//               onRegisterOpen={() => setIsRegisterOpen(true)}
//               user={user}
//               onLogout={handleLogout}
//             />
//           }
//         >
//           <Route
//             index
//             element={
//               <HomePage user={user} setIsRegisterOpen={setIsRegisterOpen} />
//             }
//           />
//           <Route path="/psychologists" element={<PsychologistPage />} />
//           <Route path="/favorites" element={<FavoritesPage />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <div className={css.app}>
//         <AppContent />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;

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
import { AuthProvider } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function AppContent() {
  const navigate = useNavigate();
  const { user, loading: authLoading, login, register, logout } = useAuth();

  const [isLoadingPsychologists, setIsLoadingPsychologists] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingPsychologists(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async ({ email, password }) => {
    const result = await login(email, password);
    if (result.success) {
      setIsLoginOpen(false);
      navigate("/psychologists");
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
      if (result.message.includes("email-already-in-use")) {
        alert("Ця електронна адреса вже використовується.");
      } else {
        alert(`Помилка реєстрації: ${result.message}`);
      }
    }
  };

  const handleLogout = () => {
    logout();
    // localStorage.removeItem("isRegistered");
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
              <HomePage
                user={user}
                setIsRegisterOpen={setIsRegisterOpen}
                setIsLoginOpen={setIsLoginOpen}
              />
            }
          />
          <Route
            path="/psychologists"
            element={user ? <PsychologistPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/favorites"
            element={user ? <FavoritesPage /> : <Navigate to="/" replace />}
          />
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
