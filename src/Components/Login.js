import {
    Grid,
    Paper,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from 'react'

const paperStyle = {
    padding: 40,
    height: "50vh",
    width: '70%',
    marginTop: '40px',
    marginLeft: '20px'
};

const avatarStyle = {
    backgroundColor: "green",
};

const btnStyle = {
    margin: "8px 0"
}

function Login() {

    const [otp, setOtp] = useState(false);

    return (
        <Grid sx={{width: '100%', marginTop: '70px'}}>
            <Paper display="flex" justifyContent="center" elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Log-In</h2>
                </Grid>
                {!otp && <TextField
                    label="Mobile Number"
                    placeholder="Enter Mobile No."
                    fullWidth
                    required
                />}

                {!otp && <Button onClick={() => setOtp(true)} type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                    Get OTP
                </Button>
                }

                {otp && <TextField
                    sx={{ margin: "8px 0" }}
                    label="OTP"
                    placeholder="Enter OTP"
                    type="Otp"
                    fullWidth
                    required
                />}

                {otp && <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                    Submit
                </Button>
                }

            </Paper>
        </Grid>
    )
}

export default Login