import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Last } from "react-bootstrap/esm/PageItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkOut, clearcheckout } from "../../redux/action";

export const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = JSON.parse(localStorage.getItem("shoping"));
  const { data, loading, error } = useSelector((state) => state.FinalCheckOut);
  let help = 0;
  
  const totalPrice = () => {
    {
      items?.map((item) => {
        const itemValue = item.price * item.qty;
        help = help + itemValue;
        return help;
      });
    }
  };
  totalPrice();
;

  useEffect(() => {

    if (data.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(clearcheckout())
      navigate("/");
      localStorage.removeItem("shoping");
      localStorage.removeItem("address");
    }
    if (error) {
      Swal.fire({
        icon: "error",
        text: error,
      });
      dispatch(clearcheckout())
    }
  }, [data]);

  return (
    <div style={{ margin: "40px ", border: "1px solid black" }}>
      {!items ? (  <div style={{color:"lightgreen",fontSize:"20px",paddingTop:"120px"}}>
      <a  className="btn-go-home" onClick={()=>navigate("/")} style={{color:"black",fontSize:"20px",paddingTop:"20px"}}>
            GO BACK HOME
          </a></div>) :  loading ? (
        <Spinner animation="grow" variant="loading" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <div style={{ margin: "40px ", border: "1px solid black" }}>
            {items?.map((item) => {
              return (
                <div key={item._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      margin: "40px ",
                      border: "1px solid black",
                      height: "200px",
                    }}
                  >
                    <img
                      src={item.image}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <p>price: {item.price} $</p>
                    <p>quantity: {item.qty}</p>
                  </div>
                </div>
              );
             
            })}
            <p>
              totalPrice:
              <span style={{ color: "lightgreen", fontSize: "30px" }}>
                {" "}
                {help} $
              </span>{" "}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <Button
              variant="dark"
              style={{ color: "lightgreen", width: "100px" }}
              onClick={() => navigate("/card")}
            >
              edit
            </Button>
            <Button
              variant="dark"
              style={{ color: "lightgreen", width: "100px" }}
              onClick={() => {
                dispatch(checkOut());
              }}
            >
              ok
            </Button>
          </div>
        </div>
      )}
      <div style={{ height: "200px" }}></div>
    </div>
  );
};
