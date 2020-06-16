"use strict";

import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav(props) {
  const updateLoggedIn: Function = props.updateLoggedIn;

  function signOut() {
    const csrfToken: string = (document.querySelector(
      "[name=csrf-token]"
    ) as HTMLElement).getAttribute("content");

    const token: string = localStorage.getItem("_rapidapply_session");

    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;

    axios
      .post(`${location.origin}/api/v1/auth/signout`, {})
      .then((response) => {
        localStorage.removeItem("_rapidapply_session");
        localStorage.removeItem("_rapidapply_email");
        updateLoggedIn(false);
      })
      .catch((error) => {
        localStorage.removeItem("_rapidapply_session");
        localStorage.removeItem("_rapidapply_email");
        updateLoggedIn(false);
      });
  }

  let links: JSX.Element;
  if (props.isLoggedIn) {
    links = (
      <div id="nav-mobile">
        <li>
          <a onClick={(e) => signOut()}>Sign Out</a>
        </li>
      </div>
    );
  } else {
    links = (
      <div>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </div>
    );
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Home
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {links}
        </ul>
        <ul className="right show-on-med-and-down">
          <li>
            <a
              href="#"
              data-activates="slide-out"
              className="button-collapse"
              id="nav-menu-icon"
            >
              <div id="nav-menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <ul id="slide-out" className="side-nav"></ul>
    </nav>
  );
}

export default Nav;
