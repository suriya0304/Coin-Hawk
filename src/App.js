import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import React from 'react';
import { BrowserRouter,Route ,Routes} from 'react-router-dom';
import Header from './component/header/Header';
import Homepage from './pages/homepage/Homepage';
import CoinPage from './pages/coinpage/CoinPage';
import { ThemeProvider } from '@emotion/react';
import { dark } from './theme/DarkTheme';
import AlertPop from "./component/alert/Alert";
import { Box } from "@mui/material";
function App() {
  return (
    <Box className="App" sx={{
      [dark.breakpoints.up('md')]:{
        backgroundColor:'black',
      height:'100vh'}
    }}>
      <BrowserRouter>
      <Header/>
      <Routes>
        
        <Route path='/'>
          <Route index element={<Homepage/>}></Route>
          <Route path='coin/:id' element={<CoinPage/>}/>
        </Route>
      </Routes>
      <AlertPop/>
      
    </BrowserRouter> 
  </Box>
    
  );
}

export default App;
