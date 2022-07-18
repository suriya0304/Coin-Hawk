import { createTheme } from "@mui/material";

export const dark=createTheme({
    palette:{
        mode:'dark',
        text:{
            primary:'orange',
            secondary:'#73777B'
        },
        background:{
            default:'#423F3E',
            paper:'black'
        }
    }
})