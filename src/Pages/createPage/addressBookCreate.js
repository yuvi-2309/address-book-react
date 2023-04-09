/* eslint-disable no-restricted-globals */
import React, { useState, useRef } from "react";

import { Modal } from "antd";
import "./addressBook.css";
import countryData from "../../JSON files/countryData.json";

function CreateAddressBook({
  onFormDataChange,
  editValue: initialValue,
  editID,
}) {
  const [formData, setFormData] = useState(
    initialValue
      ? initialValue
      : {
          first_name: "",
          last_name: "",
          emails: [{}],
          phone_number: [{}],
          addresses: [
            {
              address_line1: "",
              address_line2: "",
              state: "",
              city: "",
              country: "",
              pin_code: "",
              type_address: "",
            },
          ],
        }
  );

  // regex for validation
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const nameRegex = /^([a-zA-Z]{1,29})+$/;
  const numberRegex = /^(\+?\d{1,2}[ -]?)?\d{10}$/;

  const inputRef = useRef(null);
  const [editAddress, setEditAddress] = useState({
    address_line1: "",
    address_line2: "",
    state: "",
    city: "",
    country: "",
    pin_code: "",
    type_address: "",
  });
  const [address, setAddress] = useState([]);

  const [editAddressID, setEditAddressID] = useState(null);

  const handleAddItem = () => {
    const formData = Array.from(
      inputRef.current.querySelectorAll(".address_fields")
    );
    const values = formData.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});

    if (editAddressID === null) {
      setAddress([...address, values]);
    } else {
      address[editAddressID] = values;
    }

    setEditAddressID(null);
    setEditAddress({
      address_line1: "",
      address_line2: "",
      state: "",
      city: "",
      country: "",
      pin_code: "",
      type_address: "",
    });
  };

  const handleEdit = (item, index) => {
    setEditAddress(item);
    setEditAddressID(index);
  };

  const handleDelete = (index) => {
    return (event) => {
      Modal.confirm({
        title: "Are you sure, you want to delete this record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          const items = address;
          if (items.length > 0) {
            const Index = index;
            setAddress(items.filter((item, index) => index !== Index));
          }
          event.preventDefault();
          console.log(address);
        },
      });
    };
  };

  // function to validate the respective form fields
  const validateForm = () => {
    const firstName = document.getElementById("name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone_number").value;
    const submitButton = document.getElementById("submit_button");

    const nameValid = validate("name", "name_warning", firstName, nameRegex);
    const lastNameValid = validate(
      "last_name",
      "last_name_warning",
      lastName,
      nameRegex
    );
    const emailValid = validate("email", "email_warning", email, emailRegex);
    const phoneValid = validate(
      "phone_number",
      "phone_number_warning",
      phone,
      numberRegex
    );

    // Disable submit button if any validation failed
    if (!nameValid || !lastNameValid || !emailValid || !phoneValid) {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  };

  const validate = (inputId, warningId, name, regex) => {
    const namebox = document.getElementById(inputId);
    const nameWarn = document.getElementById(warningId);

    if (regex.test(name)) {
      namebox.style.borderColor = "gray";
      nameWarn.innerHTML = "";
      return true;
    } else {
      nameWarn.innerHTML = `Please enter a valid ${inputId.replace("_", " ")}`;
      namebox.style.borderColor = "red";
      return false;
    }
  };

  const handleInputChangeEmails = (event, index) => {
    const { name, value } = event.target;
    const emails = [...formData.emails];
    emails[index][name] = value;
    setFormData({ ...formData, emails });
  };

  const handleAddFieldsEmail = () => {
    const emails = [...formData.emails];
    emails.push({});
    setFormData({ ...formData, emails });
  };

  const handleAddToEmails = (index) => {
    const warning_message = document.getElementById("minimum_field_warning_email");

    if (index > 0) {
      const emails = [...formData.emails];
      emails.splice(index, 1);
      setFormData({ ...formData, emails });
    } else {
      warning_message.innerHTML = "A minimum of one field is required";
      warning_message.style.color = "red";
      setTimeout(() => {
        warning_message.innerHTML = "";
      }, 3000);
    }
  };

  const handleInputChangePhone = (event, index) => {
    const { name, value } = event.target;
    const phone_number = [...formData.phone_number];
    phone_number[index][name] = value;
    setFormData({ ...formData, phone_number });
  };
  const handleAddToPhone = (index) => {
    const warning_message = document.getElementById("minimum_field_warning_phone");
    
     if (index > 0) {
    const phone_number = [...formData.phone_number];
    phone_number.splice(index, 1);
    setFormData({ ...formData, phone_number });
    } else {
      warning_message.innerHTML = "A minimum of one field is required";
      warning_message.style.color = "red";
      setTimeout(() => {
        warning_message.innerHTML = "";
      }, 3000);
    }
  };
  const handleAddFieldsPhone = () => {
    const phone_number = [...formData.phone_number];
    phone_number.push({});
    setFormData({ ...formData, phone_number });
  };

  // function to handle the submit button in the form
  const handleSubmit = (event) => {
    const updatedFormData = { ...formData };
    updatedFormData.addresses = address;
    event.preventDefault();
    onFormDataChange(updatedFormData);
    event.target.reset();
  };

  const cancel = () => {
    console.log(initialValue);
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
                onChange={(event) => {
                  setFormData({ ...formData, first_name: event.target.value }); validateForm(); }
                }
              
              />
              <div id="name_warning" className="warning_message"></div>
            </span>
            <span className="flex_column">
              <input
                name="last_name"
                className="input_address"
                placeholder="Last Name"
                type="text"
                id="last_name"
                value={formData.last_name}
                onChange={(event) =>{
                  setFormData({ ...formData, last_name: event.target.value }); validateForm();}
                }
              
              />
              <div id="last_name_warning" className="warning_message"></div>
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
            <div className="form_grid wrapA1" ref={inputRef}>
              <input
                name="address_line1"
                className="input_address address_fields"
                placeholder="Line 1"
                type="text"
                id="line_1"
                value={editAddress.address_line1}
                onChange={(event) =>
                  setEditAddress({
                    ...editAddress,
                    address_line1: event.target.value,
                  })
                }

                // required
              />

              <input
                name="address_line2"
                className="input_address address_fields"
                placeholder="Line 2"
                type="text"
                id="line_2"
                value={editAddress.address_line2}
                onChange={(event) =>
                  setEditAddress({
                    ...editAddress,
                    address_line2: event.target.value,
                  })
                }

                // required
              />

              <input
                name="city"
                className="input_address address_fields"
                placeholder="City"
                type="text"
                value={editAddress.city}
                onChange={(event) =>
                  setEditAddress({ ...editAddress, city: event.target.value })
                }

                // required
              />

              <input
                name="state"
                className="input_address address_fields"
                placeholder="State"
                type="text"
                value={editAddress.state}
                onChange={(event) =>
                  setEditAddress({ ...editAddress, state: event.target.value })
                }

                // required
              />

              <input
                name="pin_code"
                className="input_address address_fields"
                placeholder="Pin Code"
                value={editAddress.pin_code}
                onChange={(event) =>
                  setEditAddress({
                    ...editAddress,
                    pin_code: event.target.value,
                  })
                }
                // required
              />

              <select
                name="country"
                className="select address_fields"
                value={editAddress.country}
                onChange={(event) =>
                  setEditAddress({
                    ...editAddress,
                    country: event.target.value,
                  })
                }
              >
                <option className="option">Country</option>
                {countryData.map((getCountry, index) => (
                  <option value={getCountry.country_name} key={index}>
                    {getCountry.country_name}
                  </option>
                ))}
              </select>

              <select
                className="select address_fields"
                name="type_address"
                value={editAddress.type_address}
                onChange={(event) =>
                  setEditAddress({
                    ...editAddress,
                    type_address: event.target.value,
                  })
                }
              >
                <option name="Type" className="option">
                  Type
                </option>
                <option>Personal</option>
                <option>Work</option>
              </select>
            </div>

            <button type="button" className="button_1" onClick={handleAddItem}>
              Add
            </button>
            <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {address.map((item, index) => {
                const addressStr = `${item.address_line1}, ${item.address_line2}, ${item.city}, ${item.state}, ${item.country}-${item.pin_code}`;
                return(
                  <tr key={index}>
                    <td>{addressStr}</td>

                    <td>{item.type_address}</td>
                    <td>
                      <span className="list_buttons">
                        <button
                          type="button"
                          className="button_list"
                          onClick={() => handleEdit(item, index)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={handleDelete(index)}
                          className="button_list"
                        >
                          Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>

          {/* input fields for email addresss */}
          <div className="email_address">
            <div className="wrap">
              <h3>Email Address</h3>
              <button
                className="button_add"
                type="button"
                onClick={handleAddFieldsEmail}
              >
                +
              </button>
              <span
                id="minimum_field_warning_email"
                className="minimum_field_message"
              ></span>
            </div>
            {formData.emails.map((email, index) => (
              <>
                <div className="name_bar1 wrapA2" key={index}>
                  <span className="flex_column">
                    <input
                      id="email"
                      name="email"
                      className="input_address"
                      placeholder="Email Address"
                      value={email.email}
                      onChange={(event) =>{
                        handleInputChangeEmails(event, index);
                         validateForm();
                      }}
                     
                    />
                    <div id="email_warning" className="warning_message"></div>
                  </span>
                  <select
                    name="type_email"
                    className="select"
                    onChange={(event) => handleInputChangeEmails(event, index)}
                    value={email.type_email}
                    required
                  >
                    <option className="option">Type</option>
                    <option>Personal</option>
                    <option>Work</option>
                  </select>
                </div>
                <button
                  className="button_1"
                  type="button"
                  onClick={() => handleAddToEmails(index)}
                >
                  Remove
                </button>
              </>
            ))}
          </div>

          {/* input fields for phone number */}
          <div className="phone_number">
            <div className="wrap">
              <h3>Phone number</h3>
              <button
                className="button_add"
                type="button"
                onClick={handleAddFieldsPhone}
              >
                +
              </button>
              <span
                id="minimum_field_warning_phone"
                className="minimum_field_message"
              ></span>
            </div>
            {formData.phone_number.map((phone, index) => (
              <>
                <div className="name_bar1 wrapA3" key={index}>
                  <span className="flex_column">
                    <input
                      name="phone_number"
                      className="input_address"
                      placeholder="Phone Number"
                      id="phone_number"
                      value={phone.phone_number}
                      onChange={(event) => {handleInputChangePhone(event, index);
                      validateForm();}}
                   
                    />
                    <div
                      id="phone_number_warning"
                      className="warning_message"
                    ></div>
                  </span>
                  <select
                    name="type_phone_number"
                    className="select"
                    onChange={(event) => handleInputChangePhone(event, index)}
                   
                    value={phone.type_phone_number}
                    required
                  >
                    <option className="option">Type</option>
                    <option>Personal</option>
                    <option>Work</option>
                  </select>
                </div>
                <button
                  className="button_1"
                  type="button"
                  onClick={() => handleAddToPhone(index)}
                >
                  Remove
                </button>
              </>
            ))}
          </div>
          {/* buttons for saving and cancelling record */}
          <div className="footer_address">
            <button
              className="button_2"
              type="submit"
              id="submit_button"
              onChange={(event) => event.target.reset()}
            >
              {editID === null ? "Save" : "Update"}
            </button>
            <button className="button_2" type="button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CreateAddressBook;
