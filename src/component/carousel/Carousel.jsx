
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CoinState } from '../../context/CoinContext'
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Stack, Typography } from '@mui/material';
import Slider from "react-slick";
import './carousel.css'
const Carousel = () => {
  const navigate=useNavigate()
  const {currency,symbol}= CoinState()

  const [trending , setTrending]= useState([])

  useEffect(()=>{
    fetchTrending()
  },[currency])

  const fetchTrending = async ()=>{
    const {data}= await axios.get(TrendingCoins(currency))
    setTrending(data)
  }
  const items = trending.map((coin)=>{
  
    return(
    <Stack key={coin.id} onClick={()=>navigate(`/coin/${coin.id.toLowerCase()}`)}>
      <Stack style={{gap:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'white'}}>
        <img src={coin.image} alt={(coin.id)} style={{width:70,height:70}} />
        <Stack direction='row' justifyContent='space-between' width='100px'>
          <Typography >{(coin.symbol).toUpperCase()}</Typography>
          <Typography color={(coin.price_change_percentage_24h+'').charAt(0)==='-'?'red':'green'}>{coin.price_change_percentage_24h.toFixed(2)+'%'}</Typography>
        </Stack>
        
        <p style={{fontSize:25}} >{symbol}{coin.current_price.toFixed(2)}</p>
      </Stack>
     
    </Stack>

      )
  })
  const responsive = [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    }
  ]
  const settings = {
      responsive, 
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 3000,
      cssEase: "linear"
  };
    return (
      <div >
        <Slider {...settings}>
          {items}
        </Slider>
      </div>
    );
    
  
}

export default Carousel