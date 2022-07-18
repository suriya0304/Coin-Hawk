
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../config/api'
import { CoinState } from '../../context/CoinContext'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Stack, styled, Typography } from '@mui/material';
import Slider from "react-slick";
import './carousel.css'
const Carousel = () => {
  
  const {currency,symbol}= CoinState()

  const [trending , setTrending]= useState([])

  useEffect(()=>{
    fetchTrending()
  },[currency])

  const fetchTrending = async ()=>{
    const {data}= await axios.get(TrendingCoins(currency))
    setTrending(data)
   console.log(TrendingCoins(currency))
  }
  const items = trending.map((coin)=>{
    return(
      <Link  to={`/coins/${coin.name}`} style={{textDecoration:'none'}} >
    <Stack  key={coin.id} direction='row'>
      <Stack style={{gap:'10px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'white'}}>
        <img src={coin.image} alt={(coin.id)} style={{width:70,height:70}} />
        <Stack direction='row' justifyContent='space-between' width='100px'>
          <Typography >{(coin.symbol).toUpperCase()}</Typography>
          <Typography color={(coin.price_change_percentage_24h+'').charAt(0)==='-'?'red':'green'}>{coin.price_change_percentage_24h.toFixed(2)+'%'}</Typography>
        </Stack>
        
        <p style={{fontSize:25}} >{symbol}{coin.current_price.toFixed(2)}</p>
      </Stack>
     
    </Stack>
    </Link>

      )
  })
  const settings = {
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