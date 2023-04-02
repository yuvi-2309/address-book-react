import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./Pages/baseLayouts/mainPage";
import Forgot from "./Pages/forgotPage/forgotPage";
import Login from "./Pages/loginPage/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <Route path="/address-book/create" element={<CreateAddressBook />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
