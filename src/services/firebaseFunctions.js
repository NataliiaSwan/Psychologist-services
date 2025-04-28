import { db } from "./firebase";
import { ref, set, remove, get } from "firebase/database";

export const addToFavorites = async (userId, psychologist) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologist.id}`);
  await set(favRef, psychologist);
};

export const removeFromFavorites = async (userId, psychologistId) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologistId}`);
  await remove(favRef);
};

export const isFavorite = async (userId, psychologistId) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologistId}`);
  const snapshot = await get(favRef);
  return snapshot.exists();
};
