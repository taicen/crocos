import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="x-header">
    <div className="is-navbar-container">
    <div className="is-brand">
        <b className="is-logo">Brand</b>
    </div>
    <div className="is-navbar">
    <nav>
      <ul className="nav">
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/posts'>Posts</NavLink></li>
      </ul>
    </nav>
    </div>
    </div>
  </header>
);

export default Header;