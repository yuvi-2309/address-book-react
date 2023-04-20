import React from "react";

import Logo from "../../Assets/logo.svg";
import User from "../../Assets/UserIcon.svg";

function Header() {
  return (
    <>
      <div className="headingAddress">
        <div className="flexRow">
          <img src={Logo} className="logo" alt="img" />
          <h1>Address Book</h1>
        </div>
        <div className="alignRight">
          <img src={User} className="userIcon" alt="img" />
          <h3>Welcome Yuvaraj</h3>
        </div>
      </div>
    </>
  );
}

export default Header;
