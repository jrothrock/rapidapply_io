import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "../Home/Home.jsx";
import Nav from "../Nav/Nav.jsx";
import SignIn from "../Auth/SignIn.jsx";
import SignUp from "../Auth/SignUp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
