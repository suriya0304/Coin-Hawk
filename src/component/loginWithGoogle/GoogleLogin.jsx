
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { CoinState } from '../../context/CoinContext'
import { auth } from '../../firebase'

const GoogleLogin = (props) => {
   const {setAlert}=CoinState()
   
  const googleAuth = new GoogleAuthProvider()
  const googleSignIn = async ()=>{
    await signInWithPopup(auth,googleAuth)
      .then(()=>{
          setAlert({open:true,type:'success',msg:'signed in with google'})
          props.handleClose()})
      .catch((err)=>{
        setAlert({open:true,type:'error',msg:err.message})
      })
  }

  return (
      <div className="" style={{padding:'0 25px 25px'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <hr style={{width:'100%',margin:'0 30px'}}/>
            <p style={{position:'absolute',backgroundColor:'#2e2b2b',padding:'10px'}}>or</p>
        </div>
        <div className="google-btn" style={{paddingTop:'25px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img style={{width:'35px',height:'35px'}} src={require('../../assets/googlebtn.png')} alt="" />
            <button onClick={googleSignIn}  style={{border:'2px solid #4c8bf5',cursor:'pointer',flex:1,textAlign:'center',fontSize:'22px',height:'35px',backgroundColor:'#4c8bf5 '}}>Sign in with Google</button>
        </div>
      </div>
    
  )
}

export default GoogleLogin