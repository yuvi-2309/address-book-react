import React from "react";

import Logo from "../../Assets/logo.svg"

function Header() {
  return (
    <>
      <div className="heading_address">
        <div className="flex_row">
        <img src={Logo} className="logo" alt="img" />
        <h1>Address Book</h1>
        </div>
        <h3>Welcome Yuvaraj</h3>
      </div>
    </>
  );
}

export default Header;
