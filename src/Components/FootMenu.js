import React from 'react'
import { Typography, Box } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function FootMenu() {
  return (
    <Box>
        <AppBar position="fixed" sx={{ bgcolor: "#ff9999", height: '60px', top: 'auto', bottom: 0, zIndex: 12 }}>
          <HomeIcon fontSize='large' sx={{margin: 1.5}} />
          <ShoppingCartIcon fontSize='large' sx={{margin: 1.5}} />
        </AppBar>
    </Box>
  )
}

export default FootMenu