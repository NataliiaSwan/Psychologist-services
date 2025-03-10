import { getDatabase, ref, get } from "firebase/database";

// Функція для отримання психологів з Realtime Database
export const fetchPsychologists = async () => {
  const dbRef = ref(getDatabase(), "psychologists");
  const snapshot = await get(dbRef);

  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};
