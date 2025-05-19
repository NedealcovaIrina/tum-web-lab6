import { useState, useEffect } from "react";
import WishModal from "./components/WishModal";
import WishCard from "./components/WishCard";
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addWish = (wishData) => {
    const newWish = {
      id: Date.now(),
      ...wishData,
      liked: false
    };
    setWishlist([newWish, ...wishlist]);
  };

  const likeWish = (id) => {
    setWishlist(
      wishlist.map((wish) =>
        wish.id === id ? { ...wish, liked: !wish.liked } : wish
      ).sort((a, b) => {
        if (a.liked === b.liked) {
          return b.id - a.id; // Sort by newest first when liked status is the same
        }
        return a.liked ? -1 : 1; // Liked items go to the top
      })
    );
  };

  const deleteWish = (id) => {
    setWishlist(wishlist.filter((wish) => wish.id !== id));
  };

  return (
    <div className={`App ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="app-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "🌞 Light Theme" : "🌙 Dark Theme"}
        </button>
        <h1>My Wishlist 🎁</h1>
        <button className="add-wish-button" onClick={() => setIsModalOpen(true)}>
          Add New Wish
        </button>
      </div>

      <div className="wishlist-container">
        {wishlist.map((wish) => (
          <WishCard
            key={wish.id}
            wish={wish}
            onLike={likeWish}
            onDelete={deleteWish}
          />
        ))}
      </div>

      <WishModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWish={addWish}
      />
    </div>
  );
};

export default App;
