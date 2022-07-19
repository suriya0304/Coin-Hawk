import { Stack, Typography } from '@mui/material'
import React from 'react'
import Carousel from '../carousel/Carousel'

const Banner = () => {
  return (
      <Stack justifyContent='center' alignItems='center' gap='10px'>
        <Typography sx={{fontSize:'80px',color:'text.primary'}}>Coin Hawk</Typography>
        <Typography sx={{color:'text.secondary',paddingBottom:'20px'}}>Watch latest news and coin price change like a hawk</Typography>
        <Stack style={{width:'85%'}} >
        <Carousel/>
        </Stack>

      </Stack>
  )
}

export default Banner