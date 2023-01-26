import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changeProfileDetail, clearChangeProfile } from "../../../redux/action";

const ChangeProfile = () => {
  const [identity, setIdentity] = useState({
    name: "",
    lastName: "",
    age: "",
    city: "",
    gender: "",
  });
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.changeProfile);
  const nameRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(identity.name);
  const lastNameRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(
    identity.lastName
  );
  const cityRegex = /^[a-zA-z0-9/\\''(),-\s]{1,50}$/.test(identity.city);

  useEffect(() => {
    if (data.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        showConfirmButton: false,
        timer: 3500,
      });
      dispatch(clearChangeProfile());

      setIdentity((last) => {
        const help = { ...last };
        help.name = "";
        help.lastName = "";
        help.age = "";
        help.gender = "";
        help.city = "";
        return { ...help };
      });
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data?.statusText,
      });
      dispatch(clearChangeProfile());
    } else {
      setText("please enter all fields");
    }
  }, [data]);

  return (
    <div style={{ width: "70%", height: "88vh" }}>
      <div
        style={{
          width: "80%",
          marginLeft: "30px",
          marginTop: "30px",
        }}
      >
        <div style={{ height: "30px" }}>
          {loading ? (
            <Spinner animation="grow" variant="loading" />
          ) : error ? (
            <p>{error}</p>
          ) : (
            ""
          )}
        </div>
        <Form onSubmit={(e) => e.preventDefault()} style={{ size: "20px" }}>
          <Form.Group className="mb-3">
            <Form.Label>enter your identity</Form.Label>
            <Form.Control
              style={{ color: nameRegex ? "lightgreen" : "red" }}
              type="text"
              placeholder="first name"
              onChange={(e) => {
                setIdentity((last) => {
                  const help = { ...last };
                  help.name = e.target.value;
                  return { ...help };
                });
              }}
              value={identity.name}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              style={{ color: lastNameRegex ? "lightgreen" : "red" }}
              type="text"
              placeholder="last name"
              onChange={(e) => {
                setIdentity((last) => {
                  const help = { ...last };
                  help.lastName = e.target.value;
                  return { ...help };
                });
              }}
              value={identity.lastName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              style={{ color: identity.age > 0 ? "lightgreen" : "red" }}
              type="number"
              placeholder="age"
              onChange={(e) => {
                setIdentity((last) => {
                  const help = { ...last };
                  help.age = e.target.value;
                  return { ...help };
                });
              }}
              value={identity.age}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              style={{ color: cityRegex ? "lightgreen" : "red" }}
              type="text"
              placeholder="city"
              onChange={(e) => {
                setIdentity((last) => {
                  const help = { ...last };
                  help.city = e.target.value;
                  return { ...help };
                });
              }}
              value={identity.city}
            />
          </Form.Group>

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setIdentity((last) => {
                const help = { ...last };
                help.gender = e.target.value;
                return { ...help };
              });
            }}
            value={identity.gender}
          >
            <option hidden>select your gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </Form.Select>

          <Button
            variant={
              nameRegex &&
              lastNameRegex &&
              identity.age > 1 &&
              cityRegex &&
              identity.gender
                ? "success"
                : "dark"
            }
            

            style={{ color: "lightgreen", width: "100px" }}
            className="mt-3"
            onClick={() => {
              if (
                nameRegex &&
                lastNameRegex &&
                identity.age > 1 &&
                cityRegex &&
                identity.gender
              ) {
                dispatch(changeProfileDetail(identity));
              }
            }}
          >
            Submit
          </Button>
          <p>{text}</p>
        </Form>
      </div>
    </div>
  );
};

export default ChangeProfile;
