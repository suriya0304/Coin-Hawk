import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CoinState } from '../../context/CoinContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AlertPop = () => {
  console.log('alert')
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({...alert,open:false});
  };
  const {alert,setAlert}= CoinState()
  return (
    <Snackbar open={alert?.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert?.type} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
    </Snackbar>
  )
}

export default AlertPop