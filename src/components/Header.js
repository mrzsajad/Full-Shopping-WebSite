import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { BsCartDash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";


function Header({ login, setLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = JSON.parse(localStorage.getItem("shoping"));
  const users = JSON.parse(localStorage.getItem("user"));

  let help = 0;
  if (items) {
    items.map((item) => {
      return (help += item.qty);
    });
  }
  useEffect(() => {

  }, [login])

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ color: "darkgreen" }}
    >
      <Container>
        <Navbar.Brand >
          <Nav.Link style={{ color: "lightgreen" }} onClick={() => navigate("/")}>Home</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Nav.Link onClick={() => navigate("/card")}>
              <BsCartDash
                style={{ width: "40px", height: "40px", color: "lightgreen" }}
              />

              <span style={{ color: "lightgreen", fontSize: "19px" }}>
                {!help ? "" : help}
              </span>
            </Nav.Link>

            {users?.email ? (
              <DropdownButton
                id="dropdown-basic-button"
                title={users?.email}
                variant="dark"
                color="lightgreen"
              
              >
                <Dropdown.Item
                  variant="dark"
                  style={{ color: "lightgreen", fontSize: "20px" }}
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  profile
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "lightgreen", fontSize: "20px" }}
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  orders
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ color: "lightgreen", fontSize: "20px" }}
                  onClick={() => {
                    navigate("/setting");
                  }}
                >
                  setting
                </Dropdown.Item>
                <Dropdown.Item
                  
                  style={{ color: "lightgreen", fontSize: "20px" }}
                  onClick={() => {
                    navigate("/")
                    setLogin(false);
                    localStorage.removeItem("user");
                    
                  }}
                >
                  log out
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Nav.Link
                onClick={() => navigate("/login")}
                style={{ fontSize: "20px", color: "lightgreen" }}
              >
                Login
              </Nav.Link>
              )}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
