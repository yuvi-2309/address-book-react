import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SideBarData } from "./sideBarData";

function SideBar() {
  // useEffect to prevent the user to going back to home page without loggin in again
  let Navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) Navigate("/");
  });

  return (
    <React.Fragment>
      <div className="side_bar">
        {SideBarData.map((item, index) => {
          return (
            <div key={index}>
              <NavLink
                to={item.path}
                className="textColor"
                onClick={item.onclick}
              >
                <span>{item.title}</span>
              </NavLink>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SideBar;
