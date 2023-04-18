import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Modal } from "antd";
import "./addressBookList.css";
import CreateAddressBook from "../createPage/addressBookCreate";
import View from "../viewPage/viewContact";
import NumberCarousel from "./carousel";

function AddressList() {

  // useStates
  const [formData, setFormData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    emails: [{}],
    phoneNumber: [{}],
    addresses: [{}],
  });

  const [selectedData, viewSelectedData] = useState();
  const [viewAddress, setView] = useState(false);
  const [editDataID, setEditDataID] = useState(null);

  // callback function to update the form data
  const handleFormDataChange = (data) => {
    const value = data;
    if (editDataID === null) {
      setFormData([...formData, value]);
    } else {
      formData[editDataID] = value;
    }
    setEditData("");
    setIsSubmitted(true);
    setEditDataID(null);
  };

  //function for search bar
  const items = formData;
  const filteredData = items.filter((item) =>
    item.firstName.includes(searchQuery)
  );
 
const handleCancel = (data) => {
  pageNav(data)
}
  // function to navigate between create and list page
  const pageNav = (data) => {
    if(data) {
      setIsSubmitted(false);
    }
    isSubmitted ? setIsSubmitted(false) : setIsSubmitted(true);
    setView(false);
  };

  // function to delete the form data
  const handleDelete = (index) => {
    return (event) => {
      Modal.confirm({
        title: "Are you sure, you want to delete this record?",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          const items = formData;
          if (items.length > 0) {
            const tempIndex = index;
            setFormData(items.filter((item, index) => index !== tempIndex));
          }
          event.preventDefault();
        },
      });
    };
  };

  // function to view the record
  const handleViewClick = (data) => {
    viewSelectedData(data);
    setView(true);
  };

  // function to handle the editable record
  const handleEdit = (index, item) => {
    setEditData(item);
    setEditDataID(index);
    setIsSubmitted(false);
  };


  // function to handle the number carousel
  let data = searchQuery.length === 0 ? formData : filteredData;
  const [currentPage, setCurrentPage] = useState(1);
  const numPages = Math.ceil(formData.length / 5);
  const startIdx = (currentPage - 1) * 5;
  const endIdx = startIdx + 5;
  const displayedData = data.slice(startIdx, endIdx);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // statement to assign a common name for the nested ternary operator
  let buttonText;
  if (viewAddress) {
    buttonText = "Go back";
  } else if (isSubmitted) {
    buttonText = "Create Page";
  } else {
    buttonText = "List Page";
  }
  
  return (
    <>
      {/* bread scrumbs */}
     
      <div className="navBar">
        <Link to="/home" className="textColor">
          Home /
        </Link>
        <Link
          to="/home"
          className="textColor"
          onClick={() => setIsSubmitted(true)}
        >
          Address Book
        </Link>
      
        {/* button to navigate to create and list page */}
        <button
          className="buttonToNavigate"
          onClick={pageNav}
          id="changePage"
        >
          {buttonText}
        </button>
      </div>
      <div className="containerMainPage">
      <div className="mainPage">
        {/* view page is called here */}
        {viewAddress ? (
          <View state={selectedData} />
        ) : (
          <>
            {isSubmitted ? (
              // list page
              <>
                <div className="mainPageList">
                  {/* renders if there is no data in the table */}
                  {formData.length === 0 ? (
                    <div className="searchQueryMessage">No records to display</div>
                  ) : (
                    <>
                      <input
                        placeholder="Search"
                        name="search"
                        id="search"
                        autoComplete="off"
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        className="searchQuery"
                      ></input>

                      {/* table to display the records */}
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {/* renders if there is no search query */}


                          <>
                            {displayedData.map((item, index) => (
                              <>
                              <tr key={item.firstName}>
                                <td>
                                  {item.firstName} {item.lastName}
                                </td>
                                <td>
                                  {item.phoneNumber
                                    .map((phone, phoneIndex) => (
                                      <span key={phone.phoneIndex}>
                                        {phone.phoneNumber}
                                      </span>
                                    ))
                                    .slice(0, 1)}
                                </td>
                                <td>
                                  {item.emails
                                    .map((email, emailIndex) => (
                                      <span key={email.email}>
                                        {email.email}
                                      </span>
                                    ))
                                    .slice(0, 1)}
                                </td>
                                <td>
                                  {item.addresses
                                    .map((address, addressIndex) => {
                                      const addressStr = `${address.addressLine1}, ${address.addressline2}, ${address.city}, ${address.state}, ${address.country}-${address.pinCode}`;
                                      return (
                                        <span key={address.addressLine1}>
                                          {addressStr}
                                        </span>
                                      );
                                    })
                                    .slice(0, 1)}
                                </td>
                                <td>
                                  <span className="listButtons">
                                    <button
                                      onClick={() => handleViewClick(item)}
                                      className="buttonList"
                                    >
                                      View details
                                    </button>
                                    <button
                                      onClick={() => handleEdit(index, item)}
                                      className="buttonList"
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={handleDelete(index)}
                                      className="buttonList"
                                    >
                                      Delete
                                    </button>
                                  </span>
                                </td>
                              </tr>
                              
                            </>
                            ))}
                            
                          </>
                        </tbody>
                        
                      </table>

                      <div className="carousel">
                              <NumberCarousel
                                numPages={numPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                              />
      
                            </div>
                    </>
                  )}

                  {/* renders if the search query is not found */}
                  {searchQuery  && filteredData.length === 0 && (
                    <>
                      <div className="searchQueryMessage">
                        Searched field does not exist
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              // child page is called here
              <CreateAddressBook
                cancel={handleCancel}
                editValue={editData}
                onFormDataChange={handleFormDataChange}
                editID={editDataID}
                // editDetailsView = {editDataView}
              />
            )}
          </>
        )}
      </div>
      </div>
    </>
  );
}

export default AddressList;
