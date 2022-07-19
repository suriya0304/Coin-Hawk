import { createTheme } from "@mui/material";

export const dark=createTheme({
    palette:{
        mode:'dark',
        text:{
            primary:'#FFA500',
            secondary:'#73777B'
        },
        background:{
            default:'#423F3E',
            paper:'black'
        }
    }
})