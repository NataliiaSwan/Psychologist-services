import { db } from "./firebase";
import { ref, set, remove, get } from "firebase/database";

// Функція для додавання психолога до обраних
export const addToFavorites = async (userId, psychologist) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologist.id}`);
  await set(favRef, psychologist);
};

// Функція для видалення психолога з обраних
export const removeFromFavorites = async (userId, psychologistId) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologistId}`);
  await remove(favRef);
};

// Функція для перевірки, чи є психолог у обраних
export const isFavorite = async (userId, psychologistId) => {
  const favRef = ref(db, `users/${userId}/favorites/${psychologistId}`);
  const snapshot = await get(favRef);
  return snapshot.exists();
};
