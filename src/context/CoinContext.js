import React,{Children, createContext, useContext, useEffect, useState} from 'react'
const Coin =createContext({})
const CoinContext = ({children}) => {
    const [symbol,setSymbol]=useState('$')
    const [currency,setCurrency]=useState('USD')


    useEffect(()=>{
        if(currency==='USD'){setSymbol('$')}
        else{setSymbol('₹')}
        
    },[currency])
    console.log(symbol,currency)
  return (
    <Coin.Provider value={{symbol,currency,setSymbol,setCurrency}}>
        {children}
    </Coin.Provider>
  )
}
export const CoinState=()=>{
    return useContext(Coin)
}

export default CoinContext