import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    first_name: "",
    last_name: "",
    emails: [{}],
    phone_number: [{}],
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
    item.first_name.includes(searchQuery)
  );

  // function to navigate between create and list page
  const pageNav = () => {
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
            const Index = index;
            setFormData(items.filter((item, index) => index !== Index));
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

  let data = searchQuery.length === 0 ? formData : filteredData;

  const [currentPage, setCurrentPage] = useState(1);

  // assuming data is an array of table records
  const numPages = Math.ceil(formData.length / 5);

  const startIdx = (currentPage - 1) * 5;
  const endIdx = startIdx + 5;
  const displayedData = data.slice(startIdx, endIdx);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
      {/* bread scrumbs */}
      <div className="nav_bar">
        <Link to="/home" className="textColor">
          Home /
        </Link>
        <Link
          to="/home"
          className="textColor"
          onClick={() => setIsSubmitted(true)}
        >
          Address Book /
        </Link>
        <Link
          to="/home"
          className="textColor"
          onClick={() => setIsSubmitted(false)}
        >
          Create
        </Link>

        {/* button to navigate to create and list page */}
        <button
          className="button_to_navigate"
          onClick={pageNav}
          id="changePage"
        >
          {viewAddress ? "Go back" : isSubmitted ? "Create Page" : "List Page"}
        </button>
      </div>
      <div className="main_page">
        {/* view page is called here */}
        {viewAddress ? (
          <View state={selectedData} />
        ) : (
          <>
            {isSubmitted ? (
              // list page
              <>
                <div className="main_page_list">
                  {/* renders if there is no data in the table */}
                  {formData.length === 0 ? (
                    <div>No records to display</div>
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
                        className="search_query"
                      ></input>

                      {/* table to display the records */}
                      <table className="tableWrapper">
                        <thead className="table_head">
                          <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody className="table_body">
                          {/* renders if there is no search query */}
                          
                          
                            <>
                              {displayedData.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    {item.first_name} {item.last_name}
                                  </td>
                                  <td>
                                    {item.phone_number
                                      .map((phone, phone_index) => (
                                        <span key={phone_index}>
                                          {phone.phone_number}
                                        </span>
                                      ))
                                      .slice(0, 1)}
                                  </td>
                                  <td>
                                    {item.emails
                                      .map((email, email_index) => (
                                        <span key={email_index}>
                                          {email.email}
                                        </span>
                                      ))
                                      .slice(0, 1)}
                                  </td>
                                  <td>
                                    {item.addresses
                                      .map((address, address_index) => {
                                        const addressStr = `${address.address_line1}, ${address.address_line2}, ${address.city}, ${address.state}, ${address.country}-${address.pin_code}`;
                                        return (
                                          <span key={address_index}>
                                            {addressStr}
                                          </span>
                                        );
                                      })
                                      .slice(0, 1)}
                                  </td>
                                  <td>
                                    <span className="list_buttons">
                                      <button
                                        onClick={() => handleViewClick(item)}
                                        className="button_list"
                                      >
                                        View details
                                      </button>
                                      <button
                                        onClick={() => handleEdit(index, item)}
                                        className="button_list"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        onClick={handleDelete(index)}
                                        className="button_list"
                                      >
                                        Delete
                                      </button>
                                    </span>
                                  </td>
                                </tr>
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
                  {searchQuery.length !== 0 && filteredData.length === 0 && (
                    <>
                      <div className="search_query_message">
                        Searched field does not exist
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              // child page is called here
              <CreateAddressBook
                editValue={editData}
                onFormDataChange={handleFormDataChange}
                editID={editDataID}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AddressList;
