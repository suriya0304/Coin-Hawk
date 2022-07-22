import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/material'
import React from 'react'
import Banner from '../../component/banner/Banner'
import TableComponent from '../../component/table/Table'
import { dark } from '../../theme/DarkTheme'
const Homepage = () => {
  return (
      <Box className="" sx={{backgroundColor:'background.paper'}}>
        <Banner/>
        <TableComponent/>
      </Box>
    
    
  )
}

export default Homepage