/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/Navbar.css';
import { FiSearch } from 'react-icons/fi';

function Navbar({ setSearchTerm }) {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logo" src="/logo.jpeg" alt="" />
      </div>
      <div className="search">
        <div className="iconContainer">
          <FiSearch className="searchIcon" />
        </div>
        <form className="form">
          <input
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Are you looking for something?"
            aria-label="Search"
          />
        </form>
      </div>
    </div>
  );
}

export default Navbar;
