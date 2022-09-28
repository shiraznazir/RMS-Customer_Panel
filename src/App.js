import "./App.css";
import Navbar from "./Components/Navbar";
import FootMenu from "./Components/FootMenu";
import { useSelector } from "react-redux";
import { selectUser } from "./Components/store/reducer/userSlice";
import Login from './Components/Login';

function App() {
  
  const user = useSelector(selectUser);

  var elements = document.cookie.split('=')[2];
  
  return (
    <div>
      {user || elements ? <><Navbar /><FootMenu /></> : <Login />}  
    </div>
  );
}

export default App;
