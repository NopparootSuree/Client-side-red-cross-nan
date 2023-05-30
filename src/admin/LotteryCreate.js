import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Stack from "@mui/material/Stack";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const LotteryCreate = () => {
    const [ state, setState ] = useState({
        lottery_no: "",
        reward_no: ""
    })

    const { lottery_no, reward_no } = state

    const inputValue = (name) => (event) => {
        console.log(name, "=" , event.target.value);
        setState({...state, [name]:event.target.value})
    }

    const submitForm = (event) => {
        event.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/create`,
        { lottery_no: lottery_no, reward_no: reward_no})
        .then((response) => {
            Swal.fire('แจ้งเตือน','บันทึกข้อมูลเรียบร้อย','success')
            setState({...state, lottery_no: "", reward_no: ""})
        })
        .catch(err => {
            Swal.fire('แจ้งเตือน',err.response.data.error,'error')
        })
    }

    return (
        <>
            <div>
            <CssBaseline />
                <Container maxWidth='sm' sx={{ p: 2}}>
                    <form onSubmit={submitForm}>
                            <Grid container spacing={2} sx={{ p: 1}}>
                                <Grid item xs={12} sm={6}>
                                    <TextField id="lottery_no" label="เลขสลาก" 
                                    value={lottery_no} onChange={inputValue('lottery_no')} 
                                    variant="outlined" type="text" fullWidth/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <TextField id="reward_no" label="รางวัลที่" 
                                        value={reward_no} onChange={inputValue('reward_no')} 
                                        variant="outlined" type="text" fullWidth/>
                                        <FormHelperText>รางวัลเลขท้าย 3 ตัวให้กรอกเลข 7
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} sx={{p:1}}>
                                <Grid item xs={12}>
                                    <Button variant="contained" type='submit' fullWidth>บันทึกข้อมูล</Button>
                                </Grid>
                            </Grid>
                    </form>
                </Container>
            </div>
        </>
    )

}

export default LotteryCreate;