/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
// import "./Login.css";
import Logo from "../../Assets/logo.png";

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
  function LoginToAddressList(e) {
    e.preventDefault();
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");
    const warning = document.getElementById("warning");
    if (email.value === "yuvi@gmail.com" && password.value === "yuvi") {
      Navigate("/home");
    }
    if (password.value === "" && email.value === "") {
      warning.innerText = "password is required";

      setMessage("email is required");
    } else if (password.value === "" && email.value !== "") {
      warning.innerText = "password is required";

      setMessage("");
    } else if (password.value !== "" && email.value === "") {
      setMessage("email is required");

      warning.innerText = "";
    } else if (email.value !== "" && password.value !== "") {
      setMessage("");
      warning.innerText = "Incorrect Email address or password!!";
    }
  }

  function Reset() {
    document.getElementById("reset-function").reset();
  }

  return (
    <Container_login>
      <Login_box id="reset-function">
        <Header_img src={Logo} width="40px" alt="Logo" />
        <Header>Address Book</Header>
        <H2_tag>Login to your account</H2_tag>
        
        <Input_field>
          <Input_tag
            type="email"
            placeholder="Email"
            id="email-login"
            
          />
          {message ? <div style={{ fontSize: "12px", color: "red" }}>{message}</div> : ""}
        </Input_field>
        <Input_field>
          <Input_tag
            type="password"
            placeholder="Password"
            id="password-login"
            
          />
          <div id="warning" style={{ fontSize: "12px", color:"red" }}></div>
        </Input_field>

        <Pass>
          <Link to="/Forgot" className="forgot_login">
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
