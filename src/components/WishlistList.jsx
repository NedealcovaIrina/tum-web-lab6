import WishlistItem from "./WishlistItem";

const WishlistList = ({ wishlist, onLike, onDelete }) => {
  return (
    <div className="wishlist-list">
      {wishlist.map((item) => (
        <WishlistItem key={item.id} item={item} onLike={onLike} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default WishlistList;
