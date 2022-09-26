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
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { getItems } from "./api/posts";
import { insertItems } from './api/posts';
import { getCategories } from "./api/posts";
import { getCart } from './api/posts';
import { useSelector, useDispatch } from "react-redux";
import { setItems } from './store/reducer/itemsSlice';
import { setCart } from "./store/reducer/cartSlice";
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import "../App.css";

const paperStyle = {
  padding: 5,
  paddingTop: 1,
  height: {
    md: "60vh",
    xs: "70vh",
  },
  width: {
    md: "40vw",
    xs: "70vw",
  },
  marginLeft: "13px",
  marginTop: "80px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {

  const items = useSelector((state) => state.items.items)

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const fetchData = () => {
    getItems()
      .then((val) => {
        console.log(val.data);
        dispatch(setItems(val.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const fetchCardData = () => {
    getCart().then((val) => {
      dispatch(setCart(val.data));
    }).catch((err) => {
      console.log(err.message);
    })
  }

  const addToCart = (element) => {
    insertItems(element).then((res) => {
      fetchCardData();
    }).catch((err) => {
      console.log(err.message);
    })
  }

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
    fetchData()
    // fetchCardData();
  }, []);

  // console.log("Items :- ", items);

  return (
    <Box sx={{ bgcolor: "#fbfbfb", width: "100%" }}>
      <Grid container spacing={0} sx={{ width: "100%" }}>
        <Grid item md={3} xs={1}>
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
        <Grid item md={9}>
          {/* categories */}
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: 5, marginTop: 2, marginLeft: { md: 15 } }}
          >
            {categories.map((element) => {
              return (
                <Grid item xs={12} md={2}>
                  <Card
                    align="center"
                    sx={{
                      marginLeft: "13px",
                      fontSize: 12,
                      width: "90vw",
                      height: {
                        md: 140,
                        xs: 200,
                      },
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
          <Box>
            <input id="inputField" type="text" placeholder="Search here..." />
            <SearchIcon
              sx={{ position: "absolute", right: "30px", marginTop: "8px" }}
            />
          </Box>
          {/* food Items */}
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "20px", marginLeft: "13px" }}
          >
            {items?.length && items?.map((element) => {
              return (
                <Grid item xs={12} md={4}>
                  <Card
                    sx={{
                      marginLeft: { sx: 7, md: 10 },
                      fontSize: 12,
                      width: "90%",
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
                      <Stack container direction='row'>
                        <Typography gutterBottom variant="h5" component="div">
                          {element.name}
                        </Typography>
                        <Box sx={{ marginLeft: 2, color: element.isVeg ? "#009900" : "#FF0000" }} >
                          <StopCircleOutlinedIcon />
                        </Box>
                      </Stack>
                      <Grid container spacing={3}>
                        <Grid item xs={8}>
                          <Typography variant="h5">{element.price}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Button variant="contained" onClick={() => addToCart(element)} sx={{ bgcolor: '#006400' }} >Add <AddIcon /> </Button>
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
    </Box >
  );
}

export default Frontend;
