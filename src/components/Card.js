/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import '../styles/Card.css';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BiLike } from 'react-icons/bi';
import { GrRotateLeft } from 'react-icons/gr';

function Card({ cardDetails }) {
  const [show, setShow] = useState(false);
  const [likes, setLikes] = useState(cardDetails.likes_count);
  const [isLiked, setIsLiked] = useState(false);

  // Increase image likes when you click the like button
  const likeImage = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  // Unlike image when you click the unlike button
  const unlikeImage = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setShow(!show)}
      onMouseLeave={() => setShow(!show)}
    >
      <div className="cardHeader">
        <CSSTransition in={show} timeout={1000} classNames="card" unmountOnExit>
          <div className={`overlay ${show}`}>
            <div className="overlayPrice">
              <div className="priceContainer">
                <p className="priceText">
                  {cardDetails.price.toFixed(2)}
                  <sub>€</sub>
                </p>
              </div>
            </div>
            <div className="buttons">
              <BiLike className="icon" onClick={likeImage} />
              <p className="counter">{likes.toString().padStart(3, '0')}</p>
              {isLiked && (
                <GrRotateLeft className="icon" onClick={unlikeImage} />
              )}
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={show} timeout={1000} classNames="card" unmountOnExit>
          <div className={`overlayImg ${show}`} />
        </CSSTransition>
        <img
          className="img"
          key={`${cardDetails.id}}`}
          src={cardDetails.main_attachment.big}
          alt=""
        />
      </div>
      <div className="cardBody">
        <h2 className="cardTitle">{cardDetails.title.toUpperCase()}</h2>
        <h5 className="cardSubtitle">
          <span>by</span> {cardDetails.author}
        </h5>
      </div>
    </div>
  );
}

export default Card;
