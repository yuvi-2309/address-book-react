import React from "react";
import "./addressBookList.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateAddressBook from "../createPage/addressBookCreate";
import { Modal } from "antd";
import View from "../viewPage/viewContact";
import NumberCarousel from "./carousel";

function AddressList() {
  // useStates
  const [formData, setFormData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState({});
  const [selectedData, viewSelectedData] = useState();
  const [viewAddress, setView] = useState(false);
  const [editDataID, setEditDataID] = useState();

  // callback function to update the form data
  const handleFormDataChange = (data) => {
    const value = data;
    if (editDataID === null) {
      setFormData([...formData, value]);
      console.log(value);
    } else {
      value[editDataID] = formData;
      setFormData(value[editDataID]);
    }
    // setFormData(item);
    setIsSubmitted(true);
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

  return (
    <>
      {/* bread scrumbs */}
      <div className="nav_bar">
        <Link to="/home" className="textColor">
          Home /
        </Link>
        <Link to="/home" className="textColor">
          Address Book /
        </Link>
        <Link to="/home" className="textColor">
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
                  <input
                    placeholder="Search"
                    name="search"
                    id="search"
                    autoComplete="off"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    style={{
                      paddingLeft: "20px",
                      marginLeft: "40px",
                      marginBottom: "20px",
                      marginTop: "10px",
                      width: "30%",
                      outline: "none",
                    }}
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
                      {searchQuery.length === 0 && (
                        <>
                          {formData.map((item, index) => (
                            <tr key={index}>
                              <td onClick={() => handleViewClick(item)}>
                                {item.first_name} {item.last_name}
                              </td>
                              <td onClick={() => handleViewClick(item)}>
                                {item.phone_number}
                              </td>
                              <td onClick={() => handleViewClick(item)}>
                                {item.email}
                              </td>
                              <td onClick={() => handleViewClick(item)}>
                                {item.address_line1 +
                                  ", " +
                                  item.address_line2 +
                                  ", " +
                                  item.city +
                                  "-" +
                                  item.pin_code +
                                  ", " +
                                  item.state +
                                  ", " +
                                  item.country}
                              </td>
                              <td>
                                <span
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
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
                      )}

                      {/* renders if the search bar is active */}
                      {searchQuery.length !== 0 && (
                        <>
                          {filteredData.map((item, index) => (
                            <tr
                              key={index}
                              onClick={() => handleViewClick(item)}
                            >
                              <td>
                                {item.first_name} {item.last_name}
                              </td>
                              <td>{item.phone_number}</td>
                              <td>{item.email}</td>
                              <td>
                                {item.address_line1 +
                                  ", " +
                                  item.address_line2 +
                                  ", " +
                                  item.city +
                                  "-" +
                                  item.pin_code +
                                  ", " +
                                  item.state +
                                  ", " +
                                  item.country}
                              </td>
                              <td>
                                <span
                                  style={{
                                    display: "flex",
                                    gap: "5px",
                                  }}
                                >
                                  <button
                                    onClick={() => handleEdit(item, index)}
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
                      )}
                    </tbody>
                  </table>

                  {/* renders if there is no data in the table */}
                  {formData.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "50px",
                        marginBottom: "-60px",
                      }}
                    >
                      No records to display
                    </div>
                  )}

                  {/* renders if the search query is not found */}
                  {searchQuery.length !== 0 && filteredData.length === 0 && (
                    <>
                      <div
                        style={{
                          textAlign: "center",
                          marginTop: "50px",
                          marginBottom: "-60px",
                        }}
                      >
                        Searched field does not exist
                      </div>
                    </>
                  )}

                  <div className="carousel">
                    {/* carousel is called here */}
                    <NumberCarousel />
                  </div>
                </div>
              </>
            ) : (
              // child page is called here
              <CreateAddressBook
                editValue={editData}
                onFormDataChange={handleFormDataChange}
                // editID={editData}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AddressList;
