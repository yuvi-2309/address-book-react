import React from "react";

import CreateAddressBook from "../createPage/addressBookCreate";
import AddressList from "../listPage/addressBookList";
import { Route, Routes } from "react-router-dom";

const NavPage = () => {
  return (
    <Routes>
      <Route path="/" element={<AddressList />} />
    </Routes>
  );
};

export default NavPage;
