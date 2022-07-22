import React,{useEffect,useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CoinList } from '../../config/api';
import  { CoinState } from '../../context/CoinContext';
import Pagination from '@mui/material/Pagination';
import { styled, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const TableComponent = () => {
    function createData(id, name, price, priceChange,MarketCapital) {
        return { id, name, price, priceChange,MarketCapital};
      }
      
      const {symbol,currency,list,setList} = CoinState()
    const fetchCoinList=async ()=>{
        const {data} = await axios.get(CoinList(currency))
        setList(data)
    }
    useEffect(()=>{
        fetchCoinList()
      },[currency])

      
      const [page,setPage]=useState(0)
      const [searchContent,setSearchContent]=useState('')
    const tempRows =list.filter((coin)=>{
        return (coin.name.toLowerCase()).includes(searchContent.toLowerCase()) || (coin.symbol.toLowerCase()).includes(searchContent.toLowerCase())
    })

    const rows = tempRows.map((coin,index)=>{
        return createData(parseInt(index)+1,coin.name,symbol+coin.current_price.toFixed(2),coin.price_change_percentage_24h.toFixed(2)+'%',symbol+coin.market_cap)
    }) 
    const CustomCell=styled(TableCell)({
        color:'whitesmoke'
    })
    
    const HeadCell=styled(TableCell)({
        fontSize:'20px'
    })
    const navigate= useNavigate()

    
    const filteredList = list.filter((coin)=>{
        return (coin.name.toLowerCase()).includes(searchContent.toLowerCase())
    })
  return (
      <div className="table-container" style={{padding:'50px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <TextField id="outlined-basic" variant="outlined" placeholder=' search a coin...' sx={{width:'90%'}} onChange={(e)=>setSearchContent(e.target.value)}/>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <HeadCell>S.no</HeadCell>
                <HeadCell align="left">Name</HeadCell>
                <HeadCell align="right">Price</HeadCell>
                <HeadCell align="right">24hr Change</HeadCell>
                <HeadCell align="right">Market Cap</HeadCell>
            </TableRow>
            </TableHead>
            <TableBody >
            {(rows.slice(page*10,(page*10)+10)).map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <CustomCell component="th" scope="row">
                    {row.id}
                </CustomCell>
                <CustomCell sx={{cursor:'pointer'}} align="left" onClick={()=>navigate(`/coin/${row.name.toLowerCase()}`)}>{row.name}</CustomCell>
                <CustomCell align="right">{row.price}</CustomCell>
                <CustomCell align="right">{row.priceChange}</CustomCell>
                <CustomCell align="right">{row.MarketCapital}</CustomCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        
        </TableContainer>
        <Pagination count={10} onChange={(e,value)=>(setPage(value-1))}/>
    </div>
  )
}

export default TableComponent