import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  ListGroup,
  Spinner,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeShopBasket, getOneProduct } from "../../redux/action";

const Product = ({ setbtnCheak }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.oneProduct);
  const [cheak, setcheak] = useState(0);
  const shopData = useSelector((state) => state.getShopBasket);
  const [num, setNum] = useState(false);

  useEffect(() => {
    dispatch(getOneProduct(id));
    shopData.map((item) => {
      if (item._id === id) {
        setNum(true);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner animation="grow" variant="danger" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Container className="mt-3">
          <Card bg="dark" style={{ width: "24rem", color: "lightgreen" }}>
            <Card.Body bg="dark" style={{ color: "lightgreen" }}>
              <Card.Img
                variant="top"
                src={data.image}
                style={{
                  width: "100%",
                  height: "300px",
                  boxSizing: "border-box",
                }}
              />
            </Card.Body>
            <Card.Body bg="dark" style={{ color: "lightgreen" }}>
              <Card.Title>
                {data.brand} | {data.category}
              </Card.Title>
              <Card.Text>
                <b>{data.name}</b>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item
                  bg="dark"
                  style={{
                    background: "#2334",
                    color: "lightgreen",
                    fontSize: "1.2em",
                  }}
                >
                  <Card.Text bg="dark" style={{ color: "lightgreen" }}>
                    Color: {data.color}
                  </Card.Text>
                  <Card.Text bg="dark" style={{ color: "lightgreen" }}>
                    Price: {data.price}
                  </Card.Text>
                  <Card.Text bg="dark" style={{ color: "lightgreen" }}>
                    rating: {data.rating}
                  </Card.Text>
                  <Card.Text bg="dark" style={{ color: "lightgreen" }}>
                    numReviews: {data.numReviews}
                  </Card.Text>
                  <Card.Text bg="dark" style={{ color: "lightgreen" }}>
                    countInStock: {data.countInStock}
                  </Card.Text>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Body>
              {data.countInStock ? (
                <div>
                  <div>
                    {num ? (
                      <Button
                        variant="success"
                        style={{ color: "lightgreen", width: "10%" }}
                        onClick={() => {
                          if (num) {
                            dispatch(changeShopBasket("remove", data));
                            setbtnCheak(Math.random());
                          }
                        }}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        style={{ color: "lightgreen", width: "10%" }}
                      >
                        -
                      </Button>
                    )}

                    <Button
                      variant="success"
                      style={{
                        width: "50%",
                        margin: "10px",
                        color: "lightgreen",
                      }}
                    >
                      count:
                      {shopData.map((item) => {
                        if (item._id === id) {
                          return item.qty;
                        }
                      })}
                    </Button>

                    <Button
                      variant="success"
                      style={{ color: "lightgreen", width: "10%" }}
                      onClick={() => {
                        if (!num) {
                          dispatch(changeShopBasket("submit", data));
                          setNum(true);
                          setbtnCheak(Math.random());
                        } else {
                          shopData.map((item) => {
                            if (item._id === id) {
                              if (data.countInStock > item.qty) {
                                dispatch(changeShopBasket("add", data));
                                
                              }
                            }
                          });
                          setbtnCheak(Math.random());
                          setcheak(() => cheak + 1);
                        }
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ) : (
                <Button disabled>Add to Cart</Button>
              )}
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default Product;
