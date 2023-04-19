/* eslint-disable no-restricted-globals */
import React, { useState, useRef, useEffect } from "react";

import { Modal } from "antd";
import "./addressBook.css";
import countryData from "../../JSON files/countryData.json";

function CreateAddressBook({
  onFormDataChange,
  editValue: initialValue,
  editID,
  cancel,
}) {
  // regex for validation
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const numberRegex = /^(\+?\d{1,2}[ -]?)?\d{10}$/;
  const addressRegex = /^[a-zA-Z0-9\s,.-/]+$/;
  const pinCodeRegex = /^\d{6}$/;

  const inputRef = useRef(null);
  // use states for holding current state
  const [formData, setFormData] = useState(
    initialValue
      ? initialValue
      : {
          firstName: "",
          lastName: "",
          emails: [{}],
          phoneNumber: [{}],
          addresses: [
            {
              addressLine1: "",
              addressLine2: "",
              state: "",
              city: "",
              country: "",
              pinCode: "",
              typeAddress: "",
            },
          ],
        }
  );

  // use state for holding current editAddress
  const [editAddress, setEditAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    country: "",
    pinCode: "",
    typeAddress: "",
  });

  // use states for displaying errors in first and last name
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps

  // function to validate firstName
  const validateFirstName = () => {
    if (!formData.firstName) {
      setFirstNameError("First name is required");
    } else if (formData.firstName.length < 2) {
      setFirstNameError("First name must be at least 2 characters long");
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      setFirstNameError("First name must contain only letters");
    } else {
      setFirstNameError("");
    }
  };

  // function to validate lastName
  const validateLastName = () => {
    if (!formData.lastName) {
      setLastNameError("Last name is required");
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      setLastNameError("Last name must contain only letters");
    } else {
      setLastNameError("");
    }
  };

  useEffect(() => {
    validateFirstName();
    validateLastName();
  }, [formData.firstName, formData.lastName]);

  const [address, setAddress] = useState([]);
  const [editAddressID, setEditAddressID] = useState(null);

  /**
   * This function handles adding or editing an address and performs validation on the input fields.
   */
  const handleAddItem = () => {
    const formData = Array.from(
      inputRef.current.querySelectorAll(".addressFields")
    );

    const values = formData.reduce((data, input) => {
      data[input.name] = input.value;
      return data;
    }, {});

    if (values.addressLine1 && values.addressLine2) {
      if (editAddressID === null) {
        setAddress([...address, values]);
        
      } else {
        address[editAddressID] = values;
      }
    } else {
      validate(
        "line 1",
        "addressLine1Warning",
        editAddress.addressLine1,
        addressRegex
      );
      validate(
        "line 2",
        "addressLine2Warning",
        editAddress.addressLine2,
        addressRegex
      );
      validate("city", "cityWarning", editAddress.city, addressRegex);
      validate("state", "stateWarning", editAddress.state, addressRegex);
      validate("pin code", "pinCodeWarning", editAddress.pinCode, pinCodeRegex);
    }
    setEditAddressID(null);
    setEditAddress({
      addressLine1: "",
      addressLine2: "",
      state: "",
      city: "",
      country: "",
      pinCode: "",
      typeAddress: "",
    });
  };

  // function to handle edit data in the address table
  const handleEdit = (item, index) => {
    setEditAddress(item);
    setEditAddressID(index);
  };

  // function to delete the record from the table
  const handleDelete = (index) => {
    return (event) => {
      Modal.confirm({
        title: "Are you sure, you want to delete this record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          const items = address;
          if (items.length > 0) {
            const indexTemp = index;
            setAddress(items.filter((item, index) => index !== indexTemp));
          }
          event.preventDefault();
        },
      });
    };
  };

  /**
   * The function validates user input based on a regular expression and displays a warning message if
   * the input is invalid.
   * @param inputId - The ID of the input element that the validation function is being applied to.
   * @param warningId - The ID of the HTML element where the warning message will be displayed if the
   * input is invalid.
   * @param name - The value of the input field that needs to be validated.
   * @param regex - The regular expression pattern used to validate the input.
   * @returns The function `validate` returns a boolean value (`true` or `false`) depending on whether
   * the input value matches the specified regular expression or not. If the input value is empty or
   * invalid, it returns `false`. If the input value is valid, it returns `true`.
   */
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

  // function to handle input change in email fields
  const handleInputChangeEmails = (event, index) => {
    const { name, value } = event.target;
    const emails = [...formData.emails];
    emails[index][name] = value;
    setFormData({ ...formData, emails });
  };

  // function to add new field in the email fields
  const handleAddFieldsEmail = () => {
    const emails = [...formData.emails];
    emails.push({});
    setFormData({ ...formData, emails });
  };

  const handleRemoveEmail = (index) => {
    const warningMessage = document.getElementById('minimumFieldWarningEmail');
    const fieldData = [...formData.emails]
    
    if (index > 0) {   
      fieldData.splice(index, 1);
      setFormData({ ...formData,emails: fieldData });
    } else {
      warningMessage.innerHTML = "A minimum of one field is required";
      warningMessage.style.color = "red";
      setTimeout(() => {
        warningMessage.innerHTML = "";
      }, 2000);
    }
  }

  // function to handle the input change in phone fields
  const handleInputChangePhone = (event, index) => {
    const { name, value } = event.target;
    const phoneNumber = [...formData.phoneNumber];
    phoneNumber[index][name] = value;
    setFormData({ ...formData, phoneNumber });
  };

  // function to add new fields in the phone fields
  const handleAddFieldsPhone = () => {
    const phoneNumber = [...formData.phoneNumber];
    phoneNumber.push({});
    setFormData({ ...formData, phoneNumber });
  };

  // function to remove input fields. Used for email and phoneNumber fields
  const handleRemovePhone = (index) => {
    const warningMessage = document.getElementById('minimumFieldWarningPhone');
    const fieldData = [...formData.phoneNumber]
    
    if (index > 0) {
      fieldData.splice(index, 1);
      setFormData({ ...formData, phoneNumber: fieldData });
    } else {
      warningMessage.innerHTML = "A minimum of one field is required";
      warningMessage.style.color = "red";
      setTimeout(() => {
        warningMessage.innerHTML = "";
      }, 2000);
    }
  }

  /**
   * This function handles form submission and validates all the fields before submitting the form.
   * @param event - The event parameter is an object that represents the event that triggered the
   * function. In this case, it is the form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = { ...formData };
    if (address.length === 0) {
      updatedFormData.addresses = [editAddress];
    } else {
      updatedFormData.addresses = address;
    }

    // boolean to check whether all the fields are empty or not
    let allFieldsValid = true;

    // Check all email fields
    formData.emails.forEach((email, index) => {
      const value = email.email;
      if (!value) {
        document.getElementById(`emailWarning${index}`).textContent =
          "This field is required";
        document.getElementById(`email${index}`).style.borderColor = "red";
        allFieldsValid = false;
      }
    });

    // Check all phone number fields
    formData.phoneNumber.forEach((phone, index) => {
      const value = phone.phoneNumber;
      if (!value) {
        document.getElementById(`phoneWarning${index}`).textContent =
          "This field is required";
        document.getElementById(`phone number${index}`).style.borderColor =
          "red";
        allFieldsValid = false;
      }
    });

    if (firstNameError || lastNameError) {
      allFieldsValid = false;
    }

    // if all fields are valid, submit form
    if (allFieldsValid) {
      onFormDataChange(updatedFormData);
    }
  };

  // for mapping the options in the select fields
  const types = [
    { value: "Personal", label: "Personal" },
    { value: "Work", label: "Work" },
  ];

  // function to handle cancel (Navigate to list page)
  const handleCancel = () => {
    cancel(true);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="reset">
        {/* input fields for name */}
        <div className="nameField">
          <span className="flexColumn">
            <input
              name="firstName"
              className={`inputAddress ${
                firstNameError ? "warningBorderColor" : ""
              }`}
              placeholder="First Name"
              type="text"
              id="name"
              value={formData.firstName}
              onChange={(event) => {
                setFormData({ ...formData, firstName: event.target.value });
              }}
            />
            {/* <div id="nameWarning" className="warningMessage"></div> */}
            {firstNameError && (
              <div className="warningMessage">{firstNameError}</div>
            )}
          </span>
          <span className="flexColumn">
            <input
              name="lastName"
              className={`inputAddress ${
                lastNameError ? "warningBorderColor" : ""
              }`}
              placeholder="Last Name"
              type="text"
              id="last name"
              value={formData.lastName}
              onChange={(event) => {
                setFormData({ ...formData, lastName: event.target.value });
              }}
            />
            {/* <div id="lastNameWarning" className="warningMessage"></div> */}
            {lastNameError && (
              <div className="warningMessage">{lastNameError}</div>
            )}
          </span>
        </div>

        {/* input fields for address */}
        <div className="addressBar">
          <div className="wrap">
            <h3>Address</h3>
            <button className="buttonAdd" type="button">
              +
            </button>
          </div>
          <div className="formGrid" ref={inputRef}>
            <span className="flexColumn">
              <input
                name="addressLine1"
                className="inputAddress addressFields"
                placeholder="Line 1"
                type="text"
                id="line 1"
                value={editAddress.addressLine1}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    addressLine1: event.target.value,
                  });
                  validate(
                    "line 1",
                    "addressLine1Warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="addressLine1Warning" className="warningMessage"></div>
            </span>
            <span className="flexColumn">
              <input
                name="addressLine2"
                className="inputAddress addressFields"
                placeholder="Line 2"
                type="text"
                id="line 2"
                value={editAddress.addressLine2}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    addressLine2: event.target.value,
                  });
                  validate(
                    "line 2",
                    "addressLine2Warning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="addressLine2Warning" className="warningMessage"></div>
            </span>
            <span className="flexColumn">
              <input
                name="city"
                className="inputAddress addressFields"
                placeholder="City"
                id="city"
                type="text"
                value={editAddress.city}
                onChange={(event) => {
                  setEditAddress({ ...editAddress, city: event.target.value });
                  validate(
                    "city",
                    "cityWarning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="cityWarning" className="warningMessage"></div>
            </span>
            <span className="flexColumn">
              <input
                name="state"
                className="inputAddress addressFields"
                placeholder="State"
                id="state"
                type="text"
                value={editAddress.state}
                onChange={(event) => {
                  setEditAddress({ ...editAddress, state: event.target.value });
                  validate(
                    "state",
                    "stateWarning",
                    event.target.value,
                    addressRegex
                  );
                }}
              />
              <div id="stateWarning" className="warningMessage"></div>
            </span>
            <span className="flexColumn">
              <input
                name="pinCode"
                className="inputAddress addressFields"
                placeholder="Pin Code"
                id="pin code"
                value={editAddress.pinCode}
                onChange={(event) => {
                  setEditAddress({
                    ...editAddress,
                    pinCode: event.target.value,
                  });
                  validate(
                    "pin code",
                    "pinCodeWarning",
                    event.target.value,
                    pinCodeRegex
                  );
                }}
              />
              <div className="warningMessage" id="pinCodeWarning"></div>
            </span>
            <select
              name="country"
              className="select addressFields"
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
                <option
                  value={getCountry.country_name}
                  key={getCountry.country_name}
                >
                  {getCountry.country_name}
                </option>
              ))}
            </select>

            <select
              className="select addressFields"
              name="typeAddress"
              value={editAddress.typeAddress}
              onChange={(event) =>
                setEditAddress({
                  ...editAddress,
                  typeAddress: event.target.value,
                })
              }
            >
              <option disabled value="">
                Type
              </option>
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="buttonAddress"
            onClick={handleAddItem}
          >
            Add
          </button>
          <div id="addressValidation" className="warningMessage"></div>
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
                  const addressStr = `${item.addressLine1}, ${item.addressLine2}, ${item.city}, ${item.state}, ${item.country}-${item.pinCode}`;
                  return (
                    <tr key={item.typeAddress}>
                      <td>{addressStr}</td>
                      <td>{item.typeAddress ? item.typeAddress : "NA"}</td>
                      <td>
                        <span className="listButtons">
                          <button
                            type="button"
                            className="buttonList"
                            onClick={() => handleEdit(item, index)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={handleDelete(index)}
                            className="buttonList"
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
        <div className="emailAddress">
          <div className="wrap">
            <h3>Email Address</h3>
            <button
              className="buttonAdd"
              type="button"
              onClick={handleAddFieldsEmail}
            >
              +
            </button>
            <span
              id="minimumFieldWarningEmail"
              className="minimumFieldMessage"
            ></span>
          </div>
          {formData.emails.map((email, index) => (
            <>
              <div className="nameBar" key={email.email}>
                <span className="flexColumn">
                  <input
                    id={`email${index}`}
                    name="email"
                    className="inputAddress"
                    placeholder="Email Address"
                    value={email.email}
                    onChange={(event) => {
                      handleInputChangeEmails(event, index);
                      validate(
                        `email${index}`,
                        `emailWarning${index}`,
                        event.target.value,
                        emailRegex
                      );
                    }}
                  />
                  <div
                    id={`emailWarning${index}`}
                    className="warningMessage"
                  ></div>
                </span>
                <select
                  name="typeEmail"
                  className="select"
                  onChange={(event) => handleInputChangeEmails(event, index)}
                  value={email.typeEmail}
                  required
                >
                  <option disabled value="">
                    Type
                  </option>
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="buttonRemove"
                type="button"
                onClick={() => handleRemoveEmail(index)}
              >
                Remove
              </button>
            </>
          ))}
        </div>

        {/* input fields for phone number */}
        <div className="phoneNumber">
          <div className="wrap">
            <h3>Phone number</h3>
            <button
              className="buttonAdd"
              type="button"
              onClick={handleAddFieldsPhone}
            >
              +
            </button>
            <span
              id="minimumFieldWarningPhone"
              className="minimumFieldMessage"
            ></span>
          </div>
          {formData.phoneNumber.map((phone, index) => (
            <>
              <div className="nameBar" key={phone.phone}>
                <span className="flexColumn">
                  <input
                    name="phoneNumber"
                    className="inputAddress"
                    placeholder="Phone Number"
                    id={`phone number${index}`}
                    value={phone.phoneNumber}
                    onChange={(event) => {
                      handleInputChangePhone(event, index);
                      validate(
                        `phone number${index}`,
                        `phoneWarning${index}`,
                        event.target.value,
                        numberRegex
                      );
                    }}
                  />
                  <div
                    id={`phoneWarning${index}`}
                    className="warningMessage"
                  ></div>
                </span>
                <select
                  name="phoneNumberType"
                  className="select"
                  onChange={(event) => {
                    handleInputChangePhone(event, index);
                  }}
                  value={phone.type_phone_number}
                >
                  <option disabled value="">
                    Type
                  </option>
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="buttonRemove"
                type="button"
                onClick={() => handleRemovePhone(index)}
              >
                Remove
              </button>
            </>
          ))}
        </div>
        {/* buttons for saving and cancelling record */}
        <div className="footerAddress">
          <button
            className="buttonFooter"
            type="submit"
            id="submitButton"
            onChange={(event) => event.target.reset()}
          >
            {editID === null ? "Save" : "Update"}
          </button>
          <button className="buttonFooter" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default CreateAddressBook;
