"use strict";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface userInfoTypes {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

function SignUp(props) {
  const [userInfo, setUserInfo] = useState<userInfoTypes>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function updateFirstName(firstname: string) {
    setUserInfo((prevState) => ({ ...prevState, firstname }));
  }

  function updateLastName(lastname: string) {
    setUserInfo((prevState) => ({ ...prevState, lastname }));
  }

  function updateEmail(email: string) {
    setUserInfo((prevState) => ({ ...prevState, email }));
  }

  function updatePassword(password: string) {
    setUserInfo((prevState) => ({ ...prevState, password }));
  }

  function updatePasswordConfirmation(password_confirmation: string) {
    setUserInfo((prevState) => ({ ...prevState, password_confirmation }));
  }

  const updateLoggedIn = props.updateLoggedIn;
  const navigate = useNavigate();

  function submitForm() {
    const token = (document.querySelector(
      "[name=csrf-token]"
    ) as HTMLElement).getAttribute("content");

    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

    axios
      .post(`${location.origin}/api/v1/auth/signup`, {
        email: userInfo.email,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        password: userInfo.password,
        password_confirmation: userInfo.password_confirmation,
      })
      .then((response) => {
        localStorage.setItem("_rapidapply_session", response.data.token);
        localStorage.setItem("_rapidapply_email", response.data.email);
        M.toast({
          html: "Account Successfully Created",
          displayLength: 5500,
          classes: "success-rounded",
        });
        updateLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        if (error.status === 409) {
          M.toast({
            html: "Username Already Exists",
            displayLength: 3000,
            classes: "rounded-error",
          });
        } else if (error.status === 400 && error.responseJSON.email) {
          M.toast({
            html: "Needs to be a valid email",
            displayLength: 3000,
            classes: "rounded-error",
          });
        }
      });
  }

  return (
    <div className="registration-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="log-in panel">
              <div className="panel-heading">
                <h2>Create Your Account</h2>
              </div>
              <div className="panel-body">
                <div className="input-field">
                  <input
                    className="input-lg"
                    type="text"
                    name="firstname"
                    autoFocus={true}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      updateFirstName(e.currentTarget.value)
                    }
                    required
                  />
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div className="input-field">
                  <input
                    className="input-lg"
                    type="text"
                    name="lastname"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      updateLastName(e.currentTarget.value)
                    }
                    required
                  />
                  <label htmlFor="lastname">Last Name</label>
                </div>
                <div className="input-field">
                  <input
                    className="input-lg"
                    type="email"
                    id="email"
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
                    id="password"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      updatePassword(e.currentTarget.value)
                    }
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                  <input
                    className="input-lg"
                    type="password"
                    id="password_confirmation"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      updatePasswordConfirmation(e.currentTarget.value)
                    }
                    required
                  />
                  <label htmlFor="password_confirmation">
                    Confirm Password
                  </label>
                </div>
                <div className="input-field">
                  <button
                    className="waves-effect waves-light btn"
                    onClick={() => submitForm()}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
