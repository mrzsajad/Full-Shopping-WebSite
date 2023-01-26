import React, { useEffect } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneOrder } from "../../../redux/action";
const Order = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getOrder);
  useEffect(() => {
    dispatch(getOneOrder(id));
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
            {data?.data?.orderItems?.map((item, index) => {
              
              return (
                <Col  lg={4} md={6} xs={12} sm={12} key={item._id}>
                  <Card
                    bg="dark"
                    style={{ width: "18rem", color: "lightgreen" }}
                    className="mb-2"
                  >
                    <Card.Header>item: {index + 1}</Card.Header>
                    <Card.Body>
                      <Card.Title style={{height:"150px"}}>{item.product.name}</Card.Title>
                      <Card.Text>{item.product.color} </Card.Text>
                      <Card.Text>quantity: {item.qty} </Card.Text>
                      <Card.Text>totalPrice : {item.qty*item.product.price} $ </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div style={{height:"70vh"}}></div>
    </div>
  );
};

export default Order;
