import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./viewContact.css";
import AddressList from "../listPage/addressBookList";
import CreateAddressBook from "../createPage/addressBookCreate";

export default function View({ state }) {
  const [nav, setNav] = useState(true);
  const navigateBack = () => {
    setNav(false);
  };

  return (
    <>
      {nav ? (
        <div className="view_main_list">
          <h2 style={{ paddingBottom: "10px" }}>
            {state.first_name} {state.last_name}
          </h2>

          <div className="list_content">
            <div>
              <h3>Addresses</h3>
              <h4>{state.type_address}</h4>
              <p>{state.address_line1}</p>
              <p>{state.address_line2}</p>
              <p>
                {state.city}
                {", "} {state.state}
                {", "}
              </p>
              {state.country} - {state.pin_code}
            </div>
            <div>
              <h3>Email Address</h3>
              <h4>{state.type_email}</h4>
              {state.email}
            </div>
            <div>
              <h3>Phone number</h3>
              <h4>{state.type_phone_number}</h4>
              {state.phone_number}
            </div>
          </div>
          <button onClick={navigateBack}>Go back</button>
        </div>
      ) : (
        <AddressList setNav={true} />
      )}
    </>
  );
}
