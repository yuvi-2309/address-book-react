import React from "react";

import { NavLink } from "react-router-dom";

import { SideBarData } from "./sideBarData";

function SideBar() {
  return (
    // <>

    //  <div className="side_bar">

    //   <Link to="/address_book_list" className="textColor">

    //    Home

    //   </Link>

    //   <Link to="create_page" className="textColor">

    //    Create

    //   </Link>

    //   <Link to="/" className="textColor">

    //    Sign out

    //   </Link>

    //   <Outlet />

    //  </div>

    // </>

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
