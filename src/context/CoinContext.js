import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import React,{Children, createContext, useContext, useEffect, useState} from 'react'
import { auth, db } from '../firebase'


const Coin =createContext({})

const CoinContext = ({children}) => {
    const [symbol,setSymbol]=useState('$')
    const [currency,setCurrency]=useState('USD')
    const [user,setUser]=useState(null)
    const[list,setList]=useState([])
    const [alert,setAlert] = useState({
      open:false,
      msg:'',
      type:'success'
    })
    const [watchlist,setWatchlist]=useState([])

    useEffect(()=>{
      if(user){
        const coinref=doc(db,"watchlist",user.uid)
        var unsubscribe=onSnapshot(coinref,(coin)=>{
        if(coin.exists()){
          setWatchlist(coin.data().coins)
        }
      })
      return ()=>unsubscribe()
      }
      
    },[user])

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user)
        }else{
          setUser(null)
        }
      })
    },[])
    useEffect(()=>{
        if(currency==='USD'){setSymbol('$')}
        else{setSymbol('₹')}
        
    },[currency])
  return (
    <Coin.Provider value={{symbol,currency,setSymbol,setCurrency,alert,user,setAlert,setAlert,watchlist,setWatchlist,list,setList}}>
        {children}
    </Coin.Provider>
  )
}
export const CoinState=()=>{
    return useContext(Coin)
}

export default CoinContext