import { Button, Stack, TextField, Typography } from '@mui/material';
import React,{useState} from 'react'
import { CoinState } from '../../context/CoinContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase';

const btnStyle={height:'35px',backgroundColor:'orange',color:'black',borderRadius:'5px',fontWeight:'bold',padding:'0 15px ',width:'90px'
    ,width:'100%',
}

export const Login= (props)=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {alert,setAlert}=CoinState()
    const handleLogin=async ()=>{
        if(!email ||!password){
            setAlert({open:true,type:'error',msg:'valid password and email is required' })
        }try{
            const result = await signInWithEmailAndPassword(auth,email,password).then(()=>setAlert({open:true,type:'success',msg:'Login successful' }))
            console.log(result)
            props.handleClose()
        }catch(error){
            setAlert({open:true,type:'error',msg:error.message })
        }
    }
    return(
        <Stack gap='20px' padding='25px'>
            <TextField  color='accent' value={email} id="outlined-basic" label="Enter Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)} />
            <TextField   color='accent' value={password} id="outlined-basic" label="Enter Password" variant="outlined" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleLogin} sx={btnStyle}>Login</Button>
          </Stack>
    )
}

export const SignUp=(props)=>{
    //state
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const {alert,setAlert}=CoinState()

    const handleSignUp= async ()=>{
        if(password.length<6){
            setAlert({open:true,type:'error',msg:'Password should be at least 6 characters' })
            return
        }
        else if(confirmPassword!==password){
            setAlert({open:true,type:'error',msg:'password doesnt match' })
            return
        }
        try{
            const result = await createUserWithEmailAndPassword(auth,email,password).then(()=>setAlert({open:true,type:'success',msg:'Account has been created' }))
            console.log(result)
            props.handleClose()
        }catch(error){
            setAlert({open:true,type:'error',msg:error.message })
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