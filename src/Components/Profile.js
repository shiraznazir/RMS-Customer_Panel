import React from "react";
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "./store/reducer/userSlice";
import { useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";

const paperStyle = { width: "92%", padding: "15px", margin: "5px" };

const cardStyle = { width: "100%", margin: "5px", marginTop: "20px" };

function Profile() {

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    document.cookie =
      "mobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <Box width="96%" sx={{ marginTop: "70px" }}>
      {/* <Typography>Profile</Typography> */}
      <Paper sx={paperStyle}>
        <Typography align="left" variant="h6" fontWeight="bold">
          Kallu Yadav
        </Typography>
        <Typography align="left" sx={{ marginTop: "10px" }}>
          +91 9060798777
        </Typography>
        <Typography align="left">kalluyadav@gmail.com</Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography sx={{ color: "#FF0000", marginTop: "10px" }}>
              edit profile
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ marginLeft: "-80px", marginTop: "10px", color: "#FF0000" }}
          >
            <ArrowRightIcon />
          </Grid>
        </Grid>
      </Paper>

      <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
        <Card sx={cardStyle}>
          <CardContent sx={{ padding: "5px" }}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    bgcolor: "#ddd4d4",
                    width: "12vw",
                    height: "7vh",
                    borderRadius: "50%",
                  }}
                >
                  <AssignmentIcon sx={{ margin: "10px" }} />
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  fontWeight="bold"
                  sx={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  Your Orders
                </Typography>
              </Grid>
              <Grid item align="right" xs={4} sx={{ marginTop: "10px" }}>
                <NavigateNextIcon />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Link>

      <Card sx={cardStyle}>
        <CardContent sx={{ padding: "5px" }}>
          <Grid container spacing={1} sx={{ marginTop: "5px" }}>
            <Grid item xs={1}>
              <Box
                sx={{
                  bgcolor: "#ddd4d4",
                  width: "12vw",
                  height: "7vh",
                  borderRadius: "50%",
                }}
              >
                <PowerSettingsNewIcon sx={{ margin: "10px" }} />
              </Box>
            </Grid>
            <Grid item xs={6} onClick={(e)=>handleLogout(e)}>
              <Typography
                fontWeight="bold"
                sx={{ marginLeft: "40px", marginTop: "10px" }}
              >
                Logout
              </Typography>
            </Grid>
            <Grid item align="right" xs={5} sx={{ marginTop: "10px" }}>
              <NavigateNextIcon />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
