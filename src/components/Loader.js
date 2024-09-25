/* eslint-disable react/react-in-jsx-scope */
import '../styles/Loader.css';

function Loader() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className="lds-ripple">
      <div />
      <div />
    </div>
  );
}

export default Loader;
