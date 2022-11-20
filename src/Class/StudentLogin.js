import React from 'react'
import {Alert ,Box, Container,TextField , CircularProgress,Button}  from '@mui/material';
import {useStudentLoginMutation,useSingupProfileMutation,} from '../services/profile';
import { useNavigate } from 'react-router-dom';
import {storeToken} from '../services/studentStore';

const StudentLogin = () => {

const navigate = useNavigate()



const [loginUser] = useStudentLoginMutation()

const [error, setError] = React.useState({
    status: false,
    msg: "",
    type: ""
  })

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      
      password: data.get('password'),
      // password: data.get('cpassword'),
      mobile: data.get('mobile'),


    }
    
    if (actualData.mobile && actualData.password) {
      console.log(actualData,"73")
      const res = await loginUser(actualData)
      if (res.data.status === "success") {

storeToken(res.data.token)
        setError({ status: true, msg: res.data.message, type: 'error' })

         navigate('/StudentClass')
      }
      if (res.data.status === "failed") {
        setError({ status: true, msg: res.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }


  return (
    <>
    <Box align='center' justifyContent='center'  >
    <Container maxWidth='xs' >
    
    
            
            <Box component='form' noValidate sx={{ mt: 1,width: 350, }} id='login-form' onSubmit={handleSubmit}>
          
          <TextField margin='normal' required fullWidth id='mbile' name='mobile' label='Phone Number' />
    
          <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
          {/* <TextField margin='normal' required fullWidth id='email' name='cpassword' label='confirm-password' /> */}
    
          <Box textAlign='center'>
            
    
    <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
    </Box>
    
    
    </Box>
    </Container>
       </Box>     
            </>
  )
}

export default StudentLogin