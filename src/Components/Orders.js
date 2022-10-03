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

function createData(orderId, amount, description, status) {
    return { orderId, amount, description, status };
}

const rows = [
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    ),
    createData(
        "BA85454",
        "$120.00",
        "Paneer",
        "Pending"
    )
];




const styleTableHead = { fontWeight: "bold", fontSize: 10, color: "#010100", width: '100%' };

function Orders() {
    return (
        <Box sx={{ bgcolor: "#fafafa", width: "100%", marginBottom: '50px' }}>
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
                    <Typography m={2} >
                        Here is your order list data
                    </Typography>
                {/* </Grid>
            </Grid> */}
            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{ marginLeft: 1, marginTop: 5, width: "97%" }}
            >
                <Table sx={{ width: '100%' }} aria-label="caption table">
                    <caption>A basic table example with a caption</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={styleTableHead}>ORDER ID</TableCell>
                            <TableCell align="left" sx={styleTableHead}>
                                AMOUNT
                            </TableCell>
                            <TableCell align="left" sx={styleTableHead}>
                                DESCRIPTION
                            </TableCell>
                            <TableCell align="left" sx={styleTableHead}>
                                STATUS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.orderId}
                                </TableCell>
                                <TableCell align="left">{row.amount}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Orders;
