import React from "react";
import MyImage from 'images/home-background-photo.png'

function Home() {
  return (
    <div class="main-home-container">
      <div class="img-container">
        <img src={MyImage} />
      </div>
      <div class="info-container">
        <div class="top-info-container">
          Fast Track Your Job Application Process
        </div>
        <div class="button-container">
          <a class="btn waves-effect waves-light">Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
