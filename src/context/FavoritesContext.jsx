import { createContext, useContext, useState, useEffect } from "react";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../services/firebaseFunctions";
import { useAuth } from "../hooks/useAuth";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favs = await getFavorites(user.uid);
        setFavorites(favs);
        localStorage.setItem("favorites", JSON.stringify(favs));
      } else {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
      }
    };

    loadFavorites();
  }, [user]);

  const addFavorite = async (psychologist) => {
    if (!user) return;
    await addToFavorites(user.uid, psychologist);
    const updated = [...favorites, psychologist];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = async (psychologistId) => {
    if (!user) return;
    await removeFromFavorites(user.uid, psychologistId);
    const updated = favorites.filter((fav) => fav.id !== psychologistId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
