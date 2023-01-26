import React from "react";
import { Nav, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Setting = () => {
 
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
       
        alignItems: "center",
        height: "88vh",
      }}
    >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            marginLeft: "20px",

            height: "88vh",
            backgroundColor: "#6c706d",
            justifyContent: "space-evenly",
          }}
        >
          <Nav
            className="flex-column"
            bg="dark"
            style={{ height: "100%", alignItems: "center" }}
          >
            <Nav.Link
              style={{ color: "lightgreen", marginTop: "20px" }}
              onClick={() => {
                navigate("changeprofile");
              }}
            >
              Change Profile
            </Nav.Link>
            <Nav.Link
              style={{ color: "lightgreen" }}
              onClick={() => {
                navigate("changepassword");
              }}
            >
              Change Password
            </Nav.Link>
            <Nav.Link
              style={{ color: "lightgreen" }}
              onClick={() => {
                navigate("uploadavatar");
              }}
            >
              Upload Avatar
            </Nav.Link>
          </Nav>
        </div>
      <Outlet />
    </div>
  );
};

export default Setting;
