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
    if (element.productQty == 1) {
      deleteOrder(element._id).then((res) => {
        if (res.data.status) {
          fetchOrderByUserId();
        }
      });
      navigate("/cart");
    }
    if (element.productQty > 1) {
      let price =
        element.productId.price > 0
          ? element.productId.price
          : element.productId.quaterPrice;
      let updateQty = {
        ...element,
        productQty: element.productQty - 1,
        totalProductPrice: element.totalProductPrice - price,
      };
      editOrder(element._id, updateQty).then((res) => {
        console.log("Res", res);
        fetchOrderByUserId();
      });
    }
  };

  const increaseQty = (e, element) => {
    e.preventDefault();
    let price =
      element.productId.price > 0
        ? element.productId.price
        : element.productId.quaterPrice;
    let updateQty = {
      ...element,
      productQty: element.productQty + 1,
      totalProductPrice: element.totalProductPrice + price,
    };
    editOrder(element._id, updateQty).then((res) => {
      console.log("Res", res);
      fetchOrderByUserId();
    });
  };

  const fetchOrderByUserId = () => {
    getOrderByUserId(user._id)
      .then((element) => {
        let totalAmount = 0;
        element.data.map((ele) => {
          totalAmount += ele.totalProductPrice;
        });
        setCart({ data: element.data, totalPrice: totalAmount });
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    fetchOrderByUserId();
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
            return (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography sx={{ margin: 1.5 }}>
                    {element.productId.name}
                  </Typography>
                  <Stack container direction="row" sx={{ margin: 1.5 }}>
                    <CurrencyRupeeIcon sx={{ fontSize: "1rem" }} />
                    <Typography sx={{ marginTop: "-3px" }}>
                      {element.productId.price
                        ? element.productId.price
                        : element.productId.quaterPrice}
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
                        <Typography fontWeight="bold">
                          {element.productQty}
                        </Typography>
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
        <Typography fontWeight="bold" sx={{ margin: 1.5 }}>
          Check Out
        </Typography>
      </Card>
      {/* </Paper> */}
    </Box>
  );
}

export default Cart;
