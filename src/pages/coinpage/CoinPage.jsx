import { Box, LinearProgress, Stack, styled, Typography } from '@mui/material'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { SingleCoin } from '../../config/api'
import { CoinState } from '../../context/CoinContext'
import { dark } from '../../theme/DarkTheme'
import ChartJsComponent from '../../component/chart/ChartJsComponent'

const CoinPage = () => {
  const {id}= useParams()
  const {symbol,currency}=CoinState()
  const [info , setCoin]=useState({})
  const fetchInfo = async ()=>{
    await axios.get(SingleCoin(id.toLowerCase())).then(res=>setCoin(res.data))
    console.log(info)
  }
  
  useEffect(()=>{
    fetchInfo()
  },[currency])
  const CoinPageContainer = styled('div')({
    padding:'50px',
    display:'flex',
    width:'100%',
    gap:'10px',
    backgroundColor:'black',
    color:'white',
    [dark.breakpoints.up('md')]:{
      flexDirection:'row',
    },
    [dark.breakpoints.down('md')]:{
      flexDirection:'column',
      backgroundColor:'black',
      gap:'25px',
    }
  })

  

  const InfoContainer=styled('div')({
    width:'100%',
    display:'flex',
    flexDirection:'column',
    backgroundColor:'black',
    gap:'15px'
  })
  console.log(info)
  if (!info) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <CoinPageContainer className='coin-page-container'>
      <Box className="coin-info" sx={{display:'flex',flexDirection:'column',borderRight:{md:'0.5px solid orange'},justifyContent:'space-evenly',flex:2,alignItems:'center',paddingLeft:'15px'}}>
        <img style={{height:'180px',width:'180px'}} src={info.image?.large} alt="" />
        <Typography variant='h3' color='orange'>{info?.name}</Typography>
        <InfoContainer>
            <Typography>{info.description?.en.split('.')[0]}</Typography>
            <Typography><span style={{fontWeight:'bold'}}>Rank :&nbsp;</span>{info?.coingecko_rank}</Typography>
            <Typography><span style={{fontWeight:'bold'}}>Current Price :&nbsp;</span>{symbol} {info.market_data?.current_price[currency.toLowerCase()]}</Typography>
            <Typography><span style={{fontWeight:'bold'}}>Market Cap :&nbsp;</span>{symbol} {info.market_data?.market_cap[currency.toLowerCase()]}</Typography>
         
          </InfoContainer>
      </Box>
      
    <Stack style={{height:'100%',flex:3,backgroundColor:'black'}}>
      <ChartJsComponent id={id} />
      
    </Stack>
    </CoinPageContainer>
     
  )
}

export default CoinPage