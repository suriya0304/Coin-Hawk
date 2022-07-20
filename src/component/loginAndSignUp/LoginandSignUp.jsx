import { Button, Stack, TextField, Typography } from '@mui/material';
import React,{useState} from 'react'
import { CoinState } from '../../context/CoinContext';


const btnStyle={height:'35px',backgroundColor:'orange',color:'black',borderRadius:'5px',fontWeight:'bold',padding:'0 15px ',width:'90px'
    ,width:'100%',
}

const handleLogin=()=>{}

export const Login= ()=>{

    return(
        <Stack gap='20px' padding='25px'>
            <TextField  color='accent' id="outlined-basic" label="Enter Email" variant="outlined" />
            <TextField color='accent' id="outlined-basic" label="Enter Password" variant="outlined" />
            <Button onClick={handleLogin} sx={btnStyle}>Login</Button>
          </Stack>
    )
}

export const SignUp=()=>{

    //state
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const {alert,setAlert}=CoinState()

    const handleSignUp=()=>{
        if(confirmPassword!==password){
            setAlert({open:true,type:'error',msg:'password doesnt match' })
        }else{
            setAlert({open:true,type:'success',msg:'Account has been created' })
        }
    }
    return(
        <Stack gap='20px' padding='25px'>
            <TextField  color='accent' value={email} id="outlined-basic" label="Enter Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
            <TextField   color='accent' value={password} id="outlined-basic" label="Enter Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            <TextField  color='accent' value={confirmPassword} id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Button  onClick={handleSignUp} sx={btnStyle}>Sign Up</Button>
          </Stack>
    )
}