import React from "react";

import Header from "./header";
import NavPage from "./navPage";
import SideBar from "./sideBar";

function MainPage() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <SideBar />
          <div className="main_content">
            <NavPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
