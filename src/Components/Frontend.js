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
import { getItems } from "./api/posts";
import { insertItems } from "./api/posts";
import { getCategories } from "./api/posts";
import { getCart } from "./api/posts";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "./store/reducer/itemsSlice";
import { setCart } from "./store/reducer/cartSlice";
import { getOrder, editOrder } from "./api/posts";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { insertOrder } from "./api/posts";
import { selectUser } from "./store/reducer/userSlice";
import "../App.css";
import { useNavigate } from "react-router";
import RemoveIcon from "@mui/icons-material/Remove";

const paperStyle = {
  padding: 5,
  paddingTop: 1,
  height: "70vh",
  margin: "15px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const items = useSelector((state) => state.items.items);
  const user = useSelector(selectUser);
  const [categories, setCategories] = useState([]);
  const [currOrder, setCurrOrder] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const fetchData = () => {
    getItems(user._id)
      .then((val) => {
        //console.log(val.data);
        dispatch(setItems(val.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(()=>{
    getOrder().then((element)=>{
      console.log("Element", element.data);
    })
  })
  const addToCart = (element) => {
    setVisible(true);
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
          setCurrOrder(res.data.item._id)
         // console.log("Inserted >>>>>>", res.data.item._id);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const decreaseQty = (e, element) => {
    e.preventDefault();
    if (element.productQty > 1) {
      let updateQty = { ...element, productQty: element.productQty - 1 };
      editOrder(element._id, updateQty).then((res) => {
        console.log("Res", res);
      });
    }
  };

  const increaseQty = (e, element) => {
    e.preventDefault();
    let updateQty = { ...element, productQty: element.productQty + 1 };
    editOrder(element._id, updateQty).then((res) => {
      console.log("Res", res);
    });
  };

  useEffect(() => {
    getCategories()
      .then((val) => {
        //console.log("Categories Items :- ", val.data);
        setCategories(val.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
    // fetchCardData();
  }, []);
  console.log("currOrder>>>>>add>>", currOrder);
  return (
    <Box sx={{ bgcolor: "#fbfbfb", width: "100%" }}>
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
            {items?.length &&
              items?.map((element, index) => {
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
                            {!currOrder && <Box
                            onClick={()=> addToCart(element)}
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
                                    sx={{ marginTop: "5px", color: "#FF0000" }}
                                  >
                                    ADD
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <AddIcon align="right" fontSize="small" sx={{color: "#FF0000" }} />
                                </Grid>
                              </Grid>
                            </Box>}
                            {/* Quantity */}
                            { currOrder && <Box
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
                                  sx={{ marginTop: "4px", marginLeft: "4px" }}
                                >
                                  <RemoveIcon onClick={(e)=>decreaseQty(e)} sx={{ color: "#FF0000" }} />
                                </Grid>
                                <Grid
                                  align="center"
                                  item
                                  xs={3}
                                  sx={{ marginTop: "4px" }}
                                >
                                  <Typography>12</Typography>
                                </Grid>
                                <Grid align='right' item xs={4} sx={{ marginTop: "4px" }}>
                                  <AddIcon sx={{ color: "#FF0000" }} />
                                </Grid>
                              </Grid>
                            </Box>}
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
