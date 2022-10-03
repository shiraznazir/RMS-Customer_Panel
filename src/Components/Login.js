import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { login } from "./store/reducer/userSlice";
import React, { useState } from "react";
import { insertUser } from "./api/posts";
import { Link } from "react-router-dom";
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
  const [mobileNo, setMobileNo] = useState("");
  const [name, setName] = useState("");
  const [isVisible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        name: name,
        mobileNo: mobileNo,
        loggedIn: true,
      })
    );
    //document.cookie = 'cookie1=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
    document.cookie = `name=${name}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
    document.cookie = `mobileNo=${mobileNo}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
    document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;

    let newUser = { name: name, mobNo: mobileNo, loggedIn: true };
    insertUser(newUser);
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
        {/* Name */}
        {/* {!isVisible && (
          <TextField
            label="Enter Your Name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              if (e.target.value.length < 20 && isNaN(e.target.value)) {
                setName(e.target.value);
              }
            }}
            sx={{ marginBottom: "10px" }}
            fullWidth
            required
          />
        )} */}
        {/* Mobile Number */}
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
        <Divider sx={{ fontSize: 2 }} />
      </Paper>
      {/* <Link to="/signUp" style={{ textDecoration: "none", color: "white" }}>
        <Button color="success" variant="contained" style={btnStyle} fullWidth>
          Create new Acoount
        </Button>
      </Link> */}
    </Box>
  );
}

export default Login;
