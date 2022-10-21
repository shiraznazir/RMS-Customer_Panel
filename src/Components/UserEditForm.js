import {
  Box,
  Paper,
  Typography,
  Card,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function UserEditForm() {

  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Box>
      {/* <Card
        justify="center"
        sx={{
          fontSize: 12,
          width: "92%",
          bgcolor: "#fff",
          margin: 2,
        }}
      >
        <Typography fontWeight="bold" sx={{ margin: 1.5 }}>
          Edit Profile
        </Typography>
      </Card> */}
      <Grid container spacing={0} sx={{mt: 3, ml: 2}}>
        <Grid item xs={1}>
          <KeyboardBackspaceIcon fontSize="medium" />
        </Grid>
        <Grid align='left' item xs={6}>
          <Typography>Complete your Profile</Typography>
        </Grid>
      </Grid>
      <TextField
        sx={{ ml: 3, mb: 3, mt: 5, width: "85%" }}
        id="standard-basic"
        label="Name*"
        variant="standard"
      />
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-basic"
        label="Phone Number*"
        variant="standard"
      />
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-basic"
        label="Email*"
        variant="standard"
      />
      
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-basic"
        label="Birthday*"
        variant="standard"
      />
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-select-gender"
        select
        label="Gender"
        value={gender}
        onChange={handleChange}
        variant="standard"
      >
        <MenuItem value="" disabled>
          Choose your gender
        </MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
        <MenuItem value="Prefer not to disclose">
          Prefer not to disclose
        </MenuItem>
      </TextField>
    </Box>
  );
}

export default UserEditForm;
