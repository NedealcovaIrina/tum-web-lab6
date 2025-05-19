import { useState } from "react";

const WishlistForm = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ id: Date.now(), text, liked: false });
    setText(""); // Очистить поле
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите желание..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default WishlistForm;
