// import { Outlet, useNavigate } from "react-router-dom";
// import Header from "../Header/Header.jsx";
// import { useState } from "react";
// import LoginModal from "../../components/LoginModal/LoginModal.jsx";
// import RegisterModal from "../../components/RegisterModal/RegisterModal.jsx";
// // import css from "./Layout.module.css";

// const Layout = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

//   const navigate = useNavigate();

//   // ✅ Окремі функції для відкриття модалок
//   function handleOpenLoginModal() {
//     setIsLoginModalOpen(true);
//   }

//   function handleOpenRegisterModal() {
//     setIsRegisterModalOpen(true);
//   }

//   // ✅ Функція логування (закриває модалку після логіну)
//   function handleLogin() {
//     setIsAuthenticated(true);
//     setUserName("User");
//     setIsLoginModalOpen(false); // Закриваємо модальне вікно
//     navigate("/psychologists");
//   }

//   // ✅ Функція реєстрації (закриває модалку після реєстрації)
//   function handleRegister() {
//     setIsAuthenticated(true);
//     setUserName("User");
//     setIsRegisterModalOpen(false); // Закриваємо модальне вікно
//     navigate("/psychologists");
//   }

//   function handleLogout() {
//     setIsAuthenticated(false);
//     setUserName("");
//     navigate("/");
//   }

//   return (
//     <>
//       <Header
//         isAuthenticated={isAuthenticated}
//         userName={userName}
//         onLogin={handleOpenLoginModal} // ✅ Передаємо функцію відкриття
//         onLogout={handleLogout}
//         onRegister={handleOpenRegisterModal} // ✅ Передаємо функцію відкриття
//       />

//       <main>
//         <Outlet />
//       </main>

//       {/* ✅ Модальні вікна відкриваються лише при натисканні кнопки */}
//       {isLoginModalOpen && (
//         <LoginModal
//           onClose={() => setIsLoginModalOpen(false)} // ✅ Закриває модалку після натискання
//           onLogin={handleLogin} // ✅ Логіниться і закриває модалку
//         />
//       )}

//       {isRegisterModalOpen && (
//         <RegisterModal
//           onClose={() => setIsRegisterModalOpen(false)} // ✅ Закриває модалку
//           onRegister={handleRegister} // ✅ Реєструє і закриває модалку
//         />
//       )}
//     </>
//   );
// };

// export default Layout;

import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";

const Layout = ({ onLoginOpen, onRegisterOpen, user, onLogout }) => {
  return (
    <>
      <Header
        isAuthenticated={!!user}
        userName={user?.name || "User"}
        onLogin={onLoginOpen}
        onLogout={onLogout}
        onRegister={onRegisterOpen}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
