import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import {
  products,
  oneProduct,
  getShopBasket,
  updateShopBasket,
  signUp,
  signIn,
  shippingAddress,
  FinalCheckOut,
  changeProfile,
  ChangePassword,
  uploadAvatar,
  getProfile,
  getOrders,
  getOrder,
  
} from "./reducer";

const reducer = combineReducers({
  products,
  oneProduct,
  getShopBasket,
  updateShopBasket,
  signUp,
  signIn,
  shippingAddress,
  FinalCheckOut,
  changeProfile,
  ChangePassword,
  uploadAvatar,
  getProfile,
  getOrders,
  getOrder,
  
});
const data = JSON.parse(localStorage.getItem("shoping"))
  ? JSON.parse(localStorage.getItem("shoping"))
  : [];
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : {};
const middleware = [thunk];
const initialState = { getShopBasket: [...data], signIn: { ...user } };

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
