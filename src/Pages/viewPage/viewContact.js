import React from "react";

export default function View({ state }) {
  return (
    <div className="main_page">
      <h3>
        {state.first_name} {state.last_name}
      </h3>
      <div>
        <div>
          <h3>Addresses</h3>
          <div>{state.type_address}</div>
          {state.address_line1}
          {state.address_line2}
          {state.city} {state.state}
          {state.country} - {state.pin_code}
        </div>
        <div>
          <h3>Email Address</h3>
          <div>{state.type_email}</div>
          {state.email}
        </div>
        <div>
          <h3>Phone number</h3>
          <div>{state.type_phone}</div>
          {state.phone_number}
        </div>
      </div>
    </div>
  );
}
