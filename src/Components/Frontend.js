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
  CardActions,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getItems } from "./api/posts";

const paperStyle = {
  padding: 7,
  height: "80vh",
  width: 420,
  margin: "20px",
};

const btnStyle = { bgcolor: "#FFA500", borderRadius: "20px" };

function Frontend() {
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    getItems()
      .then((val) => {
        console.log(val.data);
        setFoodItem(val.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  console.log(foodItem);
  return (
    <Container sx={{ bgcolor: "#fbfbfb", width: "100%", marginTop: 10 }}>
      <Grid container>
          <Grid item md={4} >
          <Paper sx={paperStyle}>
            <img
              src="https://davur.dexignzone.com/codeigniter/demo/public/assets/frontend/images/counter.jpg"
              alt="Error"
              width="300"
              height="200"
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
        {/* <Card
          variant="outlined"
          sx={{ minWidth: 175, height: 175, marginTop: 10 }}
        >
          <CardMedia
            component="img"
            width="60px"
            height="60px"
            image="https://davur.dexignzone.com/codeigniter/demo/public/assets/frontend/images/food-icon/5.png"
            alt="Error"
          />
          <CardContent>CHINEASE</CardContent>
        </Card> */}
       <Grid item md={8}>
          <Grid container spacing={3}>
            {/* Card 1 Start */}
            {foodItem.map((element) => {
              return (
                <Grid item xs={12} md={4} lg={4}>
                  <Card
                    sx={{
                      margin: 3,
                      fontSize: 12,
                      width: '100%',
                      height: 300,
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
                      <Typography gutterBottom variant="h5" component="div">
                        {element.name}
                      </Typography>
                      <Typography>{element.price}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            {/* Card 1 End */}
            </Grid>
            </Grid>
      </Grid>
    </Container>
  );
}

export default Frontend;
