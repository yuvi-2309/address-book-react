import React from "react";

import CreateAddressBook from "../createPage/addressBookCreate";
import AddressList from "../listPage/addressBookList";
import { Outlet, Route, Routes } from "react-router-dom";

const NavPage = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddressList />} />
        <Route path="/address-book-create" element={<CreateAddressBook />} />
      </Routes>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavPage;
