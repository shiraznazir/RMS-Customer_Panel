import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";

const cardStyle = {
  padding: 5,
  width: "20%",
  height: "350px",
  marginTop: "20px",
  borderRadius: "15px",
};

function OrderStatus() {
  return (
    <Box
      sx={{ width: "100%", margin: "0px", padding: "0px", bgcolor: "#efefef" }}
    >
      <Card sx={cardStyle}>
        <Box
          sx={{
            width: "140%",
            height: "15vh",
            margin: "-40px",
            padding: "20px",
            bgcolor: "#f62b50",
          }}
        >
          <Grid container spacing={3} >
            <Grid item md={7.5}>
              <Typography
                variant="h6"
                sx={{ color: "#fff" }}
              >
                Dine-in
              </Typography>
              <Typography sx={{ color: "#fff", marginTop: 2 }}>AB00121</Typography>
            </Grid>
            <Grid item md={2.5}>
              <Typography variant="h5" sx={{marginTop:2, color: "#fff", fontWeight: "bold" }}>08:49</Typography>
            </Grid>
          </Grid>
        </Box>
        {/* <Typography>1 Momos masala</Typography> */}
      </Card>
    </Box>
  );
}

export default OrderStatus;
