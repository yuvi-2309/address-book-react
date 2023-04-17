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
    const emailWarning = document.getElementById("emailWarning");
    if (emailRegex.test(email)) {
      emailbox.style.borderColor = "gray";
      emailWarning.innerHTML = "";
    } else {
      emailWarning.innerHTML = "Please enter a valid email";
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
    <div className="containerForgot">
      <form className="loginBoxForgot" id="reset">
        <img src={Logo} className="headerImgForgot logo" alt="Logo"/>
        <h1 className="headerForgot">Address Book</h1>
        <div className="inputGroupForgot">
          <h3>Forgot Password?</h3>
          <p className="paraForgot">
            Enter your email address or username associated to your account
          </p>
          <p className="paraForgot">
            We will send you a link to reset your password
          </p>
          <input
            className="inputForgot"
            type="email"
            placeholder="Email"
            id="email"
            onBlur={validateEmail}
            required
          />
          <div
            id="emailWarning"
            className="warningMessage"
          ></div>
          {emailSent && <div className="emailSentMessage">Email sent successfully!</div>}
          <button className="buttonForgot" type="button" onClick={sendMail}>
            Send
          </button>
        </div>
      </form>
      
    </div>
  );
}

export default Forgot;
