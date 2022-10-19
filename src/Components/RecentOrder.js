import React, { useEffect } from 'react';
import { Box, Paper, Grid, Card, CardContent, CardMedia, Stack, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from "./store/reducer/cartSlice";
// import { getCart } from './api/posts';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function RecentOrder() {

  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  // const fetchCardData = () => {
  //   getCart().then((val) => {
  //     dispatch(setCart(val.data));
  //   }).catch((err) => {
  //     console.log(err.message);
  //   })
  // }

  // useEffect(() => {
  //   fetchCardData();
  // }, [])

  // console.log("Cart:- ", cart);

  return (
    <Box width='90%' sx={{ marginTop: '70px', marginBottom: '70px' }}>
      {/* <Paper> */}
      {/* <Grid
        container
        spacing={1}
        sx={{ marginTop: "20px", marginLeft: "13px" }}
      >
        {cart.length > 0 && cart.map((element) => {
          return (
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  marginLeft: { sx: 10, md: 10 },
                  fontSize: 12,
                  width: "98%",
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
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={7}>
                      <Typography variant="h6">{element.price}</Typography>
                    </Grid>
                    <Grid item xs={5} >
                      <Button variant='contained' sx={{ bgcolor: 'red' }} >Delete</Button>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={1} ><RemoveCircleOutlineIcon /></Grid> 
                    <Grid item xs={1} fontSize='bold' ><Typography variant='h6' sx={{marginTop: '-4px', marginLeft: '5px'}}>2</Typography></Grid>
                    <Grid item xs={1} ><ControlPointIcon /></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid> */}
      {/* </Paper> */}
    </Box >
  )
}

export default RecentOrder