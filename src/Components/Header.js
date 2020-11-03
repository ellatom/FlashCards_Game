import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Flash Cards
        </Link>
        <div className="left menu">
        <Link to="/managecards" className="item">
          Manage Cards
        </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
