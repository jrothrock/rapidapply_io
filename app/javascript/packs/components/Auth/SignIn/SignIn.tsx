"use strict";

import React, { useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface userInfoTypes {
  email: string;
  password: string;
}

function SignIn(props) {
  const [userInfo, setUserInfo] = useState<userInfoTypes>({
    email: "",
    password: "",
  });

  function updateEmail(email: string) {
    setUserInfo((prevState) => ({ ...prevState, email }));
  }

  function updatePassword(password: string) {
    setUserInfo((prevState) => ({ ...prevState, password }));
  }

  const updateLoggedIn = props.updateLoggedIn;
  const navigate = useNavigate();

  function submitForm(e: React.MouseEvent) {
    e.preventDefault();
    const crsfElement: HTMLElement = document.querySelector(
      "[name=csrf-token]"
    );
    const token: string = crsfElement
      ? crsfElement.getAttribute("content")
      : "";

    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    axios
      .post(`${location.origin}/api/v1/auth/signin`, {
        email: userInfo.email,
        password: userInfo.password,
      })
      .then((response) => {
        localStorage.setItem("_rapidapply_session", response.data.token);
        localStorage.setItem("_rapidapply_email", response.data.email);
        updateLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          M.toast({
            html: "The Username or Password Is Incorrect",
            displayLength: 3000,
            classes: "failure-rounded",
          });
        }
      });
  }

  return (
    <div className="login-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="log-in panel">
              <div className="panel-heading">
                <h2>Sign in</h2>
              </div>
              <form>
                <div className="panel-body">
                  <div className="input-field">
                    <input
                      className="input-lg"
                      type="text"
                      autoFocus={true}
                      name="email"
                      data-testid="email"
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        updateEmail(e.currentTarget.value)
                      }
                      required
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input
                      className="input-lg"
                      type="password"
                      name="password"
                      data-testid="password"
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        updatePassword(e.currentTarget.value)
                      }
                      required
                    />
                    <label htmlFor="passwor">Password</label>
                  </div>
                  <div className="input-field">
                    <button
                      className="waves-effect waves-light btn"
                      onClick={(e: React.MouseEvent) => submitForm(e)}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
