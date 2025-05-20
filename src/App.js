import { useState, useEffect } from "react";
import WishModal from "./components/WishModal";
import WishCard from "./components/WishCard";
import "./styles/themes.css";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="theme-icon">
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="plus-icon">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
  </svg>
);

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
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const addWish = (wishData) => {
    const newWish = {
      id: Date.now(),
      ...wishData,
      liked: false,
      fulfilled: false
    };
    setWishlist([newWish, ...wishlist]);
  };

  const likeWish = (id) => {
    setWishlist(prevWishlist =>
      prevWishlist.map((wish) =>
        wish.id === id ? { ...wish, liked: !wish.liked } : wish
      ).sort((a, b) => {
        // Sorting logic based on your hierarchy
        const getOrderScore = (wish) => {
          if (wish.liked && !wish.fulfilled) return 1;
          if (!wish.liked && !wish.fulfilled) return 2;
          if (wish.liked && wish.fulfilled) return 3;
          if (!wish.liked && wish.fulfilled) return 4;
          return 5;
        };
        const scoreA = getOrderScore(a);
        const scoreB = getOrderScore(b);
        if (scoreA !== scoreB) {
          return scoreA - scoreB;
        }
        return b.id - a.id; // Tertiary sort: by newest first
      })
    );
  };

  const deleteWish = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter((wish) => wish.id !== id));
    // No sort needed after deletion, new items are added at the beginning
  };

  const toggleFulfilled = (id) => {
    setWishlist(prevWishlist =>
      prevWishlist.map((wish) =>
        wish.id === id ? { ...wish, fulfilled: !wish.fulfilled } : wish
      ).sort((a, b) => {
        // Sorting logic based on your hierarchy
        const getOrderScore = (wish) => {
          if (wish.liked && !wish.fulfilled) return 1;
          if (!wish.liked && !wish.fulfilled) return 2;
          if (wish.liked && wish.fulfilled) return 3;
          if (!wish.liked && wish.fulfilled) return 4;
          return 5;
        };
        const scoreA = getOrderScore(a);
        const scoreB = getOrderScore(b);
        if (scoreA !== scoreB) {
          return scoreA - scoreB;
        }
        return b.id - a.id; // Tertiary sort: by newest first
      })
    );
  };

  return (
    <div className={`App ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="app-header">
        <h1 className="wishlist-title">My Wishlist</h1>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search wishes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="wish-search-input"
        />
      </div>

      <div className="add-wish-row">
        <button className="add-wish-oval" onClick={() => setIsModalOpen(true)} aria-label="Add new gift">
          Add New Gift
        </button>
      </div>

      <div className="wishlist-container">
        {wishlist
          .filter(wish =>
            wish.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((wish) => (
            <WishCard
              key={wish.id}
              wish={wish}
              onLike={likeWish}
              onDelete={deleteWish}
              onToggleFulfilled={toggleFulfilled}
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
