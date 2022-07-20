import React,{Children, createContext, useContext, useEffect, useState} from 'react'


const Coin =createContext({})

const CoinContext = ({children}) => {
    const [symbol,setSymbol]=useState('$')
    const [currency,setCurrency]=useState('USD')
    const [user,setUser]=useState(null)
    const [alert,setAlert] = useState({
      open:false,
      msg:'',
      type:'success'
    })


    useEffect(()=>{
        if(currency==='USD'){setSymbol('$')}
        else{setSymbol('₹')}
        
    },[currency])
  return (
    <Coin.Provider value={{symbol,currency,setSymbol,setCurrency,alert,setAlert}}>
        {children}
    </Coin.Provider>
  )
}
export const CoinState=()=>{
    return useContext(Coin)
}

export default CoinContext