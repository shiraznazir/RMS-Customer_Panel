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
    document.cookie = "mobileNo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "loggedIn=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    <Box sx={{ display: "flex", width: "95%" }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#ff9999", height: "60px" }}
        open={open}
      >
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={5} md={9}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{
                    marginTop: { xs: 1, md: 2 },
                  }}
                >
                  RMS
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={7} md={3}>
              <Grid
                container
                spacing={-20}
                sx={{ marginLeft: { sx: 9, md: 20 } }}
              >
                <Grid id="profile-name" item xs={6} md={8}>
                  <Typography sx={{ marginTop: 1, fontWeight: "bold" }}>
                    Cindy Baker
                  </Typography>
                  <Typography>Super Admin</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  sx={{
                    marginTop: { xs: 0.5, md: 1 },
                    marginRight: { xs: "0px" },
                    marginLeft: { xs: 12 },
                  }}
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
        {notifications.map((element) => {
          return element == "Logout" ? (
            <Typography sx={{ p: 2 }} onClick={(e) => handleLogout(e)}>
              {element}
            </Typography>
          ) : (
            <Link
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      {/* <FootMenu /> */}
    </Box>
  );
}
