import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/pages/NotFound";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import Card from "./components/pages/Card";
import { useEffect, useState } from "react";
import { LogIn } from "./components/pages/LogIn";
import { SignUp } from "./components/pages/SignUp";
import { Address } from "./components/pages/Address";
import { CheckOut } from "./components/pages/CheckOut";
import Profile from "./components/pages/setting/Profile";
import Setting from "./components/pages/setting/Setting";
import ChangeProfile from "./components/pages/setting/ChangeProfile";
import UploadAvatar from "./components/pages/setting/UploadAvatar";
import ChangePassword from "./components/pages/setting/ChangePassword";
import Orders from "./components/pages/setting/Orders";
import Order from "./components/pages/setting/Order";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData } from "./redux/action";

function App() {
  const [btnCheak, setbtnCheak] = useState(0);
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState(false);
  const users = JSON.parse(localStorage.getItem("user"));
  const LocalStorageBasket = JSON.parse(localStorage.getItem("shoping"));
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getProfile);


  useEffect(() => {
    if (users) {
      setLogin(true);
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      dispatch(getProfileData());
      if (error) {
        setLogin(false);
      }
    }
  }, []);

  return (
    <div className="App">
      <Header login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={"product/:id"}
          element={<Product setbtnCheak={setbtnCheak} />}
        />
        <Route
          path={"/card"}
          element={<Card setbtnCheak={setbtnCheak} login={login} />}
        />

        <Route
          path="/login"
          element={
            !login ? <LogIn setLogin={setLogin} login={login} /> : <NotFound />
          }
        />
        <Route path="/signUp" element={!login ? <SignUp /> : <NotFound />} />
        <Route
          path="/address"
          element={
            LocalStorageBasket && login ? (
              <Address setAddressCheck={setAddress} />
            ) : (
              <NotFound />
            )
          }
          login={login}
        />
        <Route path="/checkout" element={login ? <CheckOut /> : <NotFound />} />
        <Route path="/profile" element={login ? <Profile /> : <NotFound />} />

        <Route path="/setting" element={login ? <Setting /> : <NotFound />}>
          <Route
            path="changeprofile"
            element={login ? <ChangeProfile /> : <NotFound />}
          />
          <Route
            path="uploadavatar"
            element={login ? <UploadAvatar /> : <NotFound />}
          />
          <Route
            path="changepassword"
            element={login ? <ChangePassword /> : <NotFound />}
          />
        </Route>

        <Route path="/orders" element={login ? <Orders /> : <NotFound />} />
        <Route path="order/:id" element={login ? <Order /> : <NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
