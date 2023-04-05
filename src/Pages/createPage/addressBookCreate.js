/* eslint-disable no-restricted-globals */
import React, { useState } from "react";

import "./addressBook.css";
import countryData from "../../JSON files/countryData.json";



function CreateAddressBook({ onFormDataChange, editValue, editID }) {
  const [formData, setFormData] = useState(editValue ? editValue : {
    first_name: '',
    last_name: '',
    address_line1: '',
    address_line2: '',
    state: '',
    country: '',
    pin_code: '',
    type_email: '',
    email: [''],
    phone_number: ''
  });

  // regex for validation
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const nameRegex = /^([a-zA-Z]{1,29})+$/;
  const numberRegex = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;

  // function to validate the respective form fields
  const validateForm = () => {
    const firstName = document.getElementById("name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone_number").value;

    validate("name", "name_warning", firstName, nameRegex);
    validate("last_name", "last_name_warning", lastName, nameRegex);
    validate("email", "email_warning", email, emailRegex);
    validate("phone_number", "phone_number_warning", phone, numberRegex)
  };

  const validate = (inputId, warningId, name, regex) => {
    const namebox = document.getElementById(inputId);
    const nameWarn = document.getElementById(warningId);

    if (regex.test(name)) {
      namebox.style.borderColor = "gray";
      nameWarn.innerHTML = "";
    } else {
      nameWarn.innerHTML = `Please enter a valid ${inputId.replace('_', ' ')}`;
      namebox.style.borderColor = "red";
    }
  };


  const handleInputChangeEmails = (event, index) => {
    const { name, value } = event.target;
    const emails = [...formData.emails];
    emails[index] = value;
    setFormData({ ...formData, emails });
  };



  // function to handle the submit button in the form
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormDataChange(formData);
    setFormData("");
    event.target.reset();
    setFormData({
      first_name: '',
      last_name: '',
      address_line1: '',
      address_line2: '',
      state: '',
      country: '',
      pin_code: '',
      type_email: '',
      email: [''],
      phone_number: ''
    })
    console.log("items", formData)
  };


  return (
    <React.Fragment>
      <div className="main_page">
        <form onSubmit={handleSubmit} className="reset">
          {/* input fields for name */}
          <div className="name_bar">
            <span className="flex_column">
              <input
                name="first_name"
                className="input_address"
                placeholder="First Name"
                type="text"
                id="name"
                value={formData.first_name}
                onChange={(event) => setFormData({ ...formData, first_name: event.target.value })}
                onBlurCapture={validateForm}
              />
              <div
                id="name_warning"
                className='warning_message'
              ></div>
            </span>
            <span className="flex_column">
              <input
                name="last_name"
                className="input_address"
                placeholder="Last Name"
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={(event) => setFormData({ ...formData, last_name: event.target.value })}
                onBlurCapture={validateForm}
              />
              <div
                id="last_name_warning"
                className='warning_message'
              ></div>
            </span>
          </div>

          {/* input fields for address */}
          <div className="address_bar">
            <div className="wrap">
              <h3>Address</h3>
              <button className="button_add" type="button">
                +
              </button>
            </div>
            <div className="form_grid wrapA1">

              <input
                name="address_line1"
                className="input_address"
                placeholder="Line 1"
                type="text"
                value={formData.address_line1}
                 onChange={(event) => setFormData({ ...formData, address_line1: event.target.value })}
                required
              />

              <input
                name="address_line2"
                className="input_address"
                placeholder="Line 2"
                type="text"
                value={formData.address_line2}
                 onChange={(event) => setFormData({ ...formData, address_line2: event.target.value })}
                required
              />

              <input
                name="city"
                className="input_address"
                placeholder="City"
                type="text"
                value={formData.city}
                 onChange={(event) => setFormData({ ...formData, city: event.target.value })}
                required
              />

              <input
                name="state"
                className="input_address"
                placeholder="State"
                type="text"
                value={formData.state}
                 onChange={(event) => setFormData({ ...formData, state: event.target.value })}
                required
              />

              <input
                name="pin_code"
                className="input_address"
                placeholder="Pin Code"
                 onChange={(event) => setFormData({ ...formData, pin_code: event.target.value })}
                value={formData.pin_code}
                required
              />

              <select
                name="country"
                className="select"
                 onChange={(event) => setFormData({ ...formData, country: event.target.value })}
                value={formData.country}
              >
                <option className="option">Country</option>
                {countryData.map((getCountry, index) => (
                  <option value={getCountry.country_name} key={index}>
                    {getCountry.country_name}
                  </option>
                ))}
              </select>

              <select
                className="select"
                name="type_address"
                 onChange={(event) => setFormData({ ...formData, type_address: event.target.value })}
                value={formData.type_address}
              >
                <option name="Type" className="option">
                  Type
                </option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>

            <button type="button" className="button_1">
              Add
            </button>
          </div>

          {/* input fields for email addresss */}
          <div className="email_address">
            <div className="wrap">
              <h3>Email Address</h3>
              <button className="button_add" type="button">
                +
              </button>
            </div>
            {formData.email.map((email, index) => (
            <>
            <div className="name_bar1 wrapA2" key={index}>
              <span className="flex_column">
                <input
                  id="email"
                  name={`email-${index}`}
                  className="input_address"
                  placeholder="Email Address"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => handleInputChange(event, index)}
                  onBlurCapture={validateForm}
                />
                <div
                  id="email_warning"
                  className='warning_message'
                ></div>
              </span>
              <select
                name="type_email"
                className="select"
                 onChange={(event) => setFormData({ ...formData, type_email: event.target.value })}
                value={formData.type_email}
              >
                <option className="option">Type</option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>
            <button className="button_1" type="button">
              Add
            </button>
            </>
            ))}
          </div>

          {/* input fields for phone number */}
          <div className="phone_number">
            <div className="wrap">
              <h3>Phone number</h3>
              <button className="button_add" type="button">
                +
              </button>
            </div>
            
              
                <div className="name_bar1 wrapA3">
                  <span className="flex_column">
                    <input
                      name="phone_number"
                      className="input_address"
                      placeholder="Phone Number"
                      id="phone_number"
                      value={formData.phone_number}
                       onChange={(event) => setFormData({ ...formData, phone_number: event.target.value })}
                      //  onChange={(event) => handleInputChange3(index, event)}
                      onBlurCapture={validateForm}
                    />
                    <div
                      id="phone_number_warning"
                      className='warning_message'
                    ></div>
                  </span>
                  <select
                    name="type_phone_number"
                    className="select"
                     onChange={(event) => setFormData({ ...formData, type_phone_number: event.target.value })}
                    // onChange={(event) => handleInputChange3(index, event)}
                    value={formData.type_phone_number}
                  >
                    <option className="option">Type</option>
                    <option>Personal</option>
                    <option>Work</option>
                  </select>
                </div>
                <button className="button_1" type="button">
                  Add
                </button>

             
          </div>
          {/* buttons for saving and cancelling record */}
          <div className="footer_address">
            <button className="button_2" type="submit" onChange={(event) => event.target.reset()}>
              Save
            </button>
            <button className="button_2" type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CreateAddressBook;
