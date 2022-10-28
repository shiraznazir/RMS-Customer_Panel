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
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import { getCategories } from "./api/posts";
import { useSelector, useDispatch } from "react-redux";
import { setMenuItems } from "./store/reducer/menuItemsSlice";
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
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import CancelIcon from "@mui/icons-material/Cancel";
import Popover from "@mui/material/Popover";
import { padding } from "@mui/system";

const paperStyle = {
  padding: 5,
  paddingTop: 1,
  height: "70vh",
  margin: "15px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {
  const navigate = useNavigate();
  //const cart = useSelector((state) => state.cart.cart);
  const menuItems = useSelector((state) => state.menuItems.menuItems);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState({
    fullPrice: 0,
    halfPrice: 0,
    quaterPrice: 0,
  });
  const [qty, setQty] = useState({
    fullQty: 1,
    halfQty: 1,
    quaterQty: 1,
  });
  const [visibleQty, setVisibleQty] = useState({
    fullQty: false,
    halfQty: false,
    quaterQty: false,
  });
  const [cart, setCart] = useState({ data: [], totalPrice: 0, totalItems: 0 });
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log("Frontent>>>>>>>>>>>>>>>>>", visibleQty);

  // const handlePortionPrice = (val) => {
  //   setPrice(val);
  //   console.log(">>>>>>>>>>>", price);
  // };

  const portionPopover = (element) => {
    setAnchorEl(element);
    setPrice({
      fullPrice: element.fullPrice,
      halfPrice: element.halfPrice,
      quaterPrice: element.quaterPrice,
    });
    // console.log(">>>>>>>>>>>>>", price);
  };

  console.log(">>>>>>>>>>>", price);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    if (element.portion) {
      portionPopover(element);
    }

    let data = {
      userId: user._id,
      productId: element._id,
      productFullQty: 1,
      productHalfQty: 0,
      productQuaterQty: 0,
      totalProductPrice: element.price ? element.price : element.fullPrice,
      status: 1,
      timeStamp: 1,
    };

    insertOrder(data)
      .then((res) => {
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
    if (element.productFullQty == 1) {
      deleteOrder(element._id).then((res) => {
        if (res.data.status) {
          fetchOrderByUserId();
        }
      });
    }
    if (element.productFullQty > 1) {
      let price =
        element.productId.price > 0
          ? element.productId.price
          : element.productId.quaterPrice;
      let updateQty = {
        ...element,
        productFullQty: element.productFullQty - 1,
        totalProductPrice: element.totalProductPrice - price,
      };
      editOrder(element._id, updateQty).then((res) => {
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
      productFullQty: element.productFullQty + 1,
      totalProductPrice: element.totalProductPrice + price,
    };

    editOrder(element._id, updateQty).then((res) => {
      fetchOrderByUserId();
    });
  };

  const decreaseQtyAtPanel = (e, element) => {
    e.preventDefault()
    if (qty.fullQty === 1 && qty.halfQty === 1 && qty.quaterQty === 1) {
      setAnchorEl(null);
    }
    // console.log("111111111111>>>>>>>>>>>", element);
    if (visibleQty.fullQty) {
      setQty({ ...qty, fullQty: qty.fullQty - 1 });
      setPrice({...price, fullPrice: price.fullPrice - element.productId.fullPrice});
    } else if (visibleQty.halfQty) {
      setQty({ ...qty, halfQty: qty.halfQty - 1 });
      setPrice({...price, halfPrice: price.halfPrice - element.productId.halfPrice});
    } else if (visibleQty.quaterQty) {
      setQty({ ...qty, quaterQty: qty.quaterQty - 1 });
      setPrice({...price, quaterPrice: price.quaterPrice - element.productId.fullPrice});
    }
  };

  const increaseQtyAtPanel = (e, element) => {
    console.log("<>>>>>>>>>>>>>>");
    if (visibleQty.fullQty) {
      setQty({ ...qty, fullQty: qty.fullQty + 1 });
      setPrice({...price, fullPrice: price.fullPrice + element.productId.fullPrice});
    } else if (visibleQty.halfQty) {
      setQty({ ...qty, halfQty: qty.halfQty + 1 });
      setPrice({...price, halfPrice: price.halfPrice + element.productId.halfPrice});
    } else if (visibleQty.quaterQty) {
      setQty({ ...qty, quaterQty: qty.quaterQty + 1 });
      setPrice({...price, quaterPrice: price.quaterPrice + element.productId.fullPrice});
    }
  };

  const handleNext = () => {
    navigate("/cart");
  };

  const fetchCategories = () => {
    getCategories()
      .then((val) => {
        setCategories(val.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchOrderByUserId = () => {
    // console.log("Ck>>>>>>>>", user._id);
    getOrderByUserId(user._id)
      .then((element) => {
        let totalAmount = 0;
        let totalItems = 0;
        element.data.map((ele) => {
          totalItems += ele.productFullQty;
          totalAmount += ele.totalProductPrice;
        });
        setCart({
          data: element.data,
          totalPrice: totalAmount,
          totalItems: totalItems,
        });
      })
      .catch((err) => {
        console.log("Error ", err);
      });
    // console.log("po>>>>>>>", cart);
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchOrderByUserId();
  }, []);

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
                let inCart = cart.data.filter((cartItem) => {
                  return cartItem.productId._id === element._id;
                });
                //console.log("ddd>>>>", inCart[0]);
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
                                        {inCart[0].productFullQty}
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
                              </>
                            ) : (
                              <Box
                                aria-describedby={id}
                                onClick={() => {
                                  addToCart(element);
                                }}
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
      {/* Summary List */}
      <Grid>
        {cart.data.length > 0 && (
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
                  {cart.totalItems} ITEMS
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
                      {cart.totalPrice} plus taxes
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid align="right" item xs={5}>
                <Grid onClick={handleNext} container spacing={0}>
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
        )}
      </Grid>
      <Grid>
        {/* <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ width: "100%", left: "-16px", top: "30%" }}
          fullWidth
        >
          <CardMedia
            sx={{ m: 2, width: "90%" }}
            component="img"
            alt={anchorEl?.menuImage}
            height="200"
            image={`http://localhost:9000/images/${anchorEl?.menuImage}`}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography fontWeight="bold" sx={{ p: 2 }}>
                {anchorEl?.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
        </Popover> */}
        {cart.data.map((cartItem) => {
          if (cartItem.productId._id === anchorEl?._id) {
            // console.log("cartItem : ", cartItem);
            return (
              <>
                <Dialog
                  fullWidth
                  sx={{
                    position: "absolute",
                    width: "116%",
                    margin: "-32px",
                    borderRadius: "30px",
                    top: "11%",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <CancelIcon
                    onClick={handleClose}
                    sx={{
                      position: "relative",
                      overflow: "visible",
                      left: "45%",
                    }}
                    align="center"
                    fontSize="large"
                  />
                  <CardMedia
                    sx={{ p: 2, width: "90%", borderRadius: "25px" }}
                    component="img"
                    alt={anchorEl?.menuImage}
                    height="200"
                    image={`http://localhost:9000/images/${anchorEl?.menuImage}`}
                  />
                  <RadioButtonCheckedIcon
                    sx={{
                      ml: 2,
                      color: anchorEl?.isVeg === "Veg" ? "#009900" : "#FF0000",
                    }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <Typography fontWeight="bold" sx={{ p: 2 }}>
                        {anchorEl?.name}
                      </Typography>
                    </Grid>
                    <Grid align="right" item xs={2}>
                      <FavoriteBorderIcon />
                    </Grid>
                    <Grid align="left" item xs={2}>
                      <ShareIcon />
                    </Grid>
                  </Grid>
                  <Divider />
                  <Grid container spacing={2}>
                    <Grid sx={{ m: 2 }} item xs={6}>
                      <Typography fontWeight="bold">Quantity</Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        Select 1 out of 3 options
                      </Typography>
                    </Grid>
                    <Grid align="right" sx={{ mt: 3 }} item xs={4}>
                      <Box
                        sx={{
                          p: 0.3,
                          width: "50%",
                          height: "14px",
                          borderRadius: "5px",
                          border: "1px solid red",
                        }}
                      >
                        <Typography sx={{ fontSize: "10px", color: "#FF0000" }}>
                          REQUIRED
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={cartItem?.productId.fullPrice}
                    name="radio-buttons-group"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: "15px", pl: 2, pb: 3 }}>
                          Full
                        </Typography>
                      </Grid>
                      <Grid align="right" item xs={4}>
                        <Stack direction="row" spacing={0}>
                          <CurrencyRupeeIcon
                            sx={{ fontSize: "15px", mt: "3px" }}
                          />
                          <Typography sx={{ fontSize: "15px" }}>
                            {cartItem?.productId.fullPrice}
                          </Typography>
                          <FormControlLabel
                            onClick={(e) => {
                              // setPrice(e.target.value);
                              setVisibleQty({
                                ...visibleQty,
                                fullQty: true,
                                halfQty: false,
                                quaterQty: false,
                              });
                              // setQty({...qty, fullQty: qty.fullQty + 1 })
                            }}
                            value={cartItem?.productId.fullPrice}
                            control={<Radio />}
                            sx={{ fontSize: "15px", mt: -1.2, ml: "1px" }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: "15px", pl: 2, pb: 3 }}>
                          Half
                        </Typography>
                      </Grid>
                      <Grid align="right" item xs={4}>
                        <Stack direction="row" spacing={0}>
                          <CurrencyRupeeIcon
                            sx={{ fontSize: "15px", mt: "3px" }}
                          />
                          <Typography sx={{ fontSize: "15px" }}>
                            {cartItem?.productId.halfPrice}
                          </Typography>
                          <FormControlLabel
                            onClick={(e) => {
                              // setPrice(e.target.value);
                              setVisibleQty({
                                ...visibleQty,
                                fullQty: false,
                                halfQty: true,
                                quaterQty: false,
                              });
                              // setQty({...qty, halfQty: qty.halfQty + 1 })
                            }}
                            value={cartItem?.productId.halfPrice}
                            control={<Radio />}
                            sx={{ fontSize: "15px", mt: -1.2, ml: "1px" }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography sx={{ fontSize: "15px", pl: 2, pb: 3 }}>
                          Quater
                        </Typography>
                      </Grid>
                      <Grid align="right" item xs={4}>
                        <Stack direction="row" spacing={0}>
                          <CurrencyRupeeIcon
                            sx={{ fontSize: "15px", mt: "3px" }}
                          />
                          <Typography sx={{ fontSize: "15px" }}>
                            {cartItem?.productId.quaterPrice}
                          </Typography>
                          <FormControlLabel
                            onClick={(e) => {
                              // setPrice(e.target.value);
                              setVisibleQty({
                                ...visibleQty,
                                fullQty: false,
                                halfQty: false,
                                quaterQty: true,
                              });
                              // setQty({...qty, quaterQty: qty.quaterQty + 1 })
                            }}
                            value={cartItem?.productId.quaterPrice}
                            control={<Radio />}
                            sx={{ fontSize: "15px", mt: -1.2, ml: "1px" }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                  <Divider sx={{ fontWeight: "bold" }} />

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Box
                        sx={{
                          border: 1,
                          bgcolor: "background.paper",
                          m: 1,
                          borderColor: "#FF0000",
                          borderRadius: "10px",
                          width: "6rem",
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
                              onClick={(e) => decreaseQtyAtPanel(e, cartItem)}
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
                              {visibleQty.fullQty
                                ? qty.fullQty
                                : visibleQty.halfQty
                                ? qty.halfQty
                                : qty.quaterQty}
                            </Typography>
                          </Grid>
                          <Grid
                            align="right"
                            item
                            xs={4}
                            sx={{ marginTop: "4px" }}
                          >
                            <AddIcon
                              onClick={(e) => increaseQtyAtPanel(e, cartItem)}
                              sx={{ color: "#FF0000" }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Button
                        variant="contained"
                        sx={{
                          width: "90%",
                          height: "2rem",
                          m: 1,
                          bgcolor: "#FF0000",
                        }}
                      >
                        <Typography>Add Item</Typography>
                        <CurrencyRupeeIcon fontSize="25px" />
                        <Typography>
                          {visibleQty.fullQty
                            ? price.fullPrice
                            : visibleQty.halfQty
                            ? price.halfPrice
                            : price.quaterPrice}
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Dialog>
                ;
              </>
            );
          }
        })}

        {/* <Box
          justify="center"
          sx={{
            position: "fixed",
            bottom: "55px",
            right: "1px",
            left: "1px",
            width: "100%",
            bgcolor: "#ffffff",
            borderRadius: "5px",
            padding: 1,
          }}
        >
          jkjnjdnnj
        </Box> */}
      </Grid>
    </Box>
  );
}

export default Frontend;
