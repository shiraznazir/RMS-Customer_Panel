import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Routes, Route } from "react-router-dom";
import Frontend from "./Frontend";
import { Grid, Avatar, Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import "../App.css";
import RecentOrder from "./RecentOrder";
import Cart from "./Cart";
import Profile from "./Profile";
import Orders from "./Orders";
import Login from "./Login";
import SignUp from './SignUp';
import { logout } from "./store/reducer/userSlice";
import { useDispatch } from "react-redux";

const notifications = ["Profile", "Orders", "Logout"];

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    document.cookie =
      "mobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={4}
          >
            <Grid item xs={7.5} md={10}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography variant="h5" noWrap component="div">
                  RMS
                </Typography>
              </Link>
            </Grid>
            <Grid item md={2}>
              {/* Inner -Grid */}
              <Grid container spacing={0} justify="flex-end">
                <Grid
                  id="profile-name"
                  item
                  xs={6}
                  md={7}
                  justifyContent="flex-end"
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Cindy Baker
                  </Typography>
                  <Typography>Super Admin</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  md={3}
                  justifyContent="flex-end"
                >
                  <Avatar
                    onClick={handleClick}
                    alt="Cindy Baker"
                    src="https://mui.com/static/images/avatar/3.jpg"
                    sx={{ width: 40, height: 40, marginLeft: "50px" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {notifications.map((element, index) => {
          return element == "Logout" ? (
            <Typography
              key={index + Math.random()}
              sx={{ p: 2 }}
              onClick={(e) => handleLogout(e)}
            >
              {element}
            </Typography>
          ) : (
            <Link
              key={index + Math.random()}
              to={element}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <Typography sx={{ p: 2 }}>{element}</Typography>
            </Link>
          );
        })}
      </Popover>
      <Routes>
        <Route path="/" element={<Frontend />} />
        <Route path="/recentorder" element={<RecentOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      {/* <FootMenu /> */}
    </Box>
  );
}
