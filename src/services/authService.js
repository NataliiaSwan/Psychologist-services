// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../services/firebase.js";

// // >>> SIGN UP with displayName
// export const signUp = async (name, email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Оновлюємо профіль Firebase — додаємо ім’я
//     await updateProfile(user, {
//       displayName: name,
//     });

//     console.log("User registered", user);
//     return user;
//   } catch (error) {
//     console.error("Registration error:", error.message);
//     throw error;
//   }
// };

// // >>> LOGIN
// export const signIn = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     console.log("User logged in", userCredential.user);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Login error:", error.message);
//     throw error;
//   }
// };

// // >>> LOGOUT
// export const logOut = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out");
//   } catch (error) {
//     console.error("Logout error:", error.message);
//     throw error;
//   }
// };

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase.js";

// >>> SIGN UP with displayName
export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    // Обов’язково оновлюємо дані користувача
    await auth.currentUser.reload();

    console.log("User registered", auth.currentUser);
    return auth.currentUser;
  } catch (error) {
    console.error("Registration error:", error.message);
    throw error;
  }
};

// >>> LOGIN
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// >>> LOGOUT
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};
