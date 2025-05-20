import React from 'react';
import '../styles/WishCard.css';

const WishCard = ({ wish, onLike, onDelete, onToggleFulfilled }) => {

  const CheckIcon = ({ isFulfilled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-6 check-icon ${isFulfilled ? 'fulfilled' : ''}`}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="wish-card">
      {wish.image && (
        <div className="wish-image">
          <img src={wish.image} alt={wish.text} />
        </div>
      )}
      <div className="wish-content">
        <h3>{wish.text}</h3>
        {wish.link && (
          <a href={wish.link} target="_blank" rel="noopener noreferrer" className="wish-link">
            View Link
          </a>
        )}
        {wish.comments && <p className="wish-comments">{wish.comments}</p>}
      </div>
      <div className="wish-actions">
        <button 
          className={`like-button ${wish.liked ? 'liked' : ''}`}
          onClick={() => onLike(wish.id)}
          aria-label={wish.liked ? "Unlike wish" : "Like wish"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
        <button
          className="check-button"
          onClick={() => onToggleFulfilled(wish.id)}
          aria-label={wish.fulfilled ? "Mark as unfulfilled" : "Mark as fulfilled"}
        >
          <CheckIcon isFulfilled={wish.fulfilled} />
        </button>
        <button
          className="delete-button"
          onClick={() => onDelete(wish.id)}
          aria-label="Delete wish"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WishCard; 