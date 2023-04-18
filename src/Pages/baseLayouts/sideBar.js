import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { SideBarData } from "./sideBarData";

function SideBar() {
  // useEffect to prevent the user to going back to home page without loggin in again
  let Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) Navigate("/");
  });

  return (
    <React.Fragment>
      <div className="sideBar">
        {SideBarData.map((item, index) => {
          return (
            <NavLink
              key={item.title}
              to={item.path}
              className="sideBarTextColor"
              onClick={item.onclick}
            >
              <div className="sideBarContent">{item.title}</div>
            </NavLink>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SideBar;
