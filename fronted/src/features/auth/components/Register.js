import React, { useState } from 'react'
import { Link , Navigate} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { gettoastOptions, useStyles } from '../../../app/constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { createUserAsync, selectLoggedInUser } from '../authSlice';
import { Grid, Paper, Typography, Avatar, Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Copyright from './Copyright';
import LOGO from '../../../app/LOGO.png'



const Register = () => {
  // const dispatch = useDispatch();
  // const user = useSelector(selectLoggedInUser);
  const registerObject = {
    name:"",
    username:"",
    email: "",
    password: "",
    confirm_password: "",
  }

  const [registerData, setRegisterData] = useState(registerObject);

  const handleChange = (event) => {
    // console.log(registerData);
    setRegisterData({ ...registerData, [event.target.name]: event.target.value });
  }

  const handleValidation = ({
    Name,
    UserName,
    Email,
    Password,
    ConfirmPassword,
  }) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if(Email==="") {
      toast.error("All field is require", gettoastOptions());
      return false;
    }
    else if(Name==="") {
      toast.error("All field is require", gettoastOptions());
      return false;
    }
    else if(UserName==="") {
      toast.error("All field is require", gettoastOptions());
      return false;
    }
    else if(Password==="") {
      toast.error("All field is require", gettoastOptions());
      return false;
    }
    else if(ConfirmPassword==="") {
      toast.error("All field is require", gettoastOptions());
      return false;
    }
    else if (Password !== ConfirmPassword) {
      toast.error("Password didn't match", gettoastOptions());
      return false;
    } else if (Password.length <= 4) {
      toast.error("Password Length should be greater than 4", gettoastOptions());
      return false;
    } else if (!emailRegex.test(Email)) {
      toast.error("Email format should be right", gettoastOptions());
      return false;
    }
    return true;
  };

  const handdleRegister = (e) => {
    e.preventDefault();
    console.log("submit");
    const { name: Name, username: UserName, email: Email, password: Password, confirm_password: ConfirmPassword } = registerData;
    if (handleValidation({ Name, UserName, Email, Password, ConfirmPassword })) {
      console.log("validated");
      console.log({Name, UserName, Email, Password, ConfirmPassword});
    //   dispatch(createUserAsync({ email: registerData.email, password: registerData.password}));
    }
  };

  
  const classes = useStyles();
  const paperStyle = { padding: '20px 15px', width: 350, margin: "0px auto" }
  function handleSubmit(event) {
      event.preventDefault();
      // submit();
  }

  return (
    <>
    {/* {user && <Navigate to="/" replace={true} />} */}
    <Grid>
            <div className={classes.background}></div>
            <Paper elevation={18} style={paperStyle}>
                <Grid align="center">
                    <Avatar sx={{ width:100, height:100, my:1, bgcolor:'paleturquoise' }}> <img src={LOGO} alt="logo" style={{ width: '100%', height: 'auto'}} ></img></Avatar>
                    <Typography component= "h1" variant="h5" style={{marginBottom:'2px'}}>CodeCollab</Typography>
                    <Typography component="h1" variant="h5" style={{marginTop:'5px'}}>Sign up</Typography>
                    <Box component="form" noValidate  sx={{ mt: 4 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField                          
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField                 
                                    name="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
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
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="confirm_password"
                                    align="left"
                                    fullWidth
                                    id="confirm_password"
                                    label="Confirm Password"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid xs={12} sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label={<div style={{ textAlign: "left" }}>Subcrive to promos,events and offers.</div>}
                        />
                    </Grid>
                    <Button type="button" onClick={handdleRegister} fullWidth variant="contained" sx={{ my:1, bgcolor: "secondary.main" }}>
                        Sign Up
                    </Button>
                    <Grid>
                        {/* <Link onClick={()=>handleChange('event',0)} href="#" variant="body2" > */}
                            Already have an account? Sign in
                        {/* </Link> */}
                    </Grid>
                </Grid>
            </Paper>
            <Grid sx={{ mt: 3 }}>
                <Copyright />
            </Grid>
        </Grid>
      <ToastContainer />
    </>
  )
}

export default Register
