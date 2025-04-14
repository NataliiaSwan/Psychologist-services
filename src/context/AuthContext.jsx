// import { createContext, useState, useEffect } from "react";
// import { auth } from "../services/firebase";
// import { signUp, signIn, logOut } from "../services/authService.js";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       await signIn(email, password);
//       return { success: true };
//     } catch (error) {
//       setError(error.message);
//       return { success: false, message: error.message };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       await signUp(name, email, password);
//       return { success: true };
//     } catch (error) {
//       setError(error.message);
//       return { success: false, message: error.message };
//     }
//   };

//   const logout = async () => {
//     try {
//       await logOut();
//       localStorage.removeItem("favorites");
//     } catch (error) {
//       console.error("Exit error:", error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, register, loading, error }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { signIn, signUp, logOut } from "../services/authService";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const loggedInUser = await signIn(email, password);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const newUser = await signUp(name, email, password);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      await logOut();
      setUser(null);
      localStorage.removeItem("favorites");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
