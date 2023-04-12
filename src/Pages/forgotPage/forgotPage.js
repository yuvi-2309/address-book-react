import React, { useState } from "react";

import Logo from "../../Assets/logo.svg";
import "./forgot.css";

function Forgot() {
  // regex for email validation
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const [emailSent, setEmailSent] = useState(false);


  // function to validate email
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

  // function to send mail in the console for now
  const sendMail = (event) => {
    const email = document.getElementById("email").value;
    console.log(email);
    const clear = document.getElementById("reset");
    if(email !== ""){
      setEmailSent(true);
    }
    clear.reset();
    setTimeout(() => {
      setEmailSent(false);
    }, 2000);
  };

  return (
    <div className="container_forgot">
      <form className="login_box_forgot" id="reset">
        <img src={Logo} className="header_img_forgot logo" />
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
          <div
            id="email_warning"
            className="warning_message"
          ></div>
          {emailSent && <div className="email_sent_message">Email sent successfully!</div>}
          <button className="button_forgot" type="button" onClick={sendMail}>
            Send
          </button>
        </div>
      </form>
      
    </div>
  );
}

export default Forgot;
