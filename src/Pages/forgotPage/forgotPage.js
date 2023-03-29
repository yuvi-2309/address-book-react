import React from "react";
import Logo from "../../Assets/logo.png";
import "./forgot.css";
function Forgot() {
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const validateEmail = (event) => {
    const emailbox = document.getElementById("email");
    const email = event.target.value;
    const email_warning = document.getElementById("email_warning");
    if (emailRegex.test(email)) {
      emailbox.style.borderColor = "gray";
      email_warning.innerHTML = "";
    } else {
      email_warning.innerHTML = "Please enter a valid email";
      emailbox.style.borderColor = "red";
    }
  };

  return (
    <div className="container_forgot">
      <form className="login_box_forgot">
        <img src={Logo} width="40px" alt="Logo" className="header_img_forgot" />
        <h1 className="header_forgot">Address Book</h1>
        <div className="input_group_forgot">
          <h3>Forgot Password?</h3>
          <p className="para_forgot">
            Enter your email address or username associated to your account
          </p>
          <p className="para_forgot">
            We will send you a link to reset your password
          </p>
          <input
            className="input_forgot"
            type="email"
            placeholder="Email"
            id="email"
            onBlur={validateEmail}
            required
          />
          <div id="email_warning" style={{color:"red", fontSize:"12px"}}></div>
          <button className="button_forgot" type="button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forgot;
