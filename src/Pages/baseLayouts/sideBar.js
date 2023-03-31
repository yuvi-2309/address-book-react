import React from "react";
import { NavLink } from "react-router-dom";
import { SideBarData } from "./sideBarData";

function SideBar() {
  return (
    <React.Fragment>
      <div className="side_bar">
        {SideBarData.map((item, index) => {
          return (
            <div key={index}>
              <NavLink to={item.path} className="textColor">
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
