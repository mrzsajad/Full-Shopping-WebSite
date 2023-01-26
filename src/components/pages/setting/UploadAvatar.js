import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearAvatar, uploadAvatarPic } from "../../../redux/action";

const UploadAvatar = () => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const { data, loading, error } = useSelector((state) => state.uploadAvatar);

  useEffect(() => {
    if (data.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(clearAvatar());
    }
    if (error) {
      Swal.fire({
        icon: "error",
        text: error,
      });
      dispatch(clearAvatar());
    }
  }, [data]);

  return (
    <div style={{ width: "70%", height: "88vh" }}>
      <div style={{ height: "30px", marginTop: "10px" }}>
        {loading ? <Spinner animation="grow" variant="loading" /> : ""}{" "}
      </div>
      <div
        style={{
          width: "80%",
          marginLeft: "30px",
          marginTop: "30px",
        }}
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className="mb-3">
            <Form.Label>select your picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </Form.Group>

          <Button
            variant="dark"
            style={{ color: "lightgreen" }}
            type="submit"
            className="mt-3"
            onClick={() => dispatch(uploadAvatarPic(avatar))}
          >
            UploadAvatar
          </Button>
        </Form>
        <p style={{ color: "lightgreen", marginTop: "5px" }}>
          <b>
            {data?.data?.message}
            <span style={{ color: "red", marginTop: "5px" }}>{error}</span>
          </b>
        </p>
      </div>
    </div>
  );
};

export default UploadAvatar;
