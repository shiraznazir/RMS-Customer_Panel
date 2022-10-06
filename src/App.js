import "./App.css";
import Navbar from "./Components/Navbar";
import FootMenu from "./Components/FootMenu";
import { useSelector } from "react-redux";
import { selectUser } from "./Components/store/reducer/userSlice";
import Login from './Components/Login';

function App() {
  
  const user1 = useSelector(selectUser);
  const browerData = document.cookie.split('=')[2]

  const user = user1 || browerData ? true : false

  console.log("User : ",user );
  
  return (
    <div>
      {user ? <><Navbar /><FootMenu /></> : <Login />}
    </div>
  );
}

export default App;
