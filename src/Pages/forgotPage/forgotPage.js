import React from "react";
import Logo from "../../Assets/logo.png";
import "./forgot.css";
function Forgot() {
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
          <input className="input_forgot" type="email" placeholder="Email" required />
          <button className="button_forgot" type="button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forgot;
