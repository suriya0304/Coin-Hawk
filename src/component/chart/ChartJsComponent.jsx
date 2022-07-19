import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { HistoricalChart } from '../../config/api'
import { CoinState } from '../../context/CoinContext'
import Chart from 'chart.js/auto';
import { Box, Button, Stack, styled } from '@mui/material'
const ChartJsComponent = (props) => {
    const {id}=props
    const {symbol,currency}=CoinState()
  const [timeFrame,setTimeFrame]= useState(365)
  const [info,setInfo]=useState()

  const historicData = async()=>{
      const {data} = await axios.get(HistoricalChart(id,timeFrame,currency))
      console.log(HistoricalChart(id,365,currency))
      setInfo(data.prices)

  }
  const labels=info?.map((coin)=>{
    let date= new Date(coin[0])
    let time= date.getHours>12 ? `${date.getHours()-12}:${date.getMinutes()} PM`:`${date.getHours()}:${date.getMinutes()} AM`
    return timeFrame===1 ? time : date.toLocaleDateString()
  })

  const data={
    labels,
    datasets:[
        {   
            label:`price in ${currency}`,
            data:info?.map((coin)=>coin[1]),
            borderColor:'orange'
        }
    ]
  }
   const options={
       elements:{
           point:{
               radius:1
           }
       }
   }

  useEffect(()=>{
    historicData()
    
  },[currency,timeFrame])

  console.log(info)

  const StyledButton=styled('button')({
    fontSize:'18px',
    width:'100px',
    height:'50px',
    border:'1px solid orange',
    transition:'1s all ease',
    color:'orange',
    backgroundColor:'black',

    '&:hover':{
      backgroundColor:'orange',
      color:'black'
    }
  })
    return ( 
        <Stack direction='column' paddingTop='50px' gap="50px">
            <Line data={data} options={options}/>
            <Box className="button-grp" sx={{display:'flex',justifyContent:'space-evenly'}}>
                <StyledButton onClick={()=>setTimeFrame(1)}>24 Hours</StyledButton>
                <StyledButton onClick={()=>setTimeFrame(30)}>30 Days</StyledButton>
                <StyledButton onClick={()=>setTimeFrame(90)}>3 Months</StyledButton>
                <StyledButton onClick={()=>setTimeFrame(365)}>1 year</StyledButton>
            </Box>
        </Stack>
    
  )
}

export default ChartJsComponent