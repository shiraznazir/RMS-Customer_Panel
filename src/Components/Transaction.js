import React from "react";
import { Box, Typography, Grid } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function createData(orderNo, name, amount, items, type, payment, updatedOn) {
  return { orderNo, name, amount, items, type, payment, updatedOn };
}

const rows = [
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
  createData(
    "BA85454",
    "Wiliam Franchi",
    "$120.00",
    2,
    "Dine-in",
    "Cash",
    "12 June 2020 12:30 pm"
  ),
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

function Transaction() {
  return (
    <Box sx={{ bgcolor: "#fafafa", width: "100%" }}>
      <Grid container>
        <Grid item md={6}>
          <Typography
            variant="h3"
            m={2}
            sx={{ color: "#3f4564", fontWeight: "bold" }}
          >
            Transaction
          </Typography>
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
      <TableContainer
        component={Paper}
        sx={{ marginLeft: 10, marginTop: 5, width: "90%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell sx={styleTableHead}>ORDER NO</TableCell>
              <TableCell align="left" sx={styleTableHead}>
                NAME
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                AMOUNT
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                ITEMS
              </TableCell>
              <TableCell align="left" sx={styleTableHead}>
                TYPE
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
                  {row.orderNo}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="left">{row.items}</TableCell>
                <TableCell align="left">{row.type}</TableCell>
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

export default Transaction;
