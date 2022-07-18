import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CoinContext from './context/CoinContext';
import { ThemeProvider } from '@mui/material';
import { dark } from './theme/DarkTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={dark}>
        <CoinContext>
             <App />
        </CoinContext>
    </ThemeProvider>
    
);

