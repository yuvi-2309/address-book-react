import React from "react";


import { Detail, ImportantDetail, ListContent, PrimaryDetail, SecondaryDetail, Span, ViewMainList } from "./viewContact.style";

export default function View({ state }) {

  const addressList = state.addresses.map((item, address_index) => (
    <Span key={address_index}>
      <ImportantDetail>{item.type_address}</ImportantDetail>
      <Detail>{item.address_line1}</Detail>
      <Detail>{item.address_line2}</Detail>
      <Detail>
        {item.city}, {item.state},
      </Detail>
      {item.country}-{item.pin_code}
    </Span>
  ));
  return (
    <>
      <ViewMainList>
        

        <ListContent>
        <PrimaryDetail>
          {state.first_name} {state.last_name}
        </PrimaryDetail>
            <SecondaryDetail>Addresses</SecondaryDetail>
            {addressList}
         
         
            <SecondaryDetail>Email Address</SecondaryDetail>
            {state.emails.map((email, email_index) => (
              <Span key={email_index}>
                <ImportantDetail>{email.type_email}</ImportantDetail>
                <Detail>{email.email}</Detail>
              </Span>
            ))}
          
          
            <SecondaryDetail>Phone number</SecondaryDetail>
            {state.phone_number.map((phone, phone_index) => (
              <Span key={phone_index}>
                <ImportantDetail>{phone.type_phone_number}</ImportantDetail>
                <Detail>{phone.phone_number}</Detail>
              </Span>
            ))}
          
        </ListContent>
      </ViewMainList>
    </>
  );
}
