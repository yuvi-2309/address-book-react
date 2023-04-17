/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";

import Logo from "../../Assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  ContainerLogin,
  LoginBox,
  InputField,
  Button,
  Header,
  InputTag,
  ButtonReset,
  ButtonSign,
  HeaderImg,
  Pass,
  H2Tag
} from "./login.style";


function Login() {
  let Navigate = useNavigate();
  const [message, setMessage] = useState();

  // function to navigate to the address book page and validate email
  function LoginToAddressList(e) {
    e.preventDefault();
    const email = document.getElementById("emailLogin");
    const password = document.getElementById("passwordLogin");
    const warning = document.getElementById("warning");
  
    // email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (emailRegex.test(email.value) && email.value === "yuvi@gmail.com" && password.value === "yuvi") {
      Navigate("/home");
      localStorage.setItem("auth", true);
    } else if (password.value === "" && email.value === "") {
      warning.innerText = "Password is required";
      setMessage("Email is required");
      email.style.borderColor = "red";
      password.style.borderColor = "red";
    }
    else if (!emailRegex.test(email.value) && password.value !== "") {
      setMessage("Please enter a valid email address");
      email.style.borderColor = "red";
      password.style.borderColor = "gray";
      warning.innerText = "";
    }else if (email.value === "yuvi@gmail.com" && password.value !== "yuvi") {
      setMessage("");
      warning.innerText = "Incorrect password!!";
      password.style.borderColor = "red";
      email.style.borderColor = "gray";
    } else if (password.value === "" && email.value !== "") {
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
    document.getElementById("resetFunction").reset();
  }

  useEffect(() => {
    if (localStorage.getItem("auth")) Navigate("/home");
  });

  return (
    <ContainerLogin>
      <LoginBox id="resetFunction">
        <HeaderImg src={Logo} width="40px" alt="Logo" />
        <Header>Address Book</Header>
        <H2Tag>Login to your account</H2Tag>
        <InputField>
        <span className="flexColumn">
          <InputTag type="email" placeholder="Email" id="emailLogin" />
          {message && (
            <div className="warningMessage">{message}</div>
          )}
          </span>
        </InputField>
        <InputField>
          <span className="flexColumn">
          <InputTag
            type="password"
            placeholder="Password"
            id="passwordLogin"
          />
          <div id="warning" className="warningMessage"></div>
          </span>
        </InputField>

        <Pass>
          <Link to="/forgot" className="forgotLogin">
            Forgot Password?
          </Link>
        </Pass>
        <Button>
          <ButtonSign type="submit" onClick={LoginToAddressList}>
            Sign in
          </ButtonSign>
          <ButtonReset type="button" onClick={Reset}>
            Reset
          </ButtonReset>
        </Button>
      </LoginBox>
    </ContainerLogin>
  );
}

export default Login;
