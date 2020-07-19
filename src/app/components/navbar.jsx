import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <ul>
    <Link to="/">Home</Link>
    <Link to="/add">Add New</Link>
  </ul>
);

export default Navbar;
