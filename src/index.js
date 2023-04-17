import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./Pages/baseLayouts/mainPage";
import Forgot from "./Pages/forgotPage/forgotPage";
import Login from "./Pages/loginPage/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home/*" element={<MainPage />} />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
  </BrowserRouter>
);

