import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { login } from "./store/reducer/userSlice";
import React, { useState } from "react";
import { insertUser, getOldUser, checkOtp, reSendOtp } from "./api/posts";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  const [error, setError] = useState({
    status: false,
    msg: "",
  });
  const [mobileNo, setMobileNo] = useState("");
  const [userId, setUserId] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const sendOtp = (e) => {
    e.preventDefault();
    navigate("/");
    let date = new Date();

    getOldUser({ mobNo: mobileNo })
      .then((res) => {
        // console.log("Check User ", res.data);
        if (res.data.status) {
          setUser(res.data.user);
          reSendOtp(res.data.user).then((res) => {
            if (res.data.status) {
              setUser(res.data.user);
            }
            // console.log("Res Data", res.data);
          });
          // sendOtp()
          // user.loggedIn = true;
          // dispatch(login(user));
          // localStorage.setItem("user", JSON.stringify(user));
        } else {
          let newUser = { mobNo: mobileNo, timeStamp: date };
          insertUser(newUser).then((res) => {
            let id = res.data.userCreated;
            // console.log("res data", res.data.userCreated);
            setUser(res.data.userCreated);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // document.cookie = `userId=${userId}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
    // document.cookie = `mobileNo=${mobileNo}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
    // document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Otp", user.otp , otp);
    checkOtp({ mobNo: mobileNo, otp })
      .then((res) => {
        // console.log("Check Otp", res.data);
        if (res.data.status === 0 || res.data.status === 1) {
          // console.log("Otp Matched");
          dispatch(login({ ...user, loggedIn: true }));
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, loggedIn: true })
          );
        } else if (res.data.status === 2) {
          setError({
            status: true,
            msg: "Otp doesn't matched",
          });
        } else {
          setError({
            status: true,
            msg: "Otp expired",
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    // console.log("Check Otp");
  };

  const handleBack = () => {
    setVisible(false);
  };

  // console.log("User Data>>>>>>>>>>>>", user, otp);

  return (
    <Box component="form" sx={{ width: "100%", marginTop: "70px" }}>
      <Paper display="flex" elevation={10} id="login" style={paperStyle}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <ArrowBackIcon onClick={handleBack} />
          </Grid>
          <Grid item xs={8} align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Log-In</h2>
          </Grid>
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
            onClick={(e) => {
              sendOtp(e);
              setVisible(true);
            }}
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
            value={otp}
            onChange={(e) => {
              if (e.target.value.length < 5) {
                setOtp(e.target.value);
              }
            }}
            fullWidth
            required
          />
        )}
        {error.status && (
          <Typography sx={{ color: "#FF0000" }}>{error.msg}</Typography>
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
