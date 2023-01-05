import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Chip,
  Grid,
  Dialog,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img1 from "./images/noOrder2.png";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "./store/reducer/cartSlice";
import { getRecentOrder } from "./api/posts";
import groupArray from "group-array";
import { selectUser } from "./store/reducer/userSlice";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const cards = {
  m: 2,
};

function RecentOrder() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [recentOrder, serRecentOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState([]);

  const handleClickOpen = (orders) => {
    console.log("Open window", orders);
    setOpen(true);
    setItem(orders);
  };

  const fectchDataByStatus = () => {
    getRecentOrder({ id: user._id })
      .then((res) => {
        const data = groupArray(res.data, "id");
        serRecentOrder(data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fectchDataByStatus();
  }, []);

  console.log("Cart:- ", recentOrder);

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
        <Grid sx={{ mt: 2, ml: 4 }} item xs={2}>
          <ArrowBackIosIcon onClick={handleBack} />
        </Grid>
        <Grid item xs={8}>
          <Typography
            variant="h6"
            sx={{ color: "#3f4564", mt: 2, fontWeight: "bold" }}
          >
            Recent Orders List
          </Typography>
        </Grid>
      </Grid>

      {Object.keys(recentOrder).length > 0 && (
        <Typography m={2}>Here is your recent order list data</Typography>
      )}

      <Grid container spacing={1}>
        {Object.keys(recentOrder).map((key, index) => {
          let date = new Date(recentOrder[key][0].timeStamp);
          let price = 0;
          recentOrder[key].map((element) => {
            price += element.totalProductPrice;
          });

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
                      onClick={() => handleClickOpen(recentOrder[key])}
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
                    <Chip sx={{ color: "#008000"}} label="Delivered" variant="outlined" />
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
                        {"Quantity : " + element.qty}
                        {element.productFull
                          ? " x Full"
                          : element.productHalf
                          ? " x Half"
                          : element.productQuater
                          ? " x Quater"
                          : ""}
                      </Typography>
                    </Grid>
                    <Grid item align="right" xs={4}>
                      <Grid container spacing={2}>
                        <Grid item align="right" xs={2}>
                          <CurrencyRupeeIcon />
                        </Grid>
                        <Grid item align="right" xs={2}>
                          <Typography
                            sx={{
                              ml: 1.5,
                              mt: "-3px",
                              fontWeight: "bold",
                              fontSize: "20px",
                            }}
                          >
                            {element.totalProductPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={1}> */}
                    {/* <CurrencyRupeeIcon
                      sx={{ fontWeight: "bold", fontSize: "medium" }}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{ fontWeight: "bold" }}>
                    {element.totalProductPrice} */}
                  </Grid>
                  {/* </Grid> */}

                  {/* <Typography>
                    {element.status === 3
                      ? "Order Accepted"
                      : element.status === 4
                      ? "Preparation"
                      : "Ready to Deliver"}
                  </Typography> */}
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
    </Box>
  );
}

export default RecentOrder;
