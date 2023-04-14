import React from "react";


import { Detail, ImportantDetail, ListContent, PrimaryDetail, SecondaryDetail, Span, ViewMainList } from "./viewContact.style";

export default function View({ state, editDetailsView }) {
console.log(state)
  const addressList = state.addresses.map((item, address_index) => (
    <Span key={item.type_address}>
      <ImportantDetail>{item.type_address}</ImportantDetail>
      <Detail>{item.address_line1}</Detail>
      <Detail>{item.address_line2}</Detail>
      <Detail>
        {item.city}, {item.state},
      </Detail>
      <Detail>{item.country}-{item.pin_code}</Detail>  
    </Span>
  ));

  const handleEdit = () => {
    editDetailsView(state);
  }
  return (
    <>
      <ViewMainList>
        

        <ListContent>
        <PrimaryDetail>
          {state.first_name} {state.last_name}
        </PrimaryDetail>
        <button onClick={handleEdit}>Edit</button>
            <SecondaryDetail>Addresses</SecondaryDetail>
            {addressList}
         
         
            <SecondaryDetail>Email Address</SecondaryDetail>
            {state.emails.map((email, email_index) => (
              <Span key={email.email}>
                <ImportantDetail>{email.type_email}</ImportantDetail>
                <Detail>{email.email}</Detail>
              </Span>
            ))}
          
          
            <SecondaryDetail>Phone number</SecondaryDetail>
            {state.phone_number.map((phone, phone_index) => (
              <Span key={phone.phone_number}>
                <ImportantDetail>{phone.phone_number_type}</ImportantDetail>
                <Detail>{phone.phone_number}</Detail>
              </Span>
            ))}
          
        </ListContent>
      </ViewMainList>
    </>
  );
}
