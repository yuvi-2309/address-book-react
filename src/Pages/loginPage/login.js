/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";

import Logo from "../../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  Container_login,
  Login_box,
  Input_field,
  Button,
  Header,
  Input_tag,
  Btn_reset,
  Btn_sign,
  Header_img,
  Pass,
  H2_tag,
} from "./login.style";


function Login() {
  let Navigate = useNavigate();
  const [message, setMessage] = useState();

  // function to navigate to the address book page and validate email
  function LoginToAddressList(e) {
    e.preventDefault();
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    const warning = document.getElementById("warning");
    if (email.value === "yuvi@gmail.com" && password.value === "yuvi") {
      Navigate("/home");
      localStorage.setItem("auth", true);
    } 
    if (password.value === "" && email.value === "") {
      warning.innerText = "Password is required";
      setMessage("Email is required");
      email.style.borderColor = "red";
      password.style.borderColor = "red";
    }
    else if(email.value === "yuvi@gmail.com" && password.value !== "yuvi") {
      warning.innerText = "Incorrect password!!";
      password.style.borderColor = "red";
      email.style.borderColor = "gray";
    }
    else if (password.value === "" && email.value !== "") {
      warning.innerText = "Password is required";
      setMessage("");
      email.style.borderColor = "gray";
      password.style.borderColor = "red";
    } else if (password.value !== "" && email.value === "") {
      setMessage("Email is required");
      email.style.borderColor = "red";
      password.style.borderColor = "gray";
      warning.innerText = "";
    } else if (email.value !== "yuvi@gmail.com" && password.value !== "") {
      setMessage("");
      warning.innerText = "Incorrect Email address or password!!";
      email.style.borderColor = "red";
      password.style.borderColor = "red";
    }
  }


  // function to reset the form fields
  function Reset() {
    document.getElementById("reset-function").reset();
  }

  useEffect(() => {
    if (localStorage.getItem("auth")) Navigate("/home");
  });

  return (
    <Container_login>
      <Login_box id="reset-function">
        <Header_img src={Logo} width="40px" alt="Logo" />
        <Header>Address Book</Header>
        <H2_tag>Login to your account</H2_tag>
        <Input_field>
        <span className="flex_column">
          <Input_tag type="email" placeholder="Email" id="email-login" />
          {message && (
            <div className="warning_message">{message}</div>
          )}
          </span>
        </Input_field>
        <Input_field>
          <span className="flex_column">
          <Input_tag
            type="password"
            placeholder="Password"
            id="password-login"
          />
          <div id="warning" className="warning_message"></div>
          </span>
        </Input_field>

        <Pass>
          <Link to="/forgot" className="forgot_login">
            Forgot Password?
          </Link>
        </Pass>
        <Button>
          <Btn_sign type="submit" onClick={LoginToAddressList}>
            Sign in
          </Btn_sign>
          <Btn_reset type="button" onClick={Reset}>
            Reset
          </Btn_reset>
        </Button>
      </Login_box>
    </Container_login>
  );
}

export default Login;
