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
      <div className="side_bar">
        {SideBarData.map((item, index) => {
          return (
            <div key={item.title} className="side_bar_content">
              <NavLink
                to={item.path}
                className="side_bar_textColor"
                onClick={item.onclick}
              >
                {item.title}
              </NavLink>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default SideBar;
