import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase.js";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Користувач зареєстрований", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Помилка реєстрації", error.message);
    throw error;
  }
};
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Користувач увійшов", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log("Помилка входу", error.message);
    throw error;
  }
};
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Користувач вийшов");
  } catch (error) {
    console.log("Помилка входу", error.message);
    throw error;
  }
};
