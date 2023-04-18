import React from "react";


import { Detail, ImportantDetail, ListContent, PrimaryDetail, SecondaryDetail, Span, ViewMainList } from "./viewContact.style";

export default function View({ state, editDetailsView }) {
  const addressList = state.addresses.map((item, addressIndex) => (
    <Span key={item.typeAddress}>
      <ImportantDetail>{item.typeAddress}</ImportantDetail>
      <Detail>{item.addressLine1}</Detail>
      <Detail>{item.addressLine2}</Detail>
      <Detail>
        {item.city}, {item.state},
      </Detail>
      <Detail>{item.country}-{item.pinCode}</Detail>  
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
          {state.firstName} {state.lastName}
        </PrimaryDetail>
        <button onClick={handleEdit}>Edit</button>
            <SecondaryDetail>Addresses</SecondaryDetail>
            {addressList}
         
         
            <SecondaryDetail>Email Address</SecondaryDetail>
            {state.emails.map((email, emailIndex) => (
              <Span key={email.email}>
                <ImportantDetail>{email.typeEmail}</ImportantDetail>
                <Detail>{email.email}</Detail>
              </Span>
            ))}
          
          
            <SecondaryDetail>Phone number</SecondaryDetail>
            {state.phoneNumber.map((phone, phoneIndex) => (
              <Span key={phone.phoneNumber}>
                <ImportantDetail>{phone.phoneNumberType}</ImportantDetail>
                <Detail>{phone.phoneNumber}</Detail>
              </Span>
            ))}
          
        </ListContent>
      </ViewMainList>
    </>
  );
}
