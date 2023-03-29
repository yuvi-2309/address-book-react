import React from "react";
import Logo from "../../Assets/logo-white.png";

function Header() {
  return (
    <>
      <div className="heading_address">
        <img src={Logo} width="40px" height="40px" alt="img" />
        <h1>Address Book</h1>
        <h3>Welcome User</h3>
      </div>
    </>
  );
}

export default Header;
