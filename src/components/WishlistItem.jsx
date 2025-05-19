const WishlistItem = ({ item, onLike, onDelete }) => {
  return (
    <div className="wishlist-item">
      <span>{item.text}</span>
      <button onClick={() => onLike(item.id)}>
        {item.liked ? "❤️" : "🤍"}
      </button>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </div>
  );
};

export default WishlistItem;
