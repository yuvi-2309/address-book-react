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
  // regex for validation
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const nameRegex = /^([a-zA-Z]{1,29})+$/;
  const numberRegex = /^(\+?\d{1,2}[ -]?)?\d{10}$/;
  const addressRegex = /^[a-zA-Z0-9\s,.-/]+$/;
  const pinCodeRegex = /^[0-9]{6}$/;

  const inputRef = useRef(null);
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

  // function to add the address fields in the address table
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

  // function to edit the address fields in the table
  const handleEdit = (item, index) => {
    setEditAddress(item);
    setEditAddressID(index);
  };

  // function to delete the address fields in the table
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
        },
      });
    };
  };

  // function to validate the input fields
  const validate = (inputId, warningId, name, regex) => {
    const namebox = document.getElementById(inputId);
    const nameWarn = document.getElementById(warningId);

    if (!name) {
      nameWarn.innerHTML = "This field is required";
      namebox.style.borderColor = "red";
      return false;
    }
    if (regex.test(name)) {
      namebox.style.borderColor = "gray";
      nameWarn.innerHTML = "";
      return true;
    } else {
      const inputName = inputId.replace(/\d+/g, ""); // remove digits from inputId
      nameWarn.innerHTML = `Please enter a valid ${inputName.replace(
        "_",
        " "
      )}`;
      namebox.style.borderColor = "red";
      return false;
    }
  };

  // function to handle the data in the email fields
  const handleInputChangeEmails = (event, index) => {
    const { name, value } = event.target;
    const emails = [...formData.emails];
    emails[index][name] = value;
    setFormData({ ...formData, emails });
  };

  // function to add new field in the email column
  const handleAddFieldsEmail = () => {
    const emails = [...formData.emails];
    emails.push({});
    setFormData({ ...formData, emails });
  };

  // function to remove the dynamically rendering email field and display error message in the email column
  const removeEmails = (index) => {
    const warning_message = document.getElementById(
      "minimum_field_warning_email"
    );

    if (index > 0) {
      const emails = [...formData.emails];
      emails.splice(index, 1);
      setFormData({ ...formData, emails });
    } else {
      warning_message.innerHTML = "A minimum of one field is required";
      warning_message.style.color = "red";
      setTimeout(() => {
        warning_message.innerHTML = "";
      }, 2000);
    }
  };

  // function to handle the input change in phone
  const handleInputChangePhone = (event, index) => {
    const { name, value } = event.target;
    const phone_number = [...formData.phone_number];
    phone_number[index][name] = value;
    setFormData({ ...formData, phone_number });
  };

  // function to remove the dynamically rendering phone number field and display error message in the phone number column

  const removePhone = (index) => {
    const warning_message = document.getElementById(
      "minimum_field_warning_phone"
    );

    if (index > 0) {
      const phone_number = [...formData.phone_number];
      phone_number.splice(index, 1);
      setFormData({ ...formData, phone_number });
    } else {
      warning_message.innerHTML = "A minimum of one field is required";
      warning_message.style.color = "red";
      setTimeout(() => {
        warning_message.innerHTML = "";
      }, 2000);
    }
  };

  // function to add new fields in the phone column
  const handleAddFieldsPhone = () => {
    const phone_number = [...formData.phone_number];
    phone_number.push({});
    setFormData({ ...formData, phone_number });
  };

  // function to handle the submit button in the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // boolean to check whether all the fields are empty or not
    let allFieldsValid = true;

    // Check first name
    const firstNameValid = validate(
      "name",
      "name_warning",
      formData.first_name,
      nameRegex
    );

    // Check last name
    const lastNameValid = validate(
      "last name",
      "last_name_warning",
      formData.last_name,
      nameRegex
    );
    const address_line_1 = validate(
      "line 1",
      "address_line1_warning",
      formData.addresses.address_line1,
      addressRegex
    );
    const address_line_2 = validate(
      "line 2",
      "address_line2_warning",
      formData.addresses.address_line2,
      addressRegex
    );
    const city = validate(
      "city",
      "city_warning",
      formData.addresses.city,
      addressRegex
    );
    const state = validate(
      "state",
      "state_warning",
      formData.addresses.state,
      addressRegex
    );
    const pin_code = validate(
      "pin code",
      "pin_code_warning",
      formData.addresses.pin_code,
      pinCodeRegex
    );

    if (
      !firstNameValid &&
      !lastNameValid &&
      !address_line_1 &&
      !address_line_2 &&
      !city &&
      !state &&
      !pin_code
    ) {
      allFieldsValid = false;
    }

    // Check all email fields
    formData.emails.forEach((email, index) => {
      const value = email.email;
      if (!value) {
        document.getElementById(`email_warning${index}`).textContent =
          "This field is required";
        document.getElementById(`email${index}`).style.borderColor = "red";
        allFieldsValid = false;
      }
    });

    // Check all phone number fields
    formData.phone_number.forEach((phone, index) => {
      const value = phone.phone_number;
      if (!value) {
        document.getElementById(`phone_warning${index}`).textContent =
          "This field is required";
        document.getElementById(`phone number${index}`).style.borderColor =
          "red";
        allFieldsValid = false;
      }
    });

    // If all fields are valid, submit form
    if (allFieldsValid) {
      const updatedFormData = { ...formData };
      updatedFormData.addresses = address;
      onFormDataChange(updatedFormData);
      event.target.reset();
    }
  };

  // for mapping the options in the select fields
  const addressTypes = [
    { value: "personal", label: "Personal" },
    { value: "work", label: "Work" },
  ];

  return (
    <React.Fragment>
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
                setFormData({ ...formData, first_name: event.target.value });
                validate("name", "name_warning", event.target.value, nameRegex);
              }}
            />
            <div id="name_warning" className="warning_message"></div>
          </span>
          <span className="flex_column">
            <input
              name="last_name"
              className="input_address"
              placeholder="Last Name"
              type="text"
              id="last name"
              value={formData.last_name}
              onChange={(event) => {
                setFormData({ ...formData, last_name: event.target.value });
                validate(
                  "last name",
                  "last_name_warning",
                  event.target.value,
                  nameRegex
                );
              }}
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
          <div className="form_grid" ref={inputRef}>
            <span className="flex_column">
              <input
                name="address_line1"
                className="input_address address_fields"
                placeholder="Line 1"
                type="text"
                id="line 1"
                value={editAddress.address_line1}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    address_line1: event.target.value,
                  });
                  validate(
                    "line 1",
                    "address_line1_warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="address_line1_warning" className="warning_message"></div>
            </span>
            <span className="flex_column">
              <input
                name="address_line2"
                className="input_address address_fields"
                placeholder="Line 2"
                type="text"
                id="line 2"
                value={editAddress.address_line2}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    address_line2: event.target.value,
                  });
                  validate(
                    "line 2",
                    "address_line2_warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="address_line2_warning" className="warning_message"></div>
            </span>
            <span className="flex_column">
              <input
                name="city"
                className="input_address address_fields"
                placeholder="City"
                id="city"
                type="text"
                value={editAddress.city}
                onChange={(event) => {
                  setEditAddress({ ...editAddress, city: event.target.value });
                  validate(
                    "city",
                    "city_warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="city_warning" className="warning_message"></div>
            </span>
            <span className="flex_column">
              <input
                name="state"
                className="input_address address_fields"
                placeholder="State"
                id="state"
                type="text"
                value={editAddress.state}
                onChange={(event) => {
                  setEditAddress({ ...editAddress, state: event.target.value });
                  validate(
                    "state",
                    "state_warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="state_warning" className="warning_message"></div>
            </span>
            <span className="flex_column">
              <input
                name="pin_code"
                className="input_address address_fields"
                placeholder="Pin Code"
                id="pin code"
                value={editAddress.pin_code}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    pin_code: event.target.value,
                  });
                  validate(
                    "pin code",
                    "pin_code_warning",
                    event.target.value,
                    pinCodeRegex
                  );
                }}
              />
              <div className="warning_message" id="pin_code_warning"></div>
            </span>
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
              <option disabled value="">
                Type
              </option>
              {addressTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="button_address"
            onClick={handleAddItem}
          >
            Add
          </button>
          {address.length > 0 && (
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
                  return (
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
                  );
                })}
              </tbody>
            </table>
          )}
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
                    id={`email${index}`}
                    name="email"
                    className="input_address"
                    placeholder="Email Address"
                    value={email.email}
                    onChange={(event) => {
                      handleInputChangeEmails(event, index);
                      validate(
                        `email${index}`,
                        `email_warning${index}`,
                        event.target.value,
                        emailRegex
                      );
                    }}
                  />
                  <div
                    id={`email_warning${index}`}
                    className="warning_message"
                  ></div>
                </span>
                <select
                  name="type_email"
                  className="select"
                  onChange={(event) => handleInputChangeEmails(event, index)}
                  value={email.type_email}
                  required
                >
                  <option disabled value="">
                Type
              </option>
              {addressTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
                </select>
              </div>
              <button
                className="button_remove"
                type="button"
                onClick={() => removeEmails(index)}
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
                    id={`phone number${index}`}
                    value={phone.phone_number}
                    onChange={(event) => {
                      handleInputChangePhone(event, index);
                      validate(
                        `phone number${index}`,
                        `phone_warning${index}`,
                        event.target.value,
                        numberRegex
                      );
                    }}
                  />
                  <div
                    id={`phone_warning${index}`}
                    className="warning_message"
                  ></div>
                </span>
                <select
                  name="phoneNumberType"
                  className="select"
                  onChange={(event) => {
                    handleInputChangePhone(event, index);
                  }}
                  value={phone.type_phone_number}
                  required
                >
                  <option disabled value="">
                Type
              </option>
              {addressTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
                </select>
              </div>
              <button
                className="button_remove"
                type="button"
                onClick={() => removePhone(index)}
              >
                Remove
              </button>
            </>
          ))}
        </div>
        {/* buttons for saving and cancelling record */}
        <div className="footer_address">
          <button
            className="button_footer"
            type="submit"
            id="submit_button"
            onChange={(event) => event.target.reset()}
          >
            {editID === null ? "Save" : "Update"}
          </button>
          <button className="button_footer" type="button">
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default CreateAddressBook;
