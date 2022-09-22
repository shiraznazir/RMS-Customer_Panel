import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Routes, Route } from "react-router-dom";
import Frontend from "./Frontend";
import Transaction from "./Transaction";
import Booking from "./Booking";
import OrderStatus from "./OrderStatus";
import { Grid, Stack, Avatar } from "@mui/material";
import Dashboard from "./Dashboard";
import "../App.css";

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

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container spacing={3}>
            <Grid item xs={4} md={9}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant={{ md: "h3" }}
                  noWrap
                  component="div"
                  sx={{
                    marginTop: { xs: 2, md: 2 },
                  }}
                >
                  RMS
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={8} md={3}>
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
                    alt="Cindy Baker"
                    src="https://mui.com/static/images/avatar/3.jpg"
                    sx={{ width: 50, height: 50 }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Frontend />} />
      </Routes>
    </Box>
  );
}
