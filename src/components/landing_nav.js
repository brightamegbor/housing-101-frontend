import React from 'react';
import { Link } from 'react-router-dom';

export function LandingNav() {

  return (
    <>
      <nav className="navbar fixed-top navbar-dark bg-dark">
        <div className="container-fluid">

          <a className="navbar-brand" href="/">Housing</a>

          <div className="dropstart">
            <button
              type="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              className="navbar-toggler"
              id="navbarDropdown">
              <span
                className="navbar-toggler-icon"
              ></span>
            </button>

            <div className="dropdown-menu shadow" aria-labelledby="navbarDropdown">

              <li>
                <Link className="dropdown-item" to={`/register`}>Sign Up</Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/login">Login</Link>
              </li>

            </div>
          </div>
        </div>

      </nav>
    </>
  )
}