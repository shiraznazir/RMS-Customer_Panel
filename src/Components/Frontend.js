import {
  Button,
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { getCategories } from "./api/posts";
import { useSelector, useDispatch } from "react-redux";
import { setMenuItems } from "./store/reducer/menuItemsSlice";
import { setCart } from "./store/reducer/cartSlice";
import {
  getOrder,
  editOrder,
  getMenuItem,
  getOrderByUserId,
  deleteOrder,
} from "./api/posts";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { insertOrder } from "./api/posts";
import { selectUser } from "./store/reducer/userSlice";
import "../App.css";
import { useNavigate } from "react-router";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { padding } from "@mui/system";

const paperStyle = {
  padding: 5,
  paddingTop: 1,
  height: "70vh",
  margin: "15px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {
  let productIdData = [];

  const navigate = useNavigate();
  //const cart = useSelector((state) => state.cart.cart);
  const menuItems = useSelector((state) => state.menuItems.menuItems);
  const user = useSelector(selectUser);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  const fetchData = () => {
    getMenuItem()
      .then((val) => {
        //console.log(val.data);
        dispatch(setMenuItems(val.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect(()=>{
  //   getOrder().then((element)=>{
  //     console.log("Element", element.data);
  //   })
  // })
  const addToCart = (element) => {
    let data = {
      userId: user._id,
      productId: element._id,
      productQty: 1,
      status: 1,
      timeStamp: 1,
    };
    insertOrder(data)
      .then((res) => {
        // fetchCardData();
        if (res.data.status) {
          fetchOrderByUserId();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const decreaseQty = (e, element) => {
    e.preventDefault();
    if (element.productQty == 1) {
      deleteOrder(element._id).then((res) => {
        if (res.data.status) {
          fetchOrderByUserId();
        }
      });
    }
    if (element.productQty > 1) {
      let updateQty = { ...element, productQty: element.productQty - 1 };
      editOrder(element._id, updateQty).then((res) => {
        console.log("Res", res);
        fetchOrderByUserId();
      });
    }
  };

  const increaseQty = (e, element) => {
    e.preventDefault();
    // console.log("increaseQty: ", element);
    let updateQty = { ...element, productQty: element.productQty + 1 };
    editOrder(element._id, updateQty).then((res) => {
      console.log("Res", res);
      fetchOrderByUserId();
    });
  };

  const handleNext = () => {
    navigate("/cart");
  };

  const fetchCategories = () => {
    getCategories()
      .then((val) => {
        //console.log("Categories Items :- ", val.data);
        setCategories(val.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchOrderByUserId = () => {
    getOrderByUserId(user._id)
      .then((element) => {
        setCart(element.data);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchOrderByUserId();
  }, []);

  console.log("Cart In frntent>>>>>>>", cart);

  return (
    <Box sx={{ bgcolor: "#fbfbfb", width: "100%", position: "absolute" }}>
      <Grid container spacing={0}>
        {/* <Grid item md={4} sx={{ width: "100%" }}>
          <Paper sx={paperStyle}>
            <img
              src="https://davur.dexignzone.com/codeigniter/demo/public/assets/frontend/images/counter.jpg"
              alt="Error"
              height="200"
              width={"100%"}
            />
            <Typography variant="h6" fontWeight="bold" mt={3}>
              Your Order in Progress Check Order
            </Typography>
            <Typography mt={3} sx={{ color: "#808080" }}>
              Click on any item or Add Order Button to create order
            </Typography>
            <Stack direction="row" spacing={4} mt={4}>
              <Button variant="contained" p={4} sx={btnStyle}>
                Add Order
              </Button>
              <Button variant="contained" p={4} sx={btnStyle}>
                Order Status
              </Button>
            </Stack>
          </Paper>
        </Grid> */}
        <Grid item xs={12} md={8}>
          {/* categories */}
          {/* <Grid container spacing={2} sx={{ width: '100%', margin: "1px" }}>
            {categories.map((element, index) => {
              return (
                <Grid item xs={11.5} md={2.3} key={index + Math.random()}>
                  <Card
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                      fontSize: 8,
                      width: "100%",
                      bgcolor: "#fff",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={element.name}
                      image={element.image}
                      sx={{
                        width: "40%",
                        height: "100",
                        marginLeft: 6,
                        marginTop: 2,
                        alignItems: "center",
                      }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        align="center"
                        sx={{ color: "#373637" }}
                      >
                        {element.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid> */}
          {/* Search Bar */}
          <Box>
            <input id="inputField" type="text" placeholder="Search here..." />
            <SearchIcon
              sx={{ position: "absolute", right: "25px", marginTop: "-50px" }}
            />
          </Box>
          {/* food Items */}
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", margin: "5px", marginBottom: "70px" }}
          >
            {menuItems?.length &&
              menuItems?.map((element, index) => {
                let inCart = cart.filter((cartItem) => {
                  return cartItem.productId._id === element._id;
                });
                console.log("ddd>>>>", inCart[0]);
                return (
                  <Grid item xs={12} md={4} key={index + Math.random()}>
                    <Card
                      sx={{
                        fontSize: 12,
                        width: "95%",
                        height: 350,
                        bgcolor: "#fff",
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={element.menuImage}
                        height="200"
                        image={`http://localhost:9000/images/${element.menuImage}`}
                      />
                      <CardContent>
                        <Stack container="true" direction="row">
                          <Typography
                            gutterBottom
                            variant="h6"
                            fontWeight="bold"
                            component="div"
                          >
                            {element.name}
                          </Typography>
                          <Box
                            sx={{
                              marginLeft: 2,
                              color:
                                element.isVeg === "Veg" ? "#009900" : "#FF0000",
                            }}
                          >
                            <StopCircleOutlinedIcon />
                          </Box>
                        </Stack>

                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Grid container spacing={3}>
                              <Grid item xs={1}>
                                <CurrencyRupeeIcon fontSize="small" />
                              </Grid>
                              <Grid item xs={8}>
                                <Typography fontWeight="bold">
                                  {element.quaterPrice
                                    ? element.quaterPrice
                                    : element.price}{" "}
                                  for one
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            {/* Add to Cart Button */}
                            {inCart.length > 0 ? (
                              <>
                                <Box
                                  sx={{
                                    border: 1,
                                    bgcolor: "background.paper",
                                    m: 1,
                                    borderColor: "#FF0000",
                                    borderRadius: "1rem",
                                    width: "8rem",
                                    height: "2rem",
                                  }}
                                >
                                  <Grid container spacing={1}>
                                    <Grid
                                      item
                                      xs={4}
                                      sx={{
                                        marginTop: "4px",
                                        marginLeft: "4px",
                                      }}
                                    >
                                      <RemoveIcon
                                        onClick={(e) =>
                                          decreaseQty(e, inCart[0])
                                        }
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
                                        {inCart[0].productQty}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      align="right"
                                      item
                                      xs={4}
                                      sx={{ marginTop: "4px" }}
                                    >
                                      <AddIcon
                                        onClick={(e) =>
                                          increaseQty(e, inCart[0])
                                        }
                                        sx={{ color: "#FF0000" }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Box>
                                <Grid>
                                  <Box
                                    justify="center"
                                    sx={{
                                      position: "fixed",
                                      bottom: "55px",
                                      right: "10px",
                                      left: "10px",
                                      width: "88%",
                                      bgcolor: "#FF0000",
                                      borderRadius: "5px",
                                      padding: 1,
                                    }}
                                  >
                                    <Grid container spacing={2}>
                                      <Grid item xs={6}>
                                        <Typography
                                          sx={{
                                            marginLeft: "1px",
                                            color: "#ffffff",
                                            fontSize: "13px",
                                          }}
                                        >
                                          3 ITEMS
                                        </Typography>

                                        <Grid container spacing={0}>
                                          <Grid item xs={1.5}>
                                            <CurrencyRupeeIcon
                                              sx={{
                                                color: "#ffffff",
                                                fontSize: "1rem",
                                              }}
                                            />
                                          </Grid>
                                          <Grid item xs={8}>
                                            <Typography
                                              sx={{
                                                color: "#ffffff",
                                                fontSize: "13px",
                                              }}
                                            >
                                              496 plus taxes
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid align="right" item xs={5}>
                                        <Grid
                                          onClick={handleNext}
                                          container
                                          spacing={0}
                                        >
                                          <Grid align="right" item xs={11.5}>
                                            <Typography
                                              sx={{
                                                color: "#ffffff",
                                                marginTop: "8px",
                                              }}
                                            >
                                              Next
                                            </Typography>
                                          </Grid>
                                          <Grid align="right" item xs={0.5}>
                                            <ArrowRightIcon
                                              fontSize="medium"
                                              sx={{
                                                color: "#ffffff",
                                                marginTop: "8px",
                                              }}
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </Grid>
                              </>
                            ) : (
                              <Box
                                onClick={() => addToCart(element)}
                                sx={{
                                  border: 1,
                                  bgcolor: "background.paper",
                                  m: 1,
                                  borderColor: "#FF0000",
                                  borderRadius: "1rem",
                                  width: "8rem",
                                  height: "2rem",
                                }}
                              >
                                <Grid container spacing={1}>
                                  <Grid item xs={8}>
                                    <Typography
                                      align="right"
                                      fontWeight="bold"
                                      sx={{
                                        marginTop: "5px",
                                        color: "#FF0000",
                                      }}
                                    >
                                      ADD
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={4}>
                                    <AddIcon
                                      align="right"
                                      fontSize="small"
                                      sx={{ color: "#FF0000" }}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            )}
                            {element.portion && (
                              <Typography align="center">
                                Customisable
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Frontend;
