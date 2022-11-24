import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Divider,
  Item,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { getMyOrder } from "./api/posts";
import { selectUser } from "./store/reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Chip from "@mui/material/Chip";
import groupArray from "group-array";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img1 from "./images/noOrder2.png";

const styleTableHead = {
  fontWeight: "bold",
  fontSize: 10,
  color: "#010100",
  width: "100%",
};

const cards = {
  m: 2,
};

function Orders() {

  const navigate = useNavigate()
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);

  const handleClickOpen = (orders) => {
    console.log("Open window", orders);
    setOpen(true);
    setItem(orders);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fectchDataByStatus = () => {
    getMyOrder({ id: user._id })
      .then((res) => {
        // console.log("Before group>>>>>>>", res.data);
        const data = groupArray(res.data, "id");
        // console.log("After group>>>>>>>>>>>", data);
        setOrders(data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleBack = () => {
    // console.log("Bavj jbeafsDYDFG");
    navigate("/");
  };

  useEffect(() => {
    fectchDataByStatus();
  }, []);

  // console.log("Check order ", objectLength);

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        width: "100%",
        marginBottom: "50px",
        marginTop: "70px",
      }}
    >
      <Grid container spacing={1}>
        <Grid sx={{ m: 2, ml:4}} item xs={2}>
          <ArrowBackIosIcon onClick={handleBack} />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            m={2}
            sx={{ color: "#3f4564", fontWeight: "bold" }}
          >
            Orders List
          </Typography>
        </Grid>
      </Grid>

      {Object.keys(orders).length > 0 && (
        <Typography m={2}>Here is your order list data</Typography>
      )}

      <Grid container spacing={1}>
        {Object.keys(orders).map((key, index) => {
          let date = new Date(orders[key][0].timeStamp);
          let price = 0;
          orders[key].map((element) => {
            price += element.totalProductPrice;
          });

          // console.log("Check Price>>>>>", orders[key], price);

          return (
            <Grid item xs={12} key={index + Math.random()}>
              <Card
                sx={{
                  fontSize: 12,
                  ml: "10px",
                  width: "95%",
                  bgcolor: "#fff",
                }}
              >
                <Grid container spacing={0}>
                  <Grid sx={cards} item xs={6}>
                    {/* <Card
                      sx={{
                        fontSize: 12,
                        p: 1,
                        mb: 1,
                        bgcolor: "#ADD8E6",
                      }}
                      align="center"
                    > */}
                    <Typography>Order ID: {key}</Typography>
                    {/* </Card> */}
                  </Grid>
                  <Grid sx={cards} align="right" item xs={3}>
                    <a href="tel:+918630344068">
                      {" "}
                      <CallIcon />{" "}
                    </a>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={1}>
                  <Grid sx={{ ...cards, color: "#808080" }} item xs={2}>
                    <Typography>{date.toLocaleDateString()}</Typography>
                  </Grid>
                  <Grid sx={{ ...cards, color: "#808080" }} item xs={4}>
                    <Typography>
                      {" at " + date.toLocaleTimeString()}
                    </Typography>
                  </Grid>
                  <Grid
                    align="right"
                    sx={{ ...cards, color: "#000000" }}
                    item
                    xs={2}
                  >
                    <VisibilityIcon
                      onClick={() => handleClickOpen(orders[key])}
                    />
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={1}>
                  <Grid sx={cards} item xs={6}>
                    {/* <Card
                      sx={{
                        fontSize: 12,
                        p: 1,
                        mb: 1,
                        bgcolor: "#F0F0F0",
                      }}
                      align="center"
                    > */}
                    <Chip
                      label={
                        orders[key][0].status === 3
                          ? "Order Accepted"
                          : orders[key][0].status === 4
                          ? "Add for Kitchen"
                          : orders[key][0].status === 5
                          ? "Ready To Deliver"
                          : "Delivered"
                      }
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item align="right" xs={4}>
                    <Grid container spacing={2}>
                      <Grid item align="right" xs={2}>
                        <CurrencyRupeeIcon sx={{ ...cards, mt: 2.2 }} />
                      </Grid>
                      <Grid item align="left" xs={2}>
                        <Typography
                          sx={{
                            ...cards,
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    {/* <Typography sx={{ pl: 2 }}>Quantity : </Typography> */}
                  </Grid>
                  <Grid align="left" item xs={1}>
                    {/* <Typography sx={{ fontWeight: "bold", color: "#808080" }}>
                      {element.qty}
                    </Typography> */}
                  </Grid>
                  <Grid item xs={2}>
                    {/* <Typography>{element}</Typography> */}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <div>
        <Dialog
          open={open}
          className="custom"
          onClose={handleClose}
          sx={{ margin: "0px !important" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "flex-start",
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <CancelIcon
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
              }}
              onClick={() => handleClose()}
            />
          </Box>
          {item.map((element) => {
            return (
              <Grid
                container
                spacing={0}
                sx={{ paddingTop: "10px", paddingLeft: "10px" }}
              >
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    alt={element.menuImage}
                    sx={{ p: 2, width: "20vw", borderRadius: 5 }}
                    height="70vh"
                    image={`http://localhost:9000/images/${element.productId.menuImage}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ pt: 1, fontWeight: "bold" }}>
                    {element.productId.name}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={10}>
                      <Typography sx={{ fontWeight: "bold", color: "#808080" }}>
                        {element.qty}
                        {element.productFull
                          ? " x Full"
                          : element.productHalf
                          ? " x Half"
                          : element.productQuater
                          ? " x Quater"
                          : ""}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <CurrencyRupeeIcon
                        sx={{ fontWeight: "bold", fontSize: "medium" }}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ fontWeight: "bold" }}>
                      {element.totalProductPrice}
                    </Grid>
                  </Grid>

                  <Typography>
                    {element.status === 3
                      ? "Order Accepted"
                      : element.status === 4
                      ? "Preparation"
                      : "Ready to Deliver"}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <RadioButtonCheckedIcon
                    sx={{
                      pt: 1,
                      color:
                        element.productId.isVeg == "Veg"
                          ? "#00FF00"
                          : "#FF0000",
                    }}
                  />
                </Grid>
                <Divider
                  sx={{
                    fontSize: "50px",
                    fontWeight: "bold",
                    width: "95%",
                  }}
                />
              </Grid>
            );
          })}
        </Dialog>
      </div>
      {Object.keys(orders).length == 0 && (
        <Box>
          <img src={img1} alt="Error" width="100%" height="80%" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography align="center" sx={{ textDecoration: "none" }}>
              Go to Menu items
            </Typography>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default Orders;
