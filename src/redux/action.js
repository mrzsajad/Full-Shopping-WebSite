import axios from "axios";

import { loading, success, failed } from "../Constants";

export const getData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: loading,
      payload: { data: [], loading: true, error: "" },
    });
    const { data } = await axios.get("http://kzico.runflare.run/product/");

    dispatch({
      type: success,
      payload: { data: [...data], loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: failed,
      payload: { data: [], loading: false, error: error.message },
    });
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const getOneProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "loading1",
      payload: { data: {}, loading: true, error: "" },
    });
    const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);

    dispatch({
      type: "success1",
      payload: { data: { ...data }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "failed1",
      payload: { data: {}, loading: false, error: error.message },
    });
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const changeShopBasket = (type, data) => (dispatch, getState) => {
  const basket = getState().getShopBasket;

  const help = JSON.parse(JSON.stringify(data));
  help.qty = 1;
  let dataWithQty = [...basket, help];

  if (type === "submit") {
    if (basket.length === 0) {
      localStorage.setItem("shoping", JSON.stringify(dataWithQty));
      dispatch({
        type: type,
        payload: dataWithQty,
      });
    } else {
      basket.push(dataWithQty);
      localStorage.setItem("shoping", JSON.stringify(dataWithQty));
      dispatch({
        type: type,
        payload: dataWithQty,
      });
    }
  } else if (type === "add") {
    basket.map((item, index) => {
      if (item._id === data._id) {
        basket[index].qty = basket[index].qty + 1;
        localStorage.setItem("shoping", JSON.stringify(basket));
        dispatch({
          type: type,
          payload: basket,
        });
      }
    });
  } else if (type === "remove") {
    basket.map((item, index) => {
      if (item._id === data._id) {
        basket[index].qty = basket[index].qty - 1;
      }
      if (basket[index].qty === 0) {
        basket.splice(index, 1);
      }
      localStorage.setItem("shoping", JSON.stringify(basket));
      dispatch({
        type: type,
        payload: basket,
      });
    });
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const signUpUser =
  (text, email, password1, mobile1) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "signUpLoading",
        payload: { data: [], loading: true, error: "" },
      });
      const data = await axios.post("http://kzico.runflare.run/user/signup", {
        username: text,
        email: email,
        password: password1,
        mobile: mobile1,
      });

      dispatch({
        type: "SignUpSuccess",
        payload: { data: data, loading: false, error: "" },
      });
    } catch (error) {
      dispatch({
        type: "signUpFailed",
        payload: { data: [], loading: false, error: error.message },
      });
    }
  };
export const signUpClear = () => (dispatch, getState) => {
  dispatch({
    type: "refreshSignUp",
    payload: { data: [], loading: false, error: "" },
  });
};
//-----------*******-------*******-----------*******--------*******-------

export const signInUser =
  (userName, Password1) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "loadingUser",
        payload: { data: [], loading: true, error: "" },
      });

      const { data } = await axios.post(
        "http://kzico.runflare.run/user/login",
        {
          email: userName,
          password: Password1,
        }
      );

      dispatch({
        type: "loginUser",
        payload: { data: data, loading: false, error: "" },
      });

      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      dispatch({
        type: "failedLogin",
        payload: { data: [], loading: false, error: error.message },
      });
    }
  };

//-----------*******-------*******-----------*******--------*******-------

