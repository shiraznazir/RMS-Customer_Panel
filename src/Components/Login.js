import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { login } from "./store/reducer/userSlice";
import React, { useState } from "react";
import { insertUser, getUserByNum } from "./api/posts";
import { useNavigate } from "react-router-dom"
import "../App.css";

const paperStyle = {
  padding: 40,
  height: "50vh",
  margin: "40px auto",
};

const avatarStyle = {
  backgroundColor: "#009900",
};

const btnStyle = {
  margin: "8px 0",
};

function Login() {

  const navigate = useNavigate();
  const [mobileNo, setMobileNo] = useState("")
  const [isVisible, setVisible] = useState(false)
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Mob No:- ", mobileNo)
    navigate('/')
    getUserByNum(mobileNo)
      .then((res) => {
        if (res.data.status) {
          dispatch(
            login({
              mobileNo: mobileNo,
              loggedIn: true,
            })
          )
        } else {
          let newUser = { mobNo: mobileNo }
          insertUser(newUser).then(() => {
            dispatch(
              login({
                mobileNo: mobileNo,
                loggedIn: true,
              })
            );
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    document.cookie = `mobileNo=${mobileNo}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
    document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
  };
  return (
    <Box component="form" sx={{ width: "100%", marginTop: "70px" }}>
      <Paper display="flex" elevation={10} id="login" style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Log-In</h2>
        </Grid>
        {!isVisible && (
          <TextField
            label="Enter Mobile Number"
            placeholder="Enter Mobile No."
            value={mobileNo}
            onChange={(e) => {
              if (e.target.value.length < 11 && !isNaN(e.target.value)) {
                setMobileNo(e.target.value);
              }
            }}
            fullWidth
            required
          />
        )}

        {!isVisible && (
          <Button
            onClick={() => setVisible(true)}
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
          >
            Get OTP
          </Button>
        )}

        {isVisible && (
          <TextField
            sx={{ margin: "8px 0" }}
            label="OTP"
            placeholder="Enter OTP"
            type="Otp"
            fullWidth
            required
          />
        )}

        {isVisible && (
          <Button
            onClick={(e) => handleSubmit(e)}
            type="submit"
            color="primary"
            variant="contained"
            style={btnStyle}
            fullWidth
          >
            Submit
          </Button>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
