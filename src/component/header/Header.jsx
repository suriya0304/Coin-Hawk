
import { AppBar, Box, MenuItem,Button, Select, styled, Toolbar,Modal, ButtonGroup, Stack} from '@mui/material'
import { Container } from '@mui/system'
import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import { CoinState } from '../../context/CoinContext'
import { Hawk } from '../../assets/svg/hawk'
import { Login, SignUp } from '../loginAndSignUp/LoginandSignUp'
import GoogleLogin from '../loginWithGoogle/GoogleLogin'


const Header = () => {
  const navigate=useNavigate()
  const LogoBox=styled(Box)({
    fontWeight:'bold',
    cursor:'pointer',
  })
  const {currency,setCurrency}=CoinState()

  const [open, setOpen] = useState(false);
  const [authMethod,setAuthMethod]=useState('login')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color:'white'
  };
  
  const StyledBox=styled(Box)({
    borderRadius:'15px',
    backgroundColor:'#2e2b2b'
  })
  const StyledButton=styled(Box)({
    flex:'1', paddingTop:"20px", fontSize:'22px', textAlign:'center',cursor:'pointer' 
  })

  const btnStyle={backgroundColor:'orange',color:'black',borderRadius:'5px',fontWeight:'bold',marginLeft:'15px',width:'90px' }
  return (
    
    
    <AppBar position='static'  sx={{height:{xs:'6%',sm:'10%'},padding:'1%'}}>
    <Container>
      <Toolbar>
        <Box sx={{display:'flex',flex:1,gap:'10px',alignItems:'center'}}>
        <LogoBox onClick={()=>navigate('/') } sx={{display:{xs:'none',sm:'block'}}}>Coin Hawk</LogoBox>
        <LogoBox sx={{display:{xs:'block'}}} onClick={()=>navigate('/')}> <Hawk /></LogoBox>
        </Box>
        <div className="">
          <Select sx={{height:40,width:100,marginLeft:20}} variant='outlined' defaultValue='USD' value={currency} onChange={(e)=>setCurrency(e.target.value)}>
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='INR'>INR</MenuItem>
          </Select>
          <Button onClick={handleOpen} sx={btnStyle}>Login</Button>
        </div>
        
      </Toolbar>
    </Container>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        > 
        <StyledBox style={style}>
          <Stack direction='row' width='100%'>
            <StyledButton onClick={()=>setAuthMethod('login')}>Login</StyledButton>
            <StyledButton onClick={()=>setAuthMethod('signup')}>Sign Up</StyledButton>
          </Stack>
          {
            authMethod==='login'?<Login/>:<SignUp/>
          }
          <GoogleLogin/>
        </StyledBox>
      </Modal>
      
    </AppBar>
    
  )
}

export default Header