import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { gettoastOptions, useStyles } from '../../../app/constant';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getLoggedUserAsync, loginUserAsync, selectError } from "../authSlice";
import { Grid, Paper, Typography, Avatar, Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Copyright from "./Copyright";
import LOGO from '../../../app/LOGO.png'

const Login = () => {
  const dispatch = useDispatch();
  const selectErrorMsg = useSelector(selectError);

  if(selectError!=="") {
    toast.error(selectErrorMsg, gettoastOptions());
  }
  const loginObject = {
    username: "",
    password: "",
  }

  const [loginData, setloginData] = useState(loginObject);

  const handleChange = (event) => {
    // console.log(loginData);
    setloginData({ ...loginData, [event.target.name]: event.target.value });
  }

  const handleValidation = ({
    UserName,
    Password,
  }) => {
    if(Password==="" && UserName==="") {
     toast.error("All field is require", gettoastOptions());
     return false;
    }
    else if(UserName==="") {
      toast.error("username field is require", gettoastOptions());
      return false;
    }
    else if(Password==="") {
      toast.error("password field is require", gettoastOptions());
      return false;
    }
    return true;
  };

  const handdleLogin = (e) => {
    e.preventDefault();
    console.log("submit");
    const { username: UserName, password: Password } = loginData;
    if (handleValidation({ UserName, Password })) {
      console.log("validated");
      console.log({username: UserName, password: Password});
      dispatch(loginUserAsync({ username: UserName, password: Password}));
      setTimeout(() => {
        dispatch(getLoggedUserAsync());
      }, 1000);
    }
  };

  const classes = useStyles();
  const paperStyle = { padding: '20px 15px', width: 350, margin: "0px auto" }
  return (
    <>
    <Grid>
            <div className={classes.background}></div>
            <Paper elevation={18} style={paperStyle}>
                <Grid align="center">
                    <Avatar sx={{ width:100, height:100, my:1, bgcolor:'palegoldenrod' }}> <img src={LOGO} alt="logo" style={{ width: '100%', height: 'auto'}} ></img> </Avatar>
                    <Typography component= "h1" variant="h5" style={{marginBottom:'2px'}}>CodeCollab</Typography>
                    <Typography component="h1" variant="h5" style={{marginTop:'10px'}}>Login</Typography>
                    <Box component="form" noValidate sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="UserName"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="password"
                                    align="left"
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid xs={12} sx={{ mt: 3 }}>
                        <FormControlLabel labelPlacement="end"
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={<div style={{ textAlign: "left" }}>Remember me</div>}
                        />
                    </Grid>
                    <Button type="button" onClick={handdleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 4, bgcolor: "secondary.main" }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs={6}>
                            <Link href="#">
                                Forgot Password
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            {/* <Link href="#" onClick={() => handleChange('event', 1)} variant="body2"> */}
                                No account? Sign up
                            {/* </Link> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Grid2 sx={{ mt: 2}}>
                <Copyright />
            </Grid2>
        </Grid>
      <ToastContainer/>
    </>
  );
};

export default Login;
