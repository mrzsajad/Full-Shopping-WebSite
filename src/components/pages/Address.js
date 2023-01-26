import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShippingAddress } from "../../redux/action";

export const Address = (setAddressCheck) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    city: "",
    address: "",
    postalCode: "",
    phoneNumber: "",
  });
  const { data, loading, error } = useSelector(
    (state) => state.shippingAddress
  );
  const dispatch = useDispatch();

  const items = localStorage.getItem("shoping");
  const postalCodeRegex = /^[0-9]{10}$/.test(address.postalCode)
  const mobileRegex = /^09\d{9}$/.test(address.phoneNumber)
  const addressRegex = /^[a-zA-z0-9/\\''(),-\s]{11,100}$/.test(address.address)
  const cityRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(address.city)
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  
  if(!userLocalStorage){
    navigate("*")
  } 
  if (data.status===200){
    setAddressCheck(true)
  }
}, [data])


  return (
    <div>
      {
      
      loading ? (
        <Spinner animation="grow" variant="loading" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            width: "100%",
          }}
        >
          {items ? (
            <Card style={{ width: "100%", marginTop: "20px", width: "40%" }}>
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                  width: "100%",
                }}
              >
                <input
                  type={"text"}
                  placeholder={"City"}
                  style={{ width: "80%", margin: "20px",color: cityRegex ? "green" : "black" }}
                  onChange={(e) =>
                    setAddress((last) => {
                      const help = { ...last };
                      help.city = e.target.value;
                      return { ...help };
                    })
                  }
                />
                <input
                  type={"text"}
                  placeholder={"Address"}
                  style={{ width: "80%", margin: "20px",color: addressRegex ? "green" : "black" }}
                  onChange={(e) =>
                    setAddress((last) => {
                      const help = { ...last };
                      help.address = e.target.value;
                      return { ...help };
                    })
                  }
                />
                <input
                  type={"text"}
                  placeholder={"10 digit Postal Code"}
                  style={{ width: "80%", margin: "20px" ,color: postalCodeRegex ? "green" : "black"}}
                  onChange={(e) =>
                    setAddress((last) => {
                      const help = { ...last };
                      help.postalCode = e.target.value;
                      return { ...help };
                    })
                  }
                />
                <input
                  type={"text"}
                  placeholder={"09121112233"}
                  style={{ width: "80%", margin: "20px" ,color: mobileRegex ? "green" : "black"}}
                  onChange={(e) =>
                    setAddress((last) => {
                      const help = { ...last };
                      help.phoneNumber = e.target.value;
                      return { ...help };
                    })
                    
                  }
                />
                <Button
                  variant="dark"
                  style={{ color: "lightgreen" }}
                  onClick={() => {
                    if (
                      cityRegex &&
                      addressRegex &&
                      mobileRegex &&
                      postalCodeRegex
                    ) {
                      dispatch(getShippingAddress(address));
                      navigate("/checkout");
                      
                    }
                  }}
                >
                  Next
                </Button>
              </Card.Body>
            </Card>
          ) : (
            navigate("/")
          )}
        </div>
      )}
      <div style={{height:"70vh"}}></div>
    </div>
  );
};
