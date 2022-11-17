import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getOrderByStatusByUser } from "./api/posts";
import { selectUser } from "./store/reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const styleTableHead = {
  fontWeight: "bold",
  fontSize: 10,
  color: "#010100",
  width: "100%",
};

function Orders() {
  const user = useSelector(selectUser);
  //   console.log("Usr id>>>>>", user);
  const [orders, setOrders] = useState();

  const fectchDataByStatus = () => {
    getOrderByStatusByUser(user._id)
      .then((res) => {
        // console.log("Order List data>>", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    fectchDataByStatus();
  }, []);

  //   console.log("User deatils order list >>>>>>", orders);

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        width: "100%",
        marginBottom: "50px",
        marginTop: "10px",
      }}
    >
      {/* <Grid container>
                <Grid item md={6}> */}
      <Typography
        variant="h6"
        m={2}
        sx={{ color: "#3f4564", fontWeight: "bold" }}
      >
        Orders
      </Typography>
      {/* </Grid>
                <Grid item md={6}> */}
      <Typography m={2}>Here is your order list data</Typography>
      {/* </Grid>
            </Grid> */}
      {/* Table */}
      {/* <TableContainer
        component={Paper}
        sx={{ marginLeft: 1, marginTop: 5, width: "97%" }}
      >
        <Table sx={{ width: "100%" }} aria-label="caption table">
          
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={styleTableHead}>
                ORDER ID
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                AMOUNT
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                ORDER NAME
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                STATUS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="left">{order.id}</TableCell>
                <TableCell align="left">{order.totalProductPrice}</TableCell>
                <TableCell align="left">{order.productId.name}</TableCell>
                <TableCell align="left">
                  {order.status === 3
                    ? "Order Accepted"
                    : order.status === 4
                    ? "Preparation"
                    : order.status === 5
                    ? "Ready to deliver"
                    : "Delivered"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Grid container spacing={1}>
        {orders?.map((element, index) => {
          console.log("Check>>>>>", element);
          return (
            <Grid item xs={12} key={index + Math.random()}>
              <Card
                sx={{
                  fontSize: 12,
                  ml: "10px",
                  width: "95%",
                  bgcolor: "#fff",
                }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      alt={element.menuImage}
                      sx={{ p: 2, width: "20vw", borderRadius: 5 }}
                      height="70vh"
                      image={`http://localhost:9000/images/${element.productId.menuImage}`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" sx={{ pt: 1, fontWeight: "bold" }}>
                      {element.productId.name}
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={10}>
                        <Typography
                          sx={{ fontWeight: "bold", color: "#808080" }}
                        >
                          {element.qty}
                          {element.productFull
                            ? " x Full"
                            : element.productHalf
                            ? " x Half"
                            : element.productQuater
                            ? " x Quater"
                            : ""}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography align="right">{element.timeStamp}</Typography>
                      </Grid>
                    </Grid>

                    <Typography>
                      {element.status === 3
                        ? "Order Accepted"
                        : element.status === 4
                        ? "Preparation"
                        : "Ready to Deliver"}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <RadioButtonCheckedIcon
                      sx={{
                        pt: 1,
                        color:
                          element.productId.isVeg == "Veg"
                            ? "#00FF00"
                            : "#FF0000",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    {/* <Typography sx={{ pl: 2 }}>Quantity : </Typography> */}
                  </Grid>
                  <Grid align="left" item xs={1}>
                    {/* <Typography sx={{ fontWeight: "bold", color: "#808080" }}>
                      {element.qty}
                    </Typography> */}
                  </Grid>
                  <Grid item xs={2}>
                    {/* <Typography>{element}</Typography> */}
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Orders;
