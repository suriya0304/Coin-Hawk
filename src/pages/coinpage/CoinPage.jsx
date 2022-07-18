import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router'
import { SingleCoin } from '../../config/api'
import { CoinState } from '../../context/CoinContext'
const CoinPage = () => {
  const {id}= useParams()
  const {symbol,currency}=CoinState()
  const [info , setCoin]=useState('')
  const fetchInfo = async ()=>{
    const {data}=await axios.get(SingleCoin(id.toLowerCase()))
    setCoin(data)
  }
console.log(info)
  useEffect(()=>{
    fetchInfo()
  },[])
  return (
    <div>CoinPage</div>
  )
}

export default CoinPage