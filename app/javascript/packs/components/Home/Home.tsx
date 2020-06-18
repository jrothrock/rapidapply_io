"use strict";

import React from "react";
import MyImage from "images/home-background-photo.png";

function Home(props) {
  return (
    <div className="main-home-container">
      <div
        className="img-container"
        style={{ backgroundImage: `url(${MyImage})` }}
      >
        <div className="info-container">
          <div className="top-info-container">
            Fast Track Your Job Application Process
          </div>
          <div className="button-container">
            <a className="btn waves-effect waves-light">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
