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

  // Makes POST request to the API
  const likeImage = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3100/images/${cardDetails.id}/likes`, {
      method: 'POST',
      body: '',
    }).catch((err) => console.log(err));
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
              <p className="counter">
                {cardDetails.likes_count.toString().padStart(3, '0')}
              </p>
              <GrRotateLeft className="icon" />
              <p className="counter">001</p>
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
