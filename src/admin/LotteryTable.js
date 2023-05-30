import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function UserTable() {
  const [ items, setItems ] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/lotterys`)
      .then((response) => {
          setItems(response.data);
        }
      )
  }, [])

  const LotteryDelete = (id) => {
    Swal.fire({
      title: 'คุณต้องลบข้อมูลหรือไม่?',
      showDenyButton: true,
      confirmButtonText: 'ลบ',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
        .delete(`${process.env.REACT_APP_API}/lottery/${id}`)
        .then((response) => {
          if(response.status === 200){
            Swal.fire('แจ้งเตือน','ลบข้อมูลเรียบร้อย','success').then(() => {
              window.location.reload()
            })  
          }
        })
        .catch((err) => console.log(err))
          } 
        })

  }

  const LotteryEdit = (id) => {
    window.location = `lottery/edit/${id}`
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%" sx={{ pt: 3 }}>
        <Paper sx={{ p: 2}}>
            <Box>
                <Box display="flex">
                    <Box sx={{ flexGrow: 1}}>
                        <Typography variant='h6' gutterBottom component="div">
                            ตารางรายงานข้อมูลผลรางวัลสลาก
                        </Typography>
                    </Box>
                    <Box>
                      <Link href='lottery/create'>
                        <Button variant="contained" sx={{mb: 3}}>Create</Button>
                      </Link>  
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">Lottery_NO</TableCell>
                    <TableCell align="center">Reward_NO</TableCell>
                    <TableCell align="center">Actions&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell align="center">{row.lottery_no}</TableCell>
                      <TableCell align="center">{row.reward_no}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                              m: 1,
                            },
                          }}
                        > 
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={() => LotteryEdit(row.id)}>
                              <EditIcon sx={{ display: { xs: 'none', md: 'flex' }}}/>
                              EDIT
                              </Button>
                            <Button onClick={() => LotteryDelete(row.id)}>
                              <DeleteForeverIcon sx={{ display: { xs: 'none', md: 'flex' }}}/>
                              DEL
                              </Button>
                          </ButtonGroup>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
