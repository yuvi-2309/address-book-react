import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./Pages/baseLayouts/mainPage";
import Forgot from "./Pages/forgotPage/forgotPage";
import Login from "./Pages/loginPage/login";
import AddressList from "./Pages/listPage/addressBookList";
import CreateAddressBook from "./Pages/createPage/addressBookCreate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/address-book" element={<AddressList />} />
      <Route path="/home/create" element={<CreateAddressBook />} />
    </Routes>
  </BrowserRouter>
);

