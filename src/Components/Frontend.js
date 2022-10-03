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
import "../App.css";

const paperStyle = {
  padding: 5,
  paddingTop: 1,
  height: "70vh",
  margin: "15px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {
  const items = useSelector((state) => state.items.items);

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const fetchData = () => {
    getItems()
      .then((val) => {
        //console.log(val.data);
        dispatch(setItems(val.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchCardData = () => {
    getCart()
      .then((val) => {
        dispatch(setCart(val.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addToCart = (element) => {
    insertItems(element)
      .then((res) => {
        fetchCardData();
      })
      .catch((err) => {
        console.log(err.message);
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

  // console.log("Items :- ", items);

  return (
    <Box sx={{ bgcolor: "#fbfbfb", width: "100%" }}>
      <Grid container spacing={0}>
        <Grid item md={4} sx={{ width: "100%" }}>
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
        </Grid>
        <Grid item md={8}>
          {/* categories */}
          <Grid container spacing={2} sx={{ width: '100%', margin: "1px" }}>
            {categories.map((element, index) => {
              return (
                <Grid item xs={11.5} md={2.3} key={index + Math.random()}>
                  <Card
                    alignItems="center"
                    justifyContent="center"
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
          </Grid>
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
            sx={{ width: "100%", margin: "5px", marginBottom: '70px' }}
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
                        alt={element.name}
                        height="200"
                        image={element.image}
                      />
                      <CardContent>
                        <Stack container="true" direction="row">
                          <Typography gutterBottom variant="h5" component="div">
                            {element.name}
                          </Typography>
                          <Box
                            sx={{
                              marginLeft: 2,
                              color: element.isVeg ? "#009900" : "#FF0000",
                            }}
                          >
                            <StopCircleOutlinedIcon />
                          </Box>
                        </Stack>
                        <Grid container spacing={3}>
                          <Grid item xs={7}>
                            <Typography variant="h5">
                              {element.price}
                            </Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Button
                              variant="contained"
                              onClick={() => addToCart(element)}
                              sx={{ bgcolor: "#006400" }}
                            >
                              Add <AddIcon />{" "}
                            </Button>
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
