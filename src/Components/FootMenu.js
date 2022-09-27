import React from 'react';
import { Grid, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Cart from './Cart';
import Profile from './Profile';
import Orders from './Orders';
import { Link, Routes, Route } from "react-router-dom";

const styleLink = { margin: 1.5, color: '#fff' }

function FootMenu() {
  return (
    <Box>
      <AppBar position="fixed" sx={{ bgcolor: "#ff9999", height: '60px', top: 'auto', bottom: -10, zIndex: 12 }}>
        <Grid container spacing={3} >
          <Grid item xs={3} >
            <Link to='/'><HomeIcon fontSize='medium' sx={styleLink} /></Link>
          </Grid>
          <Grid item xs={3} >
            <Link to='/cart' ><ShoppingCartIcon fontSize='medium' sx={styleLink} /> </Link>

          </Grid>
          <Grid item xs={3} >
            <Link to='/orders'><Inventory2Icon fontSize='medium' sx={styleLink} /></Link>

          </Grid>
          <Grid item xs={3}>
            <Link to='/profile'>
              <AccountCircleIcon fontSize='medium' sx={styleLink} />
            </Link>
          </Grid>
        </Grid>
      </AppBar>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </Box>
  )
}

export default FootMenu