import { Box } from '@mui/system';
import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { getToken } from '../services/localstorage';
import { NavLink, useNavigate } from 'react-router-dom';

import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Alert,
     InputLabel, MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';

     import {useCreateClassMutation} from "../services/profile"
const SheduleClass = () => {
    const Input = styled('input')({
        display: 'none',
      });


      const navigate = useNavigate()
  const token = getToken('token')
   

const [SheduleClass] = useCreateClassMutation()

    const [className, setName] = useState()
    const [quantity, setquantity] = useState()
    const [Category, setCategory] = useState('')
    const [startTime, setstartTime] = useState()
    const [Subcategory, setSubcategory] = useState()
    const [endTime, setendTime] = useState()
   
    const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
    })

  const resetForm = () => {
    setName('')
    setquantity('')
    // category('')
    setCategory('')
    setstartTime('')
    setendTime('')
   
    setSubcategory('')
    document.getElementById('resume-form').reset()

  }
console.log(className,startTime,endTime,'44')



      
  const handleSubmit = async(e) => {
  navigate('/Meeting')

    e.preventDefault();
    const data = new FormData()
    data.append('className', className)
    data.append('startTime', startTime)
    data.append('endTime', endTime)
    

    if (className && startTime) {
  const res = await SheduleClass({data,token})
      setError({ status: true, msg: "class shedule Successfully", type: 'success' })
      resetForm()
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return (

    <>
<Box>
<Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 1 }}>
        <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Meeting details</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id="name" name="name" required fullWidth margin='normal' label='ClassName' onChange={(e) => setName(e.target.value)} />
            {/* <TextField id="email" quantity="quantity" required fullWidth margin='normal' label='quantity' onChange={(e) => setquantity(e.target.value)} /> */}
                                        


            <FormControl fullWidth margin='normal'>
              {/* <FormLabel id="gender-radio">startTime</FormLabel> */}
              <TextField id="email" startTime="startTime" required fullWidth margin='normal' label='startTime' onChange={(e) => setstartTime(e.target.value)} />
            </FormControl>
           
              <FormControl fullWidth margin='normal'>
            {/* <FormLabel id="gender-radio">endTime</FormLabel> */}
              <TextField id="email" endTime="endTime" required fullWidth margin='normal' label='endTime' onChange={(e) => setendTime(e.target.value)} />
              </FormControl>
           

           
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

    
      </Grid>


</Box>


    </>

    
  )
}

export default SheduleClass