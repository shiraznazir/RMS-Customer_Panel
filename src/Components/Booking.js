import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Table, Stack } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(date, time, customer, note,updatedOn) {
  return { date, time, customer, note,updatedOn };
}

const rows = [
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
  createData("12 June 2020", "11:30 am", "Emilia Johnson", "My Anniversary", "12 June 2020 12:30 pm"),
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const styleTableHead = { fontWeight: "bold", fontSize: 20, color: "#010100" };

function Booking() {
  return (
    <Box sx={{ bgcolor: "#fafafa", width: "100%" }}>
      <Grid container>
        <Grid item md={6}>
          <Stack container direction="row" spacing={2}>
            <Typography
              variant="h3"
              m={2}
              sx={{ color: "#3f4564", fontWeight: "bold" }}
            >
              Booking
            </Typography>
            <Button
              variant="contained"
              sx={{ margin:'20px', bgcolor: "#2ac155", height:1,padding: 2,  borderRadius: "20px" }}
            >
              Book New
            </Button>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Search>
        </Grid>
      </Grid>
      {/* Table */}
      <TableContainer component={Paper} sx={{ margin: 5, width: "90%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell sx={styleTableHead}>DATE</TableCell>
              <TableCell align="left" sx={styleTableHead}>
                TIME
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                CUSTOMER
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                NOTE
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                UPDATED ON
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="left">{row.time}</TableCell>
                <TableCell align="left">{row.customer}</TableCell>
                <TableCell align="left">{row.note}</TableCell>
                <TableCell align="left">{row.updatedOn}</TableCell>
                <TableCell align="left">
                  <EditIcon />
                  <DeleteIcon sx={{ color: "red", marginLeft: "20px" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Booking;
