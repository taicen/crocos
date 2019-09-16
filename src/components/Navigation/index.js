import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul className="nav">
        <li><NavLink exact to='/'>Home</NavLink></li>
        <li><NavLink to='/posts'>Posts</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;