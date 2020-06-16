"use strict";

import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../Home/Home";
import Nav from "../Nav/Nav";
import SignIn from "../Auth/SignIn/SignIn";
import SignUp from "../Auth/SignUp/SignUp";
import Footer from "../Footer/Footer";

interface appInfoTypes {
  isLoggedIn: boolean;
}

function App() {
  const [appInfo, setAppInfo] = useState<appInfoTypes>({
    isLoggedIn: false,
  });

  function updateLoggedIn(isLoggedIn: boolean) {
    setAppInfo((prevState) => ({ ...prevState, isLoggedIn }));
  }

  const signed_in_value: boolean = localStorage.getItem("_rapidapply_session")
    ? true
    : false;

  if (signed_in_value && !appInfo.isLoggedIn) {
    updateLoggedIn(true);
  }

  return (
    <BrowserRouter>
      <Nav isLoggedIn={appInfo.isLoggedIn} updateLoggedIn={updateLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={appInfo.isLoggedIn} />} />
        <Route
          path="/signin"
          element={<SignIn updateLoggedIn={updateLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUp updateLoggedIn={updateLoggedIn} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
