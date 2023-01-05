import React, { useEffect } from "react";
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
import Avatar from "@mui/material/Avatar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logout } from "./store/reducer/userSlice";
import { selectUser } from "./store/reducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/reducer/userSlice";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";

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

const commonStyles = {
  bgcolor: "#D3D3D3",
  m: 1,
  width: "3rem",
  height: "3rem",
};

const iconStyle = {
  color: "#808080",
  mt: 1.6,
  fontSize: "22px",
};

function Profile() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.localStorage.removeItem("user");
    // document.cookie =
    //   "mobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    // document.cookie =
    //   "loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    navigate("/login");
    // console.log("Logout");
  };

  const handleEdit = () => {
    navigate("/profileEdit");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleHistory = () => {
    navigate("/recentOrder");
  };

  const handleBack = () => {
    navigate("/");
  };

  // useEffect(()=>{
  //   fetchUser()
  // },[])

  // console.log("User Profile:- ", user);

  return (
    <Box sx={{ m: 3, mt: "70px" }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <ArrowBackIosIcon onClick={handleBack} />
        </Grid>
        <Grid align="center" item xs={6}>
          <Typography sx={{ fontSize: "20px" }}>My Profile</Typography>
        </Grid>
        <Grid align="right" item xs={3}>
          <MoreVertIcon />
        </Grid>
      </Grid>
      <Grid sx={{ m: 1, mt: 3 }} container spacing={1}>
        <Grid sx={{ fontSize: "50px" }} item xs={3}>
          <Avatar
            sx={{ width: 70, height: 70 }}
            alt="Cindy Baker"
            src="/static/images/avatar/3.jpg"
          />
        </Grid>
        <Grid sx={{ mt: 1 }} item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            {user.name ? user.name : "Paul Walker"}
          </Typography>
          <Typography>{"+91 " + user.mobNo}</Typography>
        </Grid>
        <Grid sx={{ mt: 1.5, color: "#808080" }} item xs={3}>
          <BorderColorIcon onClick={handleEdit} fontSize="large" />
        </Grid>
      </Grid>
      {/* Dashboard */}
      <Grid sx={{ m: 2 }}>
        <Typography>Dashboard</Typography>
      </Grid>
      {/* My Cart */}
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box align="center" sx={{ ...commonStyles, borderRadius: "50%" }}>
            <ShoppingCartIcon sx={iconStyle} />
          </Box>
        </Grid>
        <Grid sx={{ mt: 2 }} item xs={4}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            My Cart
          </Typography>
        </Grid>
        <Grid sx={{ mt: 2.5 }} align="right" item xs={4}>
          <ArrowForwardIosIcon onClick={() => handleCart()} />
        </Grid>
      </Grid>
      {/* My order */}
      <Grid sx={{ mt: 1 }} container spacing={3}>
        <Grid item xs={3}>
          <Box align="center" sx={{ ...commonStyles, borderRadius: "50%" }}>
            <ListAltIcon sx={iconStyle} />
          </Box>
        </Grid>
        <Grid sx={{ mt: 2 }} item xs={5}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            My Orders
          </Typography>
        </Grid>
        <Grid sx={{ mt: 2.5 }} align="right" item xs={3}>
          <ArrowForwardIosIcon onClick={() => handleOrders()} />
        </Grid>
      </Grid>
      {/* recent order */}
      <Grid sx={{ mt: 1 }} container spacing={3}>
        <Grid item xs={3}>
          <Box align="center" sx={{ ...commonStyles, borderRadius: "50%" }}>
            <HistoryIcon sx={iconStyle} />
          </Box>
        </Grid>
        <Grid sx={{ mt: 2 }} item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Recent Order
          </Typography>
        </Grid>
        <Grid sx={{ mt: 2.5 }} align="right" item xs={2}>
          <ArrowForwardIosIcon onClick={() => handleHistory()} />
        </Grid>
      </Grid>
      {/* my Account */}
      <Grid sx={{ m: 2, mt: 4 }}>
        <Typography>My Account</Typography>
      </Grid>
      <Grid sx={{ m: 2, mb: 8, color: "#FF0000" }}>
        <Typography onClick={handleLogout}>Log out</Typography>
      </Grid>
    </Box>
  );
}

export default Profile;
