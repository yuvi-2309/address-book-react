import React from "react";

import Header from "./header";
import NavPage from "./navPage";
import SideBar from "./sideBar";

function MainPage() {
  return (    
      <div className="container">
        <Header />
        <div className="pageContent">
          <SideBar />
          <div className="mainContent">
            <NavPage />
          </div>
        </div>
      </div>    
  );
}

export default MainPage;
