import React from "react";

// import Logo from "../../Assets/logo-white.png";
import Logo from "../../Assets/logo-white.svg"

function Header() {
  return (
    <>
      <div className="heading_address">
        <img src={Logo} className="logo" alt="img" />
        <h1>Address Book</h1>
        <h3>Welcome Yuvaraj</h3>
      </div>
    </>
  );
}

export default Header;
