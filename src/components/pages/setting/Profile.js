import React, { useEffect } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "../../../redux/action";

const Profile = () => {
  const { data, loading, error } = useSelector((state) => state.getProfile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  return (
    <div >
      <div style={{ height: "30px", marginTop: "10px" }}>
        {loading ? (
          <Spinner animation="grow" variant="loading" />
        ) : error ? (
          <p>{error}</p>
        ) : (
          ""
        )}{" "}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          
        }}
      >
        
        <Card style={{ width: "30rem",backgroundColor:"#adaa",color: "lightgreen" }} bg="dark">
          <Card.Body>
            <Card.Img
              variant="top"
              src={data?.data?.user?.image}
              style={{ width: "170px", height: "170px", borderRadius: "50%" }}
            />
          </Card.Body>
          <Card.Body style={{display:"block" ,textAlign:"left" }}>
            <Card.Title><span>email:</span>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.email} </Card.Title>
            <Card.Title><span>username:</span> &nbsp;&nbsp;&nbsp;{data?.data?.user?.username} </Card.Title>
            <Card.Title><span>mobile:</span>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.mobile} </Card.Title>
            <Card.Title><span>firstname:</span>&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.firstname} </Card.Title>
            <Card.Title><span>lastname</span>: &nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.lastname} </Card.Title>
            <Card.Title><span>gender:</span>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.gender} </Card.Title>
            <Card.Title><span>age:</span>     &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.age} </Card.Title>
            <Card.Title><span>city:</span>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data?.data?.user?.city} </Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div style={{height:"200px"}}></div>
    </div>
  );
};

export default Profile;
