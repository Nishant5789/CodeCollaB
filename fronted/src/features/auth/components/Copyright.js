import React from "react";
import { Typography,Link } from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" style={{ color: '#fff' }} align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#" variant="inherit">
                CodeCollaB
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright;