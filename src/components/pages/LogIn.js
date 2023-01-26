import React, { useEffect, useRef, useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signInUser } from "../../redux/action";

export const LogIn = ({ setLogin, login }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({ userName: "", password: "" });
  const { data, loading, error } = useSelector((state) => state.signIn);
  const userLocalStorage = JSON.parse(localStorage.getItem("user"));

 
  // const sajad = useRef()
  // console.log(sajad?.current?.value)
  useEffect(() => {
    if (loading) {
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    } else if (data) {
      if (userLocalStorage) {
        navigate("/");
        setLogin(true);
      }
    }
  }, [data]);

  const emailRegexCheak = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
    userInfo.userName
  );
  const userNameRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(
    userInfo.userName
  );
  const passRegexCheak =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      userInfo.password
    );

  return (
    <div 
      style={{
        boxSizing:"border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        width: "100%",
        marginTop: "30px",
      }}
    >
      { loading ? (
        <Spinner animation="grow" variant="loading" />
      ) : (
        <ListGroup style={{ width: "22rem" }}>
          <ListGroup.Item style={{ width: "100%" }}>
            <input
              placeholder="email/userName"
              type={"text"}
              style={{ width: "300px", margin: "10px" }}
              onChange={(e) =>
                setUserInfo((last) => {
                  const help = { ...last };
                  help.userName = e.target.value;
                  return help;
                })
              }
            />
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "100%" }}>
            <input
              // ref={sajad}
              placeholder="password"
              type={"password"}
              style={{ width: "300px", margin: "10px" }}
              onChange={(e) =>
                setUserInfo((last) => {
                  const help = { ...last };
                  help.password = e.target.value;
                  return help;
                })
              }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="dark"
              style={{ color: "lightgreen", width: "100px" }}
              onClick={() => {
                if (userNameRegex || (emailRegexCheak && passRegexCheak)) {
                  dispatch(signInUser(userInfo.userName, userInfo.password));
                }
              }}
            >
              Login
            </Button>

            <span style={{ display: "block" }}>{error}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              onClick={() => navigate("/signUp")}
              variant="dark"
              style={{ color: "lightgreen", width: "100px" }}
            >
              Sign Up
            </Button>
          </ListGroup.Item>
        </ListGroup>

      )}
      <div style={{height:"70vh"}}></div>
    </div>
  );
};
