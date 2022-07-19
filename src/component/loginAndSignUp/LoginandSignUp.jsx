import { Box, TextField, Typography } from '@mui/material';
import React from 'react'


export const Login= ()=>{

    return(
        <Box >
            <TextField id="outlined-basic" label="Enter Email" variant="outlined" />
            <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
          </Box>
    )
}

export const SignUp=()=>{
    return(
        <Box >
            <TextField id="outlined-basic" label="Enter Email" variant="outlined" />
            <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
          </Box>
    )
}