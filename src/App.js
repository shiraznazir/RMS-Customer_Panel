import "./App.css";
import React, { useEffect } from "react";
import FootMenu from "./Components/FootMenu";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./Components/store/reducer/userSlice";
import Login from "./Components/Login";
import RecentOrder from "./Components/RecentOrder";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Frontend from './Components/Frontend'
import UserEditForm from './Components/UserEditForm'
import { Routes, Route } from "react-router-dom";
import { login } from './Components/store/reducer/userSlice'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
    // const browerData = document.cookie
    dispatch(
      login(user)
    )
  }, []);

  return (
    <div>
      {user ? (
        <>
          <FootMenu />
          <Routes>
        <Route exact path="/" element={<Frontend />} />
        <Route exact path="/recentorder" element={<RecentOrder />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/profileEdit" element={<UserEditForm />} />
      </Routes>
        </>
      ) : (
        <Login />
      )}
      
    </div>
  );
}

export default App;