export const getShippingAddress = (data) => (dispatch, getState) => {
  try {
    dispatch({
      type: "addressLoading",
      payload: { data: {}, loading: true, error: "" },
    });
    localStorage.setItem("address", JSON.stringify(data));
    dispatch({
      type: "submitAddress",
      payload: { data: { data }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "addressError",
      payload: { data: [], loading: false, error: error.message },
    });
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const checkOut = () => async (dispatch, getState) => {
  const finalItems = JSON.parse(localStorage.getItem("shoping"));
  const user = JSON.parse(localStorage.getItem("user"));
  const localAddress = JSON.parse(localStorage.getItem("address"));

  let totalPrice1 = 0;

  let x = [];
  finalItems.map((item, index) => {
    const help = { ...item };
    x[index] = { product: help._id, qty: help.qty };
    totalPrice1 += item.qty * item.price;
  });

  try {
    dispatch({
      type: "finalLoading",
      payload: { data: {}, loading: true, error: "" },
    });

    const data = await axios.post(
      "http://kzico.runflare.run/order/submit",
      {
        orderItems: x,
        shippingAddress: {
          address: localAddress.address,
          city: localAddress.city,
          postalCode: localAddress.postalCode,
          phone: localAddress.phoneNumber,
        },
        paymentMethod: "cash",
        shippingPrice: "5",
        totalPrice: totalPrice1,
      },
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch({
      type: "finalSubmit",
      payload: { data: { ...data }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "finalErorr",
      payload: { data: {}, loading: false, error: error.message },
    });
  }
};

export const clearcheckout = () => (dispatch, getState) => {
  dispatch({
    type: "finalClear",
    payload: { data: {}, loading: false, error: "" },
  });
};

//-----------*******-------*******-----------*******--------*******-------

export const changeProfileDetail =
  (profileData) => async (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      dispatch({
        type: "changedLoading",
        payload: { data: {}, loading: true, error: "" },
      });

      const result = await axios.put(
        "http://kzico.runflare.run/user/change-profile",
        {
          firstname: profileData.name,
          lastname: profileData.lastName,
          gender: profileData.gender,
          age: profileData.age,
          city: profileData.city,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "changedSuccesfull",
        payload: { data: { ...result }, loading: false, error: "" },
      });
    } catch (error) {
      dispatch({
        type: "changedError",
        payload: { data: {}, loading: false, error: error.message },
      });
    }
  };



export const clearChangeProfile = () => (dispatch, getState) => {
  dispatch({
    type: "clearProfile",
    payload: { data: {}, loading: false, error: "" },
  });
};
//-----------*******-------*******-----------*******--------*******-------

export const ChangeOldPassword =
  (oldPass, newPass) => async (dispatch, getState) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      dispatch({
        type: "passLoading",
        payload: { data: {}, loading: true, error: "" },
      });
      const passResult = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: oldPass,
          new_password: newPass,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({
        type: "passSuccesfull",
        payload: { data: { ...passResult }, loading: false, error: "" },
      });
    } catch (error) {
      dispatch({
        type: "passError",
        payload: {
          data: {},
          loading: false,
          error: error?.response?.data?.message
            ? error.response.data.message
            : error.message,
        },
      });
    }
  };

export const clearPassword = () => (dispatch, getState) => {
  dispatch({
    type: "clearPassword",
    payload: { data: {}, loading: false, error: "" },
  });
};

//-----------*******-------*******-----------*******--------*******-------

export const uploadAvatarPic = (avatar) => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const formData = new FormData();
    formData.append("profile-image", avatar);
    dispatch({
      type: "avatarLoading",
      payload: { data: {}, loading: true, error: "" },
    });
    const avatarResult = await axios.post(
      "http://kzico.runflare.run/user/profile-image",
      formData,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch({
      type: "avatarSuccesfull",
      payload: { data: { ...avatarResult }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "avatarSuccesfull",
      payload: { data: {}, loading: false, error: error.message },
    });
  }
};

export const clearAvatar = () => (dispatch, getState) => {
  dispatch({
    type: "clearAvatarr",
    payload: { data: {}, loading: false, error: "" },
  });
};

//-----------*******-------*******-----------*******--------*******-------

export const getProfileData = () => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    dispatch({
      type: "profileLoading",
      payload: { data: {}, loading: true, error: "" },
    });
    const profileResult = await axios.get(
      "http://kzico.runflare.run/user/profile",
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch({
      type: "profileSuccesfull",
      payload: { data: { ...profileResult }, loading: false, error: "" },
    });
  } catch (error) {
    if (error?.response?.data?.message === "invalid token") {
      localStorage.removeItem("user");
      dispatch({
        type: "profileError",
        payload: { data: {}, loading: false, error: error.message },
      });
    } else {
      dispatch({
        type: "profileError",
        payload: { data: {}, loading: false, error: error.message },
      });
    }
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const getAllOrders = () => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    dispatch({
      type: "ordersLoading",
      payload: { data: [], loading: true, error: "" },
    });

    const allOrdersResult = await axios.get(
      "http://kzico.runflare.run/order/",
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch({
      type: "ordersSuccess",
      payload: { data: { ...allOrdersResult }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "ordersFailed",
      payload: { data: [], loading: false, error: error.message },
    });
  }
};

//-----------*******-------*******-----------*******--------*******-------

export const getOneOrder = (id) => async (dispatch, getState) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    dispatch({
      type: "orderLoading",
      payload: { data: {}, loading: true, error: "" },
    });

    const oneOrdersResult = await axios.get(
      `http://kzico.runflare.run/order/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch({
      type: "orderSuccess",
      payload: { data: { ...oneOrdersResult }, loading: false, error: "" },
    });
  } catch (error) {
    dispatch({
      type: "orderFailed",
      payload: { data: {}, loading: false, error: error.message },
    });
  }
};
