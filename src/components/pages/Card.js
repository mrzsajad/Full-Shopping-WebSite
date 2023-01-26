import React, { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeShopBasket, updateShopBasketItem } from "../../redux/action";

const Card = ({ setbtnCheak, login }) => {
  const items = JSON.parse(localStorage.getItem("shoping"));
  const dispatch = useDispatch();
  const updatedData = useSelector((state) => state.updateShopBasket);
  const navigate = useNavigate();
  const shopData = useSelector((state) => state.getShopBasket);

  const { data, loading, error } = useSelector((state) => state.oneProduct);
  let help = 0;
  if (items) {
    items.map((item) => {
      return (help += item.price * item.qty);
    });
  }
  return (
    <div style={{ margin: "40px ", border: "1px solid black" }}>
      {items ? (
        <div>
          {items.map((item, index) => {
            return (
              <div key={item._id}>
                <div
                  style={{
                    fontSize: "33px",
                    backgroundColor: "#eeffe6",
                    borderRadius: "5%",
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
                  <p
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    name: {item.name.slice(0, 10)}
                  </p>
                  <p
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    price: {item.price} $
                  </p>
                  <p
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    quantity: {item.qty}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        dispatch(changeShopBasket("remove", item));
                        setbtnCheak(Math.random());
                      }}

                      variant="dark"
                      style={{ color: "lightgreen", width: "50px" }}
                    >
                      -
                    </Button>
                    <h1>
                      <Badge
                        bg="dark"
                        style={{ margin: "10px", color: "lightgreen" }}
                      >
                        {item.qty}
                      </Badge>
                    </h1>
                    {/* {item.qty} */}
                    <Button
                      onClick={() => {
                        shopData.map((i) => {
                          if (i._id === item._id) {
                            if (item.countInStock > i.qty) {
                              dispatch(changeShopBasket("add", item));
                              
                            }
                          }
                        });
                        setbtnCheak(Math.random());
                      }}
                      variant="dark"
                      style={{ color: "lightgreen", width: "50px" }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <div>
            <b>
              <p style={{ color: "darkgreen", fontSize: "22px" }}>
                <b>total price:</b>{" "}
                <span>
                  <b>{help}</b>
                </span>
                $
              </p>
            </b>
            {help ? (
              <Button
                variant="dark"
                style={{ color: "lightgreen", width: "100px", margin: "20px" }}
                onClick={() => {
                  items
                    ? login
                      ? navigate("/address")
                      : navigate("/login")
                    : navigate("/");
                }}
              >
                letsGo!
              </Button>
            ) : (
              <Button
                variant="dark"
                style={{ color: "lightgreen", width: "100px", margin: "20px" }}
                disabled
              >
                letsGo!
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p>Your Shoping Card Is Empy! </p>
      )}
      <div style={{ height: "50vh" }}></div>
    </div>
  );
};

export default Card;
