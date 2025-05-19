import { useState, useEffect } from "react";
import WishlistForm from "./components/WishlistForm";
import WishlistList from "./components/WishlistList";
import "./styles/themes.css";

const App = () => {
  // Загружаем сохранённые данные из localStorage
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  // Сохраняем данные в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Управление темой (сохраняется в localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const addItem = (item) => setWishlist([...wishlist, item]);

  const likeItem = (id) => {
    setWishlist(
      wishlist.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const deleteItem = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "🌞 Светлая тема" : "🌙 Тёмная тема"}
      </button>
      <h1>Мой Вишлист 🎁</h1>
      <WishlistForm onAdd={addItem} />
      <WishlistList wishlist={wishlist} onLike={likeItem} onDelete={deleteItem} />
    </div>
  );
};

export default App;
