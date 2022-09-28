import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch } from "react-redux";
import { login } from "./store/reducer/userSlice";
import React, { useState } from "react";

const paperStyle = {
  padding: 40,
  height: "50vh",
  width: "70%",
  marginTop: "40px",
  marginLeft: "20px",
};

const avatarStyle = {
  backgroundColor: "green",
};

const btnStyle = {
  margin: "8px 0",
};

function Login() {

  const [mobileNo, setMobileNo] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const handleError = (number) => {
    //console.log("Number:-", number.length);
    if(number.length > 10){
        setError(true);
    }
  }
  console.log("error : " , error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        mobileNo: mobileNo,
        loggedIn: true,
      })
    );
    //document.cookie = 'cookie1=test; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/'
    document.cookie = `mobileNo=${mobileNo}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`
    document.cookie = `loggedIn=${true}; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`
  };



  return (
    <Grid sx={{ width: "100%", marginTop: "70px" }}>
      <Paper
        display="flex"
        justifyContent="center"
        elevation={10}
        style={paperStyle}
      >
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
            type="number"
            value={mobileNo}
            onChange={(e) => {
                if(e.target.value.length < 11){
                    setMobileNo(e.target.value)
                }
                handleError(e.target.value);
            }}
            borderColor='red'
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
            borderColor= '#FF0000'
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
    </Grid>
  );
}

export default Login;
