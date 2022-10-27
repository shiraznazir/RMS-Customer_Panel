import {
  Box,
  Paper,
  Typography,
  Card,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from 'react-redux'
import { selectUser } from '../Components/store/reducer/userSlice'

function UserEditForm() {

  const user = useSelector(selectUser)
  const [name, setName] = useState("");
  const [mobNo, setmobNo]= useState();
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };
  
  const fetchUserData = () =>{
    console.log("User>>>1", user);
     if(user.name === "undefined"){
      console.log("user>>>>>>", user.name);
     }
  }

  useEffect(()=>{
    fetchUserData()
  })

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
      <Grid container spacing={0} sx={{ mt: 3, ml: 2 }}>
        <Grid item xs={1}>
          <KeyboardBackspaceIcon fontSize="medium" />
        </Grid>
        <Grid align="left" item xs={6}>
          <Typography>Complete your Profile</Typography>
        </Grid>
      </Grid>
      <TextField
        type='text'
        sx={{ ml: 3, mb: 3, mt: 5, width: "85%" }}
        id="standard-basic"
        label="Name*"
        variant="standard"
        value={name}
        onChange={(e)=>{
          if(e.target.value.length < 20){
            setName(e.target.value)
          }
        }}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Birthday*"
          inputFormat="MM/DD/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              sx={{ ml: 3, mb: 3, width: "85%" }}
              variant="standard"
              {...params}
            />
          )}
          variant="standard"
        />
      </LocalizationProvider>
      
      <TextField
        sx={{ ml: 3, mb: 3, width: "85%" }}
        id="standard-select-gender"
        select
        label="Gender"
        value={gender}
        onChange={handleGender}
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
      <Button sx={{ bgcolor: "#C0C0C0", color: "#696969", ml: 3, mb: 3, width: "85%" }} variant="contained">
        Update Profile
      </Button>
    </Box>
  );
}

export default UserEditForm;
