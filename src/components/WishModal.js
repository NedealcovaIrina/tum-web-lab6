import React, { useState } from 'react';
import '../styles/WishModal.css';

const WishModal = ({ isOpen, onClose, onAddWish }) => {
  const [wishData, setWishData] = useState({
    text: '',
    image: null,
    link: '',
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddWish(wishData);
    setWishData({ text: '', image: null, link: '', comments: '' });
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWishData({ ...wishData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Gift</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text">Wish Text</label>
            <input
              type="text"
              id="text"
              value={wishData.text}
              onChange={(e) => setWishData({ ...wishData, text: e.target.value })}
              placeholder="For example: a bag, Audi A7"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="url"
              id="link"
              value={wishData.link}
              onChange={(e) => setWishData({ ...wishData, link: e.target.value })}
              placeholder="A link where you can buy a gift"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              value={wishData.comments}
              onChange={(e) => setWishData({ ...wishData, comments: e.target.value })}
              placeholder="Specify any details of the gift or anything that you consider important."
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="add-button">Add Wish</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WishModal; 