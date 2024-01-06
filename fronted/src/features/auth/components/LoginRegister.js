import React from "react";
import { useState } from "react";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import Login from "./Login";
import Register from "./Register";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function LoginRegister() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabStyle = { width: 380, margin: "50px auto 0px auto" }
    return (
        <div>
            <div style={tabStyle}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="disabled tabs example">
                    <Tab label="Log In" />
                    <Tab label="Register" />
                </Tabs>
            </div>

            <CustomTabPanel value={value} index={0}>
                <Login handleChange={handleChange}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Register handleChange={handleChange}/>
            </CustomTabPanel>
        </div>
    );
}

export default LoginRegister;