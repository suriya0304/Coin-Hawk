import { onAuthStateChanged } from 'firebase/auth'
import React,{Children, createContext, useContext, useEffect, useState} from 'react'
import { auth } from '../firebase'


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
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user)
        }else{
          setUser(null)
        }
      })
      console.log('useeffect activated')
    },[])
    console.log(user)
    useEffect(()=>{
        if(currency==='USD'){setSymbol('$')}
        else{setSymbol('₹')}
        
    },[currency])
  return (
    <Coin.Provider value={{symbol,currency,setSymbol,setCurrency,alert,user,setAlert,setAlert}}>
        {children}
    </Coin.Provider>
  )
}
export const CoinState=()=>{
    return useContext(Coin)
}

export default CoinContext