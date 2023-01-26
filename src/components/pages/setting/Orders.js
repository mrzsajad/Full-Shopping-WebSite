import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../../redux/action";

const Orders = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getOrders);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <div>
      <div style={{ height: "30px", marginTop: "10px" }}>
        {loading ? (
          <Spinner animation="grow" variant="loading" />
        ) : error ? (
          <p>{error}</p>
        ) : (
          ""
        )}{" "}
      </div>
      <div>
        <Container>
          <Row>
            {data?.data?.map((item) => {
             
              return (
                <Col lg={4} md={6} xs={12} sm={12} key={item._id}>
                  <Card
                    bg="dark"
                    style={{ width: "18rem", color: "lightgreen" }}
                    className="mb-2"
                  >
                    <Card.Header>
                      orderItems: {item.orderItems.length}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title
                        className="box"
                        onClick={() =>
                          navigate(`/order/${item._id.toString()}`)
                        }
                      >
                        <p className="box">Click Show Details</p>{" "}
                      </Card.Title>
                      <Card.Text>
                        paymentMethod : {item.paymentMethod}
                      </Card.Text>
                      <Card.Text>totalPrice : {item.totalPrice}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Orders;
