import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ChangeOldPassword, clearPassword } from "../../../redux/action";

const ChangePassword = () => {
  const [password, setPassword] = useState({
    value: "",
    error: "invalid pass",
    isTouched: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    error: "invalid pass",
    isTouched: false,
  });
  const passRegexCheak =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      newPassword.value
    );
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.ChangePassword);
  useEffect(() => {
    if (data.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(clearPassword())
    }
    if (error) {
      Swal.fire({
        icon: "error",
        text: error,
      });
      dispatch(clearPassword())
    }
  }, [data]);
  return (
    <div style={{ width: "70%", height: "88vh" }}>
      <div style={{ height: "30px", marginTop: "10px" }}>
        {loading ? <Spinner animation="grow" variant="loading" /> : ""}
      </div>
      <div
        style={{
          width: "80%",
          marginLeft: "30px",
          marginTop: "30px",
        }}
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>change your password</Form.Label>
            <Form.Control
              type="password"
              placeholder="old password"
              onChange={(e) => {
                setPassword((last) => {
                  const help = { ...last };
                  help.value = e.target.value;
                  return { ...help };
                });
              }}
              onBlur={() =>
                setPassword((last) => {
                  const help = { ...last };
                  help.isTouched = true;
                  return { ...help };
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="new password"
              onChange={(e) => {
                setNewPassword((last) => {
                  const help = { ...last };
                  help.value = e.target.value;
                  return { ...help };
                });
              }}
              onBlur={() =>
                setNewPassword((last) => {
                  const help = { ...last };
                  help.isTouched = true;
                  return { ...help };
                })
              }
            />
          </Form.Group>
          {!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            newPassword.value
          ) &&
            newPassword.isTouched && <p>{password.error}</p>}

          <Button
             variant="dark"
             style={{ color: "lightgreen", width: "100px" }}
            type="submit"
            className="mt-3"
            onClick={() => {
              if (
                password.value &&
                newPassword.value &&
                newPassword.isTouched &&
                password.isTouched &&
                passRegexCheak
              ) {
                dispatch(ChangeOldPassword(password.value, newPassword.value));
              }
            }}
          >
            Submit
          </Button>
          <p style={{ color: "lightgreen", marginTop: "5px" }}>
            <b>
              {data?.data?.message}
              <span style={{ color: "red", marginTop: "5px" }}>{error}</span>
            </b>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
