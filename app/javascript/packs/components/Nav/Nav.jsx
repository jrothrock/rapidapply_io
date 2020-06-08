import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <div className="nav-wrapper">
            <Link to="/" className='brand-logo'>Home</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <div>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </div>
            </ul>
            <ul className='right show-on-med-and-down'>
                <li>
                    <a href="#" data-activates="slide-out" className="button-collapse" id="nav-menu-icon">
                        <div id="nav-menu-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </li>
            </ul>
            </div>
            <ul id="slide-out" className="side-nav">
                
            </ul>
        </nav>
  );
}

export default Nav;