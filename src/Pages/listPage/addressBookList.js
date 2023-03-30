import React from "react";
import "./addressBookList.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CreateAddressBook from "../createPage/addressBookCreate";
import { Modal } from "antd";
import View from "../viewPage/viewContact";
import Edit from "../editPage/editPage";
import Breadcrumb from "../baseLayouts/breadCrumbs";
import NumberCarousel from "./carousel";

function AddressList() {
  const [formData, setFormData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editData, setEditData] = useState({});
  //function for search bar
  // const filteredData = items.filter(item => item.name.includes(searchQuery));

  // callback function to update the form data
  const handleFormDataChange = (data) => {
    const value = data;
    setFormData([...formData, value]);
    setIsSubmitted(true);
  };

  // function to navigate between create and list page
  const pageNav = () => {
    isSubmitted ? setIsSubmitted(false) : setIsSubmitted(true);
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

  // const [crumbs, setCrumbs] = useState(["Home", "Address Book", "Create Page"]);

  // function to view the record
  const [selectedData, viewSelectedData] = useState();
  const [viewAddress, setView] = useState(false);

  const handleViewClick = (data) => {
    viewSelectedData(data);
    setView(true);
  };

  const handleEdit = (item) => {
    // setView(!viewAddress);
    setEditData(item);
    setIsSubmitted(false);
    // console.log(editData);
  };

  // const selected = (crumb) => {
  //   console.log(crumb);
  // };

  const handleCancelNav = () => {
    setView(true);
  };

  return (
    <>
      {/* bread scrumbs */}
      <div className="nav_bar">
        <Link to="/home" className="textColor">
          Home /
        </Link>
        <Link to="/" className="textColor">
          Address Book /
        </Link>
        <Link to="/" className="textColor">
          Create
        </Link>

        {/* button to navigate between create and list page */}

        {/* <Breadcrumb crumbs={crumbs} selected={selected}> </Breadcrumb> */}
        <button
          className="button_to_navigate"
          onClick={pageNav}
          id="changePage"
          // style={{
          //   position: "absolute",
          //   marginLeft: "65%",
          // }}
        >
          {isSubmitted ? "Create Page" : "List Page"}
        </button>
      </div>
      <div className="main_page">
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      paddingLeft: "20px",
                      marginLeft: "40px",
                      marginBottom: "20px",
                      marginTop: "10px",
                      width: "30%",
                    }}
                  ></input>

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

                    {/* table to display the details */}
                    <tbody className="table_body">
                      {/* {searchQuery.length !== 0 && filteredData.length === 0 && (
                  <>
                    <tr>Searched field does not exist</tr>
                  </>
                )} */}

                      {formData.length === 0 && (
                        <div
                          style={{
                            position: "absolute",
                          }}
                        >
                          No records to display
                        </div>
                      )}
                      {searchQuery.length === 0 && (
                        <>
                          {formData.map((item, index) => (
                            <tr key={index}>
                              <td onClick={() => handleViewClick(item)}>
                                {item.first_name} {item.last_name}
                              </td>
                              <td onClick={() => handleViewClick(item)}>{item.phone_number}</td>
                              <td onClick={() => handleViewClick(item)}>{item.email}</td>
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
                                    onClick={() => handleEdit(item)}
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

                      {/* {searchQuery.length !== 0 && (
                  <>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        <td> {item.first_name}</td>

                        <td> {item.phone_number ? item.phno : "-"}</td>

                        <td> {item.email ? item.email : "-"}</td>

                        <td> {item.address_line1 ? item.address : "-"}</td>

                        <td>
                          <button
                          // onClick={handleEdit(item, index)}
                          >
                            Edit
                          </button>

                          <button onClick={handleDelete(index)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </>
                )} */}
                    </tbody>
                  </table>
                  <div className="carousel">
                    <NumberCarousel />
                  </div>
                </div>
              </>
            ) : (
              // child page is called here
              <CreateAddressBook
                editValue={editData}
                onFormDataChange={handleFormDataChange}
                cancelNav={handleCancelNav}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AddressList;
