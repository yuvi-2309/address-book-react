import React from "react";

import "./viewContact.css";

export default function View({ state }) {
  return (
    <>
      <div className="view_main_list">
        <h2>
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
            {state.emails.map((email, email_index) => (
              <span key={email_index}>
                <h4>{email.type_email}</h4>
                {email.email}
              </span>
            ))}
          </div>
          <div>
            <h3>Phone number</h3>
            {state.phone_number.map((phone, phone_index) => (
              <span key={phone_index}>
                <h4>{phone.type_phone_number}</h4>
                {phone.phone_number}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
