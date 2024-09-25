/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './App.css';
import './styles/MediaQueries.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const loadCards = useRef(null);

  const checkScroll = useCallback((entries) => {
    const [check] = entries;
    if (check.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(checkScroll, option);

    if (loadCards.current) observer.observe(loadCards.current);
  }, [checkScroll]);

  const getCardsInfo = useCallback(async () => {
    try {
      setLoading(true);

      // Make GET request to get all of the images.
      const response = await fetch(
        `https://fake-api-ruddy-ten.vercel.app/images`,
      );
      const data = await response.json();
      setCards((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 10000);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    getCardsInfo();
  }, [getCardsInfo]);

  return (
    <div className="appContainer">
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="cardsContainer">
        {cards
          // Filtramos la búsqueda en el front
          .filter((card) => {
            if (
              searchTerm === '' ||
              card.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase() ||
                    card.author
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
            ) {
              return card;
            }
            return null;
          })
          .map((cardDetails, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card cardDetails={cardDetails} key={key} />
          ))}
      </div>
      <div className="loaderContainer" ref={loadCards}>
        {loading && <Loader />}
      </div>
      {error && (
        <div className="errorContainer">
          <h6 className="error">Ooops! Looks like something went wrong :(</h6>
        </div>
      )}
    </div>
  );
}

export default App;
