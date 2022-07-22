
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { CoinState } from '../../context/CoinContext';
import { Avatar, IconButton, Typography } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from 'firebase/firestore';

export default function SidebarComponent() {
    const {user,setAlert,watchlist,list,symbol}=CoinState()
    const [state, setState] = React.useState({
    right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, [anchor]: open });
    };

    const logout=()=>{
        signOut(auth).then(()=>setAlert({open:true,type:'error',msg:'loged out'}))
    }
    const removeWatchList=async(select)=>{
        const coinref = doc(db,"watchlist",user.uid)
    
        try{
          await setDoc(coinref,{coins:watchlist.filter((coin)=>coin!==select)},{merge:true})
            .then(()=>setAlert({open:true,type:'error',msg:`${select} removed from watchlist`}))
        }catch{}
      }
    return (
    <div>
        {['right'].map((anchor) => (
        <React.Fragment >
            <Box sx={{cursor:'pointer',marginLeft:'15px'}}>
                <Avatar src={user.photoURL} sx={{bgcolor:'orange'}} onClick={toggleDrawer(anchor, true)}/>
            </Box>
            
            <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            >
            <div style={{gap:'20px',padding:'25px',width:'300px',height:'100vh',display:'flex',flexDirection:'column',backgroundColor:'#2e2b2b'}}>
                <div className="" style={{gap:'25px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                    <Avatar sx={{width:'100px',height:'100px',bgcolor:'orange'}} src={user.photoURL}/>
                    <Typography variant='h5'>{user.email}</Typography>
                </div>
                <div className="" style={{flex:1,overflowY:'scroll',borderRadius:'20px',gap:'10px'}} width='90%'>
                    <Typography textAlign='center'>Your watchlist</Typography>
                    {list.map((item)=>{
                        if(watchlist.includes(item.id)){
                            
                            return(
                                <div className="" key={item.id} style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'5px',borderRadius:'5px',margin:'10px',color:'black',backgroundColor:'orange'}}>
                                    <span style={{flex:1}}>{item.id}</span>
                                    <span style={{paddingRight:'20px'}}>{symbol+item.current_price}</span>
                                    <IconButton aria-label="delete" onClick={()=>removeWatchList(item.id)}>
                                        <DeleteIcon color='error' />
                                    </IconButton>
                                </div>
                            )
                        }
                    })}
                </div>
                <Button sx={{bgcolor:'orange',color:'black',fontWeight:'bold',fontSize:'16px'}} onClick={logout}>Logout</Button>
            </div>
            </Drawer>
        </React.Fragment>
        ))}
    </div>
    );
}