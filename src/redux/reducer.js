import { loading, success, failed } from "../Constants";
export const products = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case loading:
      return payload;
    case success:
      return payload;
    case failed:
      return payload;

    default:
      return state;
  }
};

export const oneProduct = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "loading1":
      return payload;
    case "success1":
      return payload;
    case "failed1":
      return payload;

    default:
      return state;
  }
};

export const getShopBasket = (state = [], { type, payload }) => {
  switch (type) {
    case "add":
      return payload;
    case "remove":
      return payload;
    case "submit":
      return payload;
    default:
      return state;
  }
};

export const updateShopBasket = (state = [], { type, payload }) => {
  switch (type) {
    case "add":
      return payload;
    case "remove":
      return payload;
    default:
      return state;
  }
};

export const signUp = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "signUpLoading":
      return payload;
    case "SignUpSuccess":
      return payload;
    case "signUpFailed":
      return payload;
    case "refreshSignUp":
      return payload;
    default:
      return state;
  }
};

export const signIn = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "loadingUser":
      return payload;
    case "loginUser":
      return payload;
    case "failedLogin":
      return payload;
    default:
      return state;
  }
};

export const shippingAddress = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "addressLoading":
      return payload;
    case "submitAddress":
      return payload;
    case "addressError":
      return payload;
    default:
      return state;
  }
};

export const FinalCheckOut = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "finalLoading":
      return payload;
    case "finalSubmit":
      return payload;
    case "finalErorr":
      return payload;
      case "finalClear":
        return payload;
    default:
      return state;
  }
};

export const changeProfile = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "changedLoading":
      return payload;
    case "changedSuccesfull":
      return payload;
    case "changedError":
      return payload;
    case "clearProfile":
      return payload;
    default:
      return state;
  }
};

export const ChangePassword = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "passLoading":
      return payload;
    case "passSuccesfull":
      return payload;
    case "passError":
      return payload;
    case "clearPassword":
      return payload;
    default:
      return state;
  }
};

export const uploadAvatar = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "avatarLoading":
      return payload;
    case "avatarSuccesfull":
      return payload;
    case "avatarError":
      return payload;
    case "clearAvatarr":
      return payload;
    default:
      return state;
  }
};

export const getProfile = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "profileLoading":
      return payload;
    case "profileSuccesfull":
      return payload;
    case "profileError":
      return payload;
    default:
      return state;
  }
};

export const getOrders = (
  state = { data: [], loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "ordersLoading":
      return payload;
    case "ordersSuccess":
      return payload;
    case "ordersFailed":
      return payload;
    default:
      return state;
  }
};

export const getOrder = (
  state = { data: {}, loading: false, error: "" },
  { type, payload }
) => {
  switch (type) {
    case "orderLoading":
      return payload;
    case "orderSuccess":
      return payload;
    case "orderFailed":
      return payload;
    default:
      return state;
  }
};
