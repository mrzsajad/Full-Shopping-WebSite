import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getData, getOneProduct, getProfileData } from "../../redux/action";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getData(), getOneProduct(),);
   
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner animation="grow" variant="loading" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Container>
          <Row>
            {data.map((item) => {
              return (
                <Col lg={4}  md={6} xs={12}   sm={12} key={item._id}>
                  <Card
                  bg="dark"
                    style={{ width: "100%",width: "18rem", color: "lightgreen" }}
                    className="mt-5 product1"
                    key={item._id}
                    onClick={() => navigate(`/product/${item._id.toString()}`)}
                    
                  >
                   
                      <Card.Img
                        variant="top"
                        src={item.image}
                        style={{ width: "95%", height: "200px" ,margin:"4px",marginTop:"18px" }}
                      />
                    

                    <Card.Body>
                      <Card.Body>
                        <Card.Title style={{height:"150px"}}>{item.name} </Card.Title>
                        <Card.Text style={{ fontSize: "20px" }}>
                         count: {item.countInStock ? item.countInStock : "not enough"}
                        </Card.Text>
                      </Card.Body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Card.Text>
                          <b>{item.price}</b> $
                        </Card.Text>
                        <Card.Text>{item.rating} /5</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                  
                </Col>
              );
            })}
          </Row>
          <div style={{height:"200px"}}></div>
        </Container>
      )}
    </div>
  );
};

export default Home;
