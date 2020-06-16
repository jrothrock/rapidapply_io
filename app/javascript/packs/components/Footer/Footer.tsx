"use strict";

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">About</h5>
            <p className="grey-text text-lighten-4">
              Rapid Apply centralizes your job search. We curate the jobs you're
              qualified for, help you tailor/automate your resume and cover
              letter, and submit the application on your behalf.
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <div className="col s6">
              <ul>
                <li>Test</li>
                <li>Test</li>
                <li>Test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 <a>Rapid Apply.</a> All Rights Reserved.
          <div className="grey-text text-lighten-4 right footer-social-icons">
            <a>
              <li>
                <i className="waves-effect waves-light fa fa-facebook"></i>
              </li>
            </a>
            <a>
              <li>
                <i className="waves-effect waves-light fa fa-twitter"></i>
              </li>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
