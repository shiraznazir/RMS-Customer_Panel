import "./App.css";
import Navbar from "./Components/Navbar";
import FootMenu from "./Components/FootMenu";
import { useSelector } from "react-redux";
import { selectUser } from "./Components/store/reducer/userSlice";
import Login from "./Components/Login";
import RecentOrder from "./Components/RecentOrder";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";
import Orders from "./Components/Orders";
import Frontend from './Components/Frontend'
import { Routes, Route } from "react-router-dom";

function App() {
  const user1 = useSelector(selectUser);
  const browerData = document.cookie.split("=")[2];

  const user = user1 || browerData ? true : false;

  console.log("User : ", user1);
  console.log("Cookie : ", document.cookie);

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <FootMenu />
        </>
      ) : (
        <Login />
      )}
      <Routes>
        <Route path="/" element={<Frontend />} />
        <Route path="/recentorder" element={<RecentOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
