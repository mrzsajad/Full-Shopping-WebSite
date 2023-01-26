import React, { useEffect, useState } from "react";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CiRead } from "react-icons/ci";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { signUpClear, signUpUser } from "../../redux/action";

export const SignUp = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.signUp);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [email, setemail] = useState({
    value: "",
    error: "invalid email",
    isTouched: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: "invalid pass",
    isTouched: false,
  });
  const [confirmPassword, setconfirmPassword] = useState({
    value: "",
    error: "invalid pass",
    isTouched: false,
  });
  const [passwordType, setPasswordType] = useState("password");
  const [mobile, setmobile] = useState(0);
  const [user, setUser] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userPhoneNumber: 0,
  });

  const [passCheak, setpassCheak] = useState("false");
  const passRegexCheak =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password.value
    );
  const emailRegexCheak = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value);
  const mobileRegex = /^09\d{9}$/.test(mobile);
  const userNameRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(text);


  useEffect(() => {
    if (data.status === 201) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      dispatch(signUpClear());
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
      dispatch(signUpClear());
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        width: "100%",
        marginTop: "30px",
      }}
    >
      {loading ? (
        <Spinner animation="grow" variant="loading" />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <ListGroup style={{ width: "22rem" }}>
          <ListGroup.Item style={{ width: "100%" }}>
            <input
              placeholder="userName"
              type={"text"}
              style={{
                width: "300px",
                margin: "10px",
                color: userNameRegex ? "lightgreen" : "red",
              }}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "100%" }}>
            <input
              placeholder="example@email.com"
              type={"text"}
              style={{
                width: "300px",
                margin: "10px",
                color: emailRegexCheak ? "lightgreen" : "red",
              }}
              onChange={(e) =>
                setemail((last) => {
                  const help = { ...last };
                  help.value = e.target.value;
                  return { ...help };
                })
              }
              onBlur={() =>
                setemail((last) => {
                  const help = { ...last };
                  help.isTouched = true;
                  return { ...help };
                })
              }
            />
            {!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value) &&
              email.isTouched && <span>{email.error}</span>}
          </ListGroup.Item>
          <ListGroup.Item style={{ width: "100%" }}>
            <input
              placeholder="password"
              type={passwordType}
              style={{ width: "300px", margin: "10px" }}
              onChange={(e) =>
                setPassword((last) => {
                  const help = { ...last };
                  help.value = e.target.value;
                  return { ...help };
                })
              }
              onBlur={() =>
                setPassword((last) => {
                  const help = { ...last };
                  help.isTouched = true;
                  return { ...help };
                })
              }
            />
            <span
              onClick={() => {
                if (passwordType === "password") {
                  setPasswordType("text");
                  return;
                }
                setPasswordType("password");
              }}
            >
              <CiRead
                style={{
                  width: "25px",
                  height: "20px",
                  color: "green",
                  position: "absolute",
                  zIndex: "1",
                  marginTop: "15px",
                }}
              />
            </span>
            {!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
              password.value
            ) &&
              password.isTouched && <span>{password.error}</span>}
          </ListGroup.Item>
          <ListGroup.Item>
            <input
              placeholder="confirm password"
              type={passwordType}
              style={{ width: "300px", margin: "10px" }}
              onChange={(e) =>
                setconfirmPassword((last) => {
                  const help = { ...last };
                  help.value = e.target.value;
                  return { ...help };
                })
              }
              onBlur={() =>
                setconfirmPassword((last) => {
                  const help = { ...last };
                  help.isTouched = true;
                  return { ...help };
                })
              }
            />

            {!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
              confirmPassword.value
            ) &&
              password.isTouched && <span>{confirmPassword.error}</span>}
          </ListGroup.Item>
          <ListGroup.Item>
            <input
              placeholder="mobile"
              type={"tel"}
              style={{
                width: "300px",
                margin: "10px",
                color: mobileRegex ? "lightgreen" : "red",
              }}
              onChange={(e) => setmobile(e.target.value)}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              onClick={() => {
                if (
                  confirmPassword.value === password.value &&
                  password.isTouched &&
                  passRegexCheak &&
                  emailRegexCheak &&
                  userNameRegex &&
                  emailRegexCheak &&
                  mobileRegex
                ) {
                  setpassCheak(true);
                  dispatch(
                    signUpUser(text, email.value, password.value, mobile)
                  );
                } else if (
                  confirmPassword.value !== password.value ||
                  !userNameRegex ||
                  !passRegexCheak ||
                  !emailRegexCheak ||
                  !email ||
                  !mobileRegex
                ) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                  });
                }
              }}
              variant="dark"
              style={{ color: "lightgreen", width: "100px" }}
            >
              Sign Up
            </Button>
            <span style={{ display: "block", paddingTop: "5px" }}>
              {confirmPassword.value !== password.value ? (
                <span style={{ paddingTop: "5px" }}>
                  confimPassword should be like Password
                </span>
              ) : (
                ""
              )}
            </span>
          </ListGroup.Item>
        </ListGroup>
      )}
      <div style={{height:"70vh"}}></div>
    </div>
  );
};
