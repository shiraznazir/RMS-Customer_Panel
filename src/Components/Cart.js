import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "./store/reducer/cartSlice";
import {
  getOrder,
  getOrderByStatus,
  editOrder,
  deleteOrder,
  getOrderByUserId,
} from "./api/posts";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";
import { selectUser } from "./store/reducer/userSlice";
import { Link } from "react-router-dom";
import img1 from "./images/noCart.png";

function Cart() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [cart, setCart] = useState({ data: [], totalPrice: 0 });

  const decreaseQty = (e, element) => {
    e.preventDefault();
    if (element.qty > 1) {
      let updatePrice = element.productFull
        ? element.productId.fullPrice
        : element.productHalf
        ? element.productId.halfPrice
        : element.productQuater
        ? element.productId.quaterPrice
        : element.productId.price;
      let updateQty = {
        ...element,
        qty: element.qty - 1,
        totalProductPrice: element.totalProductPrice - updatePrice,
      };
      editOrder(element._id, updateQty).then((res) => {
        fetchOrderByStatus();
      });
    } else {
      deleteOrder(element._id).then((res) => {
        if (res.data.status) {
          fetchOrderByStatus();
        }
      });
      navigate("/cart");
    }
  };

  const increaseQty = (e, element) => {
    e.preventDefault();
    let updatePrice = element.productFull
      ? element.productId.fullPrice
      : element.productHalf
      ? element.productId.halfPrice
      : element.productQuater
      ? element.productId.quaterPrice
      : element.productId.price;
    let update = {
      ...element,
      qty: element.qty + 1,
      totalProductPrice: element.totalProductPrice + updatePrice,
    };
    editOrder(element._id, update).then((res) => {
      fetchOrderByStatus();
    });
  };

  const generateRandomNoID = () => {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    randomNumber = String(randomNumber);
    randomNumber = randomNumber.substring(0, 6);
    return "oid_" + randomNumber;
  };

  const handlePayment = (cartItems, statusID) => {

    let id = generateRandomNoID();

    let date = new Date();

    cartItems.data.map((element) => {
      let update = {
        ...element,
        status: statusID,
        id: id,
        timeStamp: date,
      };
      editOrder(element._id, update).then((res) => {
        fetchOrderByStatus();
      });
    });
  };

  const fetchOrderByStatus = () => {
    getOrderByStatus({ status: 0, id: user._id }).then((res) => {
      let totalAmount = 0;
      res.data.map((ele) => {
        totalAmount += ele.totalProductPrice;
      });
      setCart({ data: res.data, totalPrice: totalAmount });
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchOrderByStatus();
  }, []);

  return (
    <Box width="90%" sx={{ marginBottom: "70px", mt: "70px" }}>
      {/* <Paper> */}
      <Paper
        justify="center"
        sx={{
          fontSize: 12,
          width: "100%",
          bgcolor: "#fff",
          margin: 2,
          paddingBottom: "15px",
        }}
      >
        <Grid container spacing={0}>
          <Grid sx={{ m: 1.5 }} item xs={3}>
            <ArrowBackIosIcon onClick={handleBack} />
          </Grid>
          <Grid item xs={8}>
            <Typography fontWeight="bold" sx={{ margin: 1.5 }}>
              Your Cart
            </Typography>
          </Grid>
        </Grid>
        {cart.data.length > 0 &&
          cart.data.map((element) => {
 
            return (
              <Paper elevation={4} sx={{ m: 2, mt: 4, pb: 1, pt: 0 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography sx={{ margin: 1.5 }}>
                      {element.productId.name}
                    </Typography>
                    <Stack container direction="row" sx={{ margin: 1.5 }}>
                      <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                      <Typography sx={{ marginTop: "-3px" }}>
                        {element.productFull
                          ? element.productId.fullPrice
                          : element.productHalf
                          ? element.productId.halfPrice
                          : element.productQuater
                          ? element.productId.quaterPrice
                          : element.productId.price}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{ marginTop: "-10px", ml: 2, color: "#808080" }}
                    >
                      {element.productFull
                        ? "Full"
                        : element.productHalf
                        ? "Half"
                        : element.productQuater
                        ? "Quater"
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ margin: 1.5 }}>
                    <Box
                      sx={{
                        border: 1,
                        bgcolor: "background.paper",
                        m: 1,
                        borderColor: "#ef4f5f",
                        borderRadius: "1rem",
                        width: "6rem",
                        height: "2rem",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={4}
                          sx={{ marginTop: "4px", marginLeft: "4px" }}
                        >
                          <RemoveIcon
                            onClick={(e) => decreaseQty(e, element)}
                            sx={{ color: "#ef4f5f" }}
                          />
                        </Grid>
                        <Grid
                          align="center"
                          item
                          xs={3}
                          sx={{ marginTop: "4px" }}
                        >
                          <Typography fontWeight="bold">
                            {element.qty}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ marginTop: "4px" }}>
                          <AddIcon
                            onClick={(e) => {
                              increaseQty(e, element);
                            }}
                            sx={{ color: "#ef4f5f" }}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={0} sx={{ marginTop: 1 }}>
                        <Grid align="right" item xs={8}>
                          <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                        </Grid>
                        <Grid align="center" item xs={4}>
                          <Typography sx={{ marginTop: "-3px" }}>
                            {element.totalProductPrice}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
          {cart.data.length === 0 && (
        <Box sx={{ margin: 1.5 }}>
          <img src={img1} alt="Error" width="100%" height="100%" />
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography align="center" sx={{ textDecoration: "none" }}>
              Go to Menu items
            </Typography>
          </Link>
        </Box>
      )}
      </Paper>
      {/* Bill Summary */}
      {cart.data.length > 0 && (
        <Card
          justify="center"
          sx={{
            fontSize: 12,
            width: "100%",
            bgcolor: "#fff",
            margin: 2,
          }}
        >
          <Typography fontWeight="bold" sx={{ margin: 1.5 }}>
            Bill Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid align="left" item xs={8}>
              <Typography sx={{ margin: 1.5 }}>Item total</Typography>
              <Typography sx={{ margin: 1.5 }}>Taxes</Typography>
              <Typography fontWeight="bold" sx={{ margin: 1.5 }}>
                Grand total
              </Typography>
            </Grid>
            <Grid align="right" item xs={4}>
              <Stack container direction="row" sx={{ margin: 1.5 }}>
                <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                <Typography sx={{ marginTop: "-3px" }}>
                  {cart.totalPrice}
                </Typography>
              </Stack>
              <Stack container direction="row" sx={{ margin: 1.5 }}>
                <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                <Typography sx={{ marginTop: "-3px" }}>
                  {cart.totalPrice * 0.18}
                </Typography>
              </Stack>
              <Stack container direction="row" sx={{ margin: 1.5 }}>
                <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                <Typography fontWeight="bold" sx={{ marginTop: "-3px" }}>
                  {cart.totalPrice + cart.totalPrice * 0.18}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      )}
      {/* Check Out */}
      {cart.data.length > 0 && (
        <Card
          justify="center"
          sx={{
            fontSize: 12,
            width: "100%",
            bgcolor: "#fff",
            margin: 2,
          }}
        >
          <Typography
            onClick={() => handlePayment(cart, 1)}
            fontWeight="bold"
            sx={{ margin: 1.5 }}
          >
            Pay At Resturant
          </Typography>
        </Card>
      )}
      {cart.data.length > 0 && (
        <Card
          justify="center"
          sx={{
            fontSize: 12,
            width: "100%",
            bgcolor: "#fff",
            margin: 2,
          }}
        >
          <Typography
            onClick={() => handlePayment(cart, 2)}
            fontWeight="bold"
            sx={{ margin: 1.5 }}
          >
            Proceed to Check Out
          </Typography>
        </Card>
      )}
      {/* </Paper> */}
      
    </Box>
  );
}

export default Cart;
