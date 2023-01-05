import {
  Box,
  Paper,
  Typography,
  Card,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { selectUser, login } from "../Components/store/reducer/userSlice";
import { updateUser, getUserByNum } from "./api/posts";

function UserEditForm() {

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [flag, setFlag] = useState(true);
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    gender: "",
    submit: ""
  });

  const fetchUserData = () => {
    // console.log("User>>>1", user);
    if (user.name === "undefined") {
      console.log("user>>>>>>", user.name);
    }
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const submitForm = () => {
    setFlag(!flag)
    if (name === "") {
      setMsg({ ...msg, name: "Name field is mandatory"});
    } else if (email === "") {
      setMsg({...msg, name: "", email: "Email field is mandatory"});
    } else if (gender === "") {
      setMsg({...msg, name: "", email: "",  gender: "Gender field is mandatory"});
    } else {
      let data = {
        name: name,
        mobNo: user.mobNo,
        email: email,
        gender: gender,
      };
      updateUser(data).then((res) => {
        if (res.data.status) {
          setMsg({...msg, name: "", email: "", gender: "",  submit: res.data.msg});
          fetchUser();
        }
        // console.log("User res", res.data.user);
      });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
  };
  
  const fetchUser = () =>{
    let num = user.mobNo
    getUserByNum(num).then((res)=>{
      if(res.data.status){
        setName(res.data.user.name)
        setMobNo(res.data.user.mobNo)
        setEmail(res.data.user.email)
        setGender(res.data.user.gender)
        dispatch(login({ ...res.data.user, loggedIn: true }));
          localStorage.setItem(
            "user",
            JSON.stringify({ ...res.data.user, loggedIn: true })
          );
      }
      // console.log("User By number", res.data);
    })
  }

  useEffect(() => {
    fetchUserData();
    fetchUser()
  },[]);

  // console.log("User Details", user.mobNo);
  
  return (
    <Box sx={{ mt: "90px" }}>
      <Grid container spacing={0} sx={{ ml: 3 }}>
        <Grid item xs={1}>
          <KeyboardBackspaceIcon onClick={handleBack} fontSize="medium" />
        </Grid>
        <Grid align="left" item xs={6}>
          <Typography>Complete your Profile</Typography>
        </Grid>
      </Grid>
      <TextField
        type="text"
        sx={{ ml: 3, mb: 3, mt: 1, width: "85%" }}
        id="standard-basic"
        label="Name*"
        variant="standard"
        value={name}
        onChange={(e) => {
          if (e.target.value.length < 20) {
            setName(e.target.value);
          }
        }}
      />
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-basic"
        label="Mobile Number"
        variant="standard"
        value={mobNo}
      />
      {msg.name && <Typography sx={{ color: "#8B0000", ml: 3 }}>{msg.name}</Typography>}
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-basic"
        label="Email*"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {msg.email && <Typography sx={{ color: "#8B0000", ml: 3 }}>{msg.email}</Typography>}
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-select-gender"
        select
        label="Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        variant="standard"
      >
        
        <MenuItem value="" disabled>
          Choose your gender
        </MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
        <MenuItem value="Prefer not to disclose">
          Prefer not to disclose
        </MenuItem>
      </TextField>
      {msg.gender && <Typography sx={{ color: "#8B0000", ml: 3 }}>{msg.gender}</Typography>}
      {msg.submit && <Typography sx={{ color: "#023020", ml: 3 }}>{msg.submit}</Typography>}
      <Button
        onClick={submitForm}
        sx={{ bgcolor: flag ? "#ef4f5f" : "#FF0000", color: "#fffff", ml: 3, mb: 3, width: "85%" }}
        variant="contained"
      >
        Update Profile
      </Button>
    </Box>
  );
}

export default UserEditForm;
