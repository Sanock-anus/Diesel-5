import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Diesel</Link>
        </li>
        <li>
          <Link to="/">Games</Link>
        </li>
        {user ? (
          <>
              <li>
               <Link to="/upload">Upload Game</Link>
              </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
            <li>
              <span>Welcome, {user.username}!</span>
            </li>
          </>
        ) : (
          <>
            <li>
               <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
