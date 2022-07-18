import { ThemeProvider } from '@emotion/react'
import { AppBar, Box, MenuItem, Select, styled, Toolbar, Typography } from '@mui/material'
import { color, Container, height } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router'
import { CoinState } from '../../context/CoinContext'
import { Hawk } from '../../svg/hawk'


const Header = () => {
  const navigate=useNavigate()
  const LogoBox=styled(Box)({
    fontWeight:'bold',
    cursor:'pointer',
  })
  const {currency,setCurrency}=CoinState()
  return (
    
    
    <AppBar position='static' >
    <Container>
      <Toolbar>
        <Box sx={{display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
        <LogoBox onClick={()=>navigate('/') } sx={{display:{xs:'none',sm:'block'}}}>Coin Hawk</LogoBox>
        <LogoBox sx={{display:{xs:'block'}}}> <Hawk /></LogoBox>
        </Box>
        
        <Select sx={{height:40,width:100,marginLeft:20}} variant='outlined' defaultValue='USD' value={currency} onChange={(e)=>setCurrency(e.target.value)}>
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='INR'>INR</MenuItem>
        </Select>
      </Toolbar>
    </Container>
      
    </AppBar>
    
  )
}

export default Header