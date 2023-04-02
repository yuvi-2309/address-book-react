/* eslint-disable no-restricted-globals */
import "./addressBook.css";
import countryData from "../../JSON files/countryData.json";
import React, { useState } from "react";

function CreateAddressBook({ onFormDataChange, editValue, editID }) {
  const [formData, setFormData] = useState(editValue);

  // regex for validation
  const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  const nameRegex = /^([a-zA-Z]{1,29})+$/;

  // function to validate email
  const validateEmail = (event) => {
    const emailbox = document.getElementById("email");
    const email = event.target.value;
    const email_warning = document.getElementById("email_warning");
    if (emailRegex.test(email)) {
      emailbox.style.borderColor = "gray";
      email_warning.innerHTML = "";
    } else {
      email_warning.innerHTML = "Please enter a valid email";
      emailbox.style.borderColor = "red";
    }
  };

  // function to validate name
  const validateName = (event) => {
    const namebox = document.getElementById("name");
    const name = event.target.value;
    const firstNameWarn = document.getElementById("name_warning");
    if (nameRegex.test(name)) {
      namebox.style.borderColor = "gray";
      firstNameWarn.innerHTML = "";
    } else {
      firstNameWarn.innerHTML = "Please enter a valid first name";
      namebox.style.borderColor = "red";
    }
  };

  // function to validate last name
  const validateLastName = (event) => {
    const namebox = document.getElementById("last_name");
    const name = event.target.value;
    const lastNameWarn = document.getElementById("last_name_warning");
    if (nameRegex.test(name)) {
      namebox.style.borderColor = "gray";
      lastNameWarn.innerHTML = "";
    } else {
      lastNameWarn.innerHTML = "Please enter a valid last name";
      namebox.style.borderColor = "red";
    }
  };

  // function to set the values to setFormData state
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // function to handle the submit button in the form
  const handleSubmit = (event) => {
    event.preventDefault();
    onFormDataChange(formData);
    setFormData("");
    event.target.reset();
  };

  return (
    <React.Fragment>
      <div className="main_page">
        <form onSubmit={handleSubmit} className="reset">
          {/* input fields for name */}
          <div className="name_bar">
            <span style={{ display: "flex", flexDirection: "column" }}>
              <input
                name="first_name"
                className="input_address"
                placeholder="First Name"
                type="text"
                id="name"
                value={formData.first_name}
                required
                onChange={handleInputChange}
                onBlurCapture={validateName}
              />
              <div
                id="name_warning"
                style={{ color: "red", fontSize: "12px" }}
              ></div>
            </span>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <input
                name="last_name"
                className="input_address"
                placeholder="Last Name"
                type="text"
                id="last_name"
                value={formData.last_name}
                required
                onChange={handleInputChange}
                onBlurCapture={validateLastName}
              />
              <div
                id="last_name_warning"
                style={{ color: "red", fontSize: "12px" }}
              ></div>
            </span>
          </div>

          {/* input fields for address */}
          <div className="address_bar">
            <div className="inline_h3button">
              <h3>Address</h3>
              <button className="button_wrap1" type="button">+</button>
            </div>
            <div className="form_grid wrapA1">
              <input
                name="address_line1"
                className="input_address"
                placeholder="Line 1"
                type="text"
                required
                value={formData.address_line1}
                onChange={handleInputChange}
              />

              <input
                name="address_line2"
                className="input_address"
                placeholder="Line 2"
                type="text"
                required
                value={formData.address_line2}
                onChange={handleInputChange}
              />

              <input
                name="city"
                className="input_address"
                placeholder="City"
                type="text"
                required
                value={formData.city}
                onChange={handleInputChange}
              />

              <input
                name="state"
                className="input_address"
                placeholder="State"
                type="text"
                required
                value={formData.state}
                onChange={handleInputChange}
              />

              <input
                name="pin_code"
                className="input_address"
                placeholder="Pin Code"
                onChange={handleInputChange}
                value={formData.pin_code}
                required
              />

              <select
                name="country"
                className="select"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                value={formData.type_address}
              >
                <option name="Type" className="option">
                  Type
                </option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>

            <button className="button_1">Add</button>
          </div>

          {/* input fields for email addresss */}
          <div className="email_address">
            <div className="inline_h3button">
              <h3>Email Address</h3>
              <button className="button_wrap2">+</button>
            </div>

            <div className="name_bar1 wrapA2">
              <span style={{ display: "flex", flexDirection: "column" }}>
                <input
                  id="email"
                  name="email"
                  className="input_address"
                  placeholder="Email Address"
                  type="email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlurCapture={validateEmail}
                  required
                />
                <div
                  id="email_warning"
                  style={{ color: "red", fontSize: "12px" }}
                ></div>
              </span>
              <select
                name="type_email"
                className="select"
                onChange={handleInputChange}
                value={formData.type_email}
              >
                <option className="option">Type</option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>
            <button className="button_1">Add</button>
          </div>

          {/* input fields for phone number */}
          <div className="phone_number">
            <div className="inline_h3button">
              <h3>Phone number</h3>
              <button className="button_wrap3">+</button>
            </div>
            <div className="name_bar1 wrapA3">
              <input
                name="phone_number"
                className="input_address"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
              <select
                name="type_phone_number"
                className="select"
                required
                onChange={handleInputChange}
                value={formData.type_phone_number}
              >
                <option className="option">Type</option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>
            <button className="button_1">Add</button>
          </div>

          {/* buttons for saving and cancelling record */}
          <div className="footer_address">
            <button className="button_2" type="submit">
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
