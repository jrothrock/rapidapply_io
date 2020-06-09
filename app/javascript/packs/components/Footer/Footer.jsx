import React from "react";
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <footer class="page-footer">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">About</h5>
            <p class="grey-text text-lighten-4">Staple Themes brings to life stunning artison themes. Usable in any industry and field.</p>
          </div>
          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
            <div class="col s6">
              <ul>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-copyright">
        <div class="container">
          © 2020 <a>Rapid Apply.</a> All Rights Reserved.
          <div class="grey-text text-lighten-4 right footer-social-icons">
            <a>
              <li>
                <i class="waves-effect waves-light fa fa-facebook"></i>
              </li>
            </a>
            <a>
              <li>
                <i class="waves-effect waves-light fa fa-twitter"></i>
              </li>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Nav;