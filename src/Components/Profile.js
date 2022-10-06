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
import { useNavigate } from "react-router-dom";

const paperStyle = {
  width: { xs: "82%", md: "80%" },
  padding: "15px",
  margin: { xs: "10px auto", md: "20px auto" },
};

const parentPaper = {
  bgColor: "#000000",
  width: { xs: "90%", md: "30%" },
  margin: "-40px auto",
  height: "70vh",
};

const cardStyle = {
  width: { xs: "92%", md: "87%" },
  marginLeft: { xs: "10px", md: "25px" },
  marginTop: "10px",
};

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    navigate('/login')
    dispatch(logout())
    document.cookie =
      "mobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  };

  return (
    <Box width="100%" sx={{ marginTop: "120px" }}>
      <Paper elevation={5} sx={parentPaper}>
        <Typography
          align="center"
          variant="h6"
          fontWeight="bold"
          sx={{ margin: "10px auto", padding: "5px", color: "blue" }}
        >
          Profile
        </Typography>
        <Paper alignitems="center" justifycontent="center" sx={paperStyle}>
          <Typography align="left" variant="h6" fontWeight="bold">
            UserName
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
              sx={{
                marginLeft: { xs: "-50px", md: "-80px" },
                marginTop: "10px",
                color: "#FF0000",
              }}
            >
              <ArrowRightIcon />
            </Grid>
          </Grid>
        </Paper>

        <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
          <Card justifycontent='center' sx={cardStyle}>
            <CardContent sx={{ padding: "5px" }}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  {/* <Box
                  sx={{
                    bgcolor: "#ddd4d4",
                    width: {xs:"12vw", md: '3vw'},
                    height: {xs: "7vh", md: "8vh"},
                    borderRadius: "50%",
                  }}
                > */}
                  <AssignmentIcon sx={{ margin: "10px" }} />
                  {/* </Box> */}
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

        <Link to="/login" style={{ textDecoration: "none", color: "white" }} >
          <Card sx={cardStyle}>
            <CardContent sx={{ padding: "5px" }}>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  {/* <Box
                 sx={{
                  bgcolor: "#ddd4d4",
                  width: {xs:"12vw", md: '3vw'},
                  height: {xs: "7vh", md: "8vh"},
                  borderRadius: "50%",
                }}
              > */}
                  <PowerSettingsNewIcon sx={{ margin: "10px" }} />
                  {/* </Box> */}
                </Grid>
                <Grid item xs={6} onClick={(e) => handleLogout(e)}>
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
        </Link>
      </Paper>
    </Box>
  );
}

export default Profile;
