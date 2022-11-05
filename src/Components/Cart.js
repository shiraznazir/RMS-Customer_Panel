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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router";
import { selectUser } from "./store/reducer/userSlice";

function Cart() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [cart, setCart] = useState({ data: [], totalPrice: 0 });

  const decreaseQty = (e, element) => {
    e.preventDefault();
    if (element.qty > 1) {
      let updatePrice =
      element.productFull
      ? element.productId.fullPrice
      : element.productHalf
      ? element.productId.halfPrice
      : element.productQuater
      ? element.productId.quaterPrice
      : element.productId.price
      let updateQty = {
        ...element,
        qty: element.qty - 1,
        totalProductPrice: element.totalProductPrice - updatePrice,
      };
      editOrder(element._id, updateQty).then((res) => {
        console.log("Res", res);
        fetchOrderByStatus();
      });
    }else{
      deleteOrder(element._id).then((res) => {
        console.log("Check ");
        if (res.data.status) {
          fetchOrderByStatus();
        }
      });
      navigate("/cart");
    }
  };

  const increaseQty = (e, element) => {
    // console.log("Decrease Check>>>>>>>", element);
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
      console.log("Res", res);
      fetchOrderByStatus();
    });
  };

  const handlePayment = (cartItems, statusID) =>{
    console.log("Check Pay Later>>>>>>>>>", cartItems);
    cartItems.data.map((element)=>{
      let update = {
        ...element,
        status: statusID
      };
      editOrder(element._id, update).then((res) => {
        console.log("Res", res);
        fetchOrderByStatus();
      });
    })
  }

  const fetchOrderByStatus = () =>{
    getOrderByStatus({userId: user._id, status: 0 }).then((res)=>{
      console.log("KKKKKKK>>>>>>>", res.data);
      let totalAmount = 0;
        res.data.map((ele) => {
          totalAmount += ele.totalProductPrice;
        });
        setCart({ data: res.data, totalPrice: totalAmount });
    })
  } 

  // const fetchOrderByUserId = () => {
  //   getOrderByUserId(user._id)
  //     .then((element) => {
  //       let totalAmount = 0;
  //       element.data.map((ele) => {
  //         totalAmount += ele.totalProductPrice;
  //       });
  //       setCart({ data: element.data, totalPrice: totalAmount });
  //     })
  //     .catch((err) => {
  //       console.log("Error ", err);
  //     });
  // };

  useEffect(() => {
    // fetchOrderByUserId();
    fetchOrderByStatus();
  }, []);
  console.log("Cart>>>>>>>>>>>>>", cart);
  return (
    <Box width="90%" sx={{ marginBottom: "70px" }}>
      {/* <Paper> */}
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
          Your Cart
        </Typography>
        {cart.data.length > 0 &&
          cart.data.map((element) => {
            console.log("My cart>>>>>>", element);
            return (
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
                </Grid>
                <Grid item xs={5} sx={{ margin: 1.5 }}>
                  <Box
                    sx={{
                      border: 1,
                      bgcolor: "background.paper",
                      m: 1,
                      borderColor: "#FF0000",
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
                          sx={{ color: "#FF0000" }}
                        />
                      </Grid>
                      <Grid
                        align="center"
                        item
                        xs={3}
                        sx={{ marginTop: "4px" }}
                      >
                        <Typography fontWeight="bold">{element.qty}</Typography>
                      </Grid>
                      <Grid item xs={4} sx={{ marginTop: "4px" }}>
                        <AddIcon
                          onClick={(e) => {
                            increaseQty(e, element);
                          }}
                          sx={{ color: "#FF0000" }}
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
            );
          })}
      </Card>
      {/* Bill Summary */}
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
      {/* Check Out */}
      <Card
        justify="center"
        sx={{
          fontSize: 12,
          width: "100%",
          bgcolor: "#fff",
          margin: 2,
        }}
      >
        <Typography onClick={()=>handlePayment(cart, 1)} fontWeight="bold" sx={{ margin: 1.5 }}>
          Pay At Resturant
        </Typography>
      </Card>
      <Card
        justify="center"
        sx={{
          fontSize: 12,
          width: "100%",
          bgcolor: "#fff",
          margin: 2,
        }}
      >
        <Typography onClick={()=>handlePayment(cart, 2)} fontWeight="bold" sx={{ margin: 1.5 }}>
          Proceed to Check Out
        </Typography>
      </Card>
      {/* </Paper> */}
    </Box>
  );
}

export default Cart;
