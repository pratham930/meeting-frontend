import {Alert ,Box, Container,TextField , CircularProgress}  from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button } from '@mui/material';
import {storeToken} from '../services/localstorage';
// import Chatpage from './Chatpage';
import { useNavigate } from 'react-router-dom';
import {useLoginProfileMutation,useSingupProfileMutation,} from '../services/profile';

const Singup = () => {

  const navigate  = useNavigate()
    const [error, setError] = React.useState({
        status: false,
        msg: "",
        type: ""
      })
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [loginUser] = useLoginProfileMutation()
    
   const [SingupUser] = useSingupProfileMutation()

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          email: data.get('email'),
          password: data.get('password'),
        }
        
        if (actualData.email && actualData.password) {
          // console.log(actualData.email,'41')
          const res = await loginUser(actualData)
          if (res.data.status === "success") {
            storeToken(res.data.token)
            // console.log(res.data.token)
            navigate('/DashBoard')
          }
          if (res.data.status === "teacher login success") {
            storeToken(res.data.token)
            // console.log(res.data.token)
            navigate('/AllClasses')
          }
          if (res.data.status === "failed") {
            setError({ status: true, msg: res.data.message, type: 'error' })
          }
        } else {
          setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
      }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
          email: data.get('email'),
          name: data.get('name'),

          password: data.get('password'),
          // password: data.get('cpassword'),
          phonenumber: data.get('phonenumber'),


        }
        
        if (actualData.email && actualData.password) {
          console.log(actualData,"73")
          const res = await SingupUser(actualData)
          if (res.data.status === "success") {
            setError({ status: true, msg: res.data.message, type: 'error' })

            // navigate('/About')
          }
          if (res.data.status === "failed") {
            setError({ status: true, msg: res.data.message, type: 'error' })
          }
        } else {
          setError({ status: true, msg: "All Fields are Required", type: 'error' })
        }
      }

  return (
    <Box align='center' justifyContent='center'  >
<Container maxWidth='xs' >


<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Singup" value="1" />
            <Tab label="Login" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1">
        
        <Box component='form' noValidate sx={{ mt: 1,width: 350, }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='name' label='Name' />

      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      <TextField margin='normal' required fullWidth id='mbile' name='phonenumber' label='Phone Number' />

      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {/* <TextField margin='normal' required fullWidth id='email' name='cpassword' label='confirm-password' /> */}

      <Box textAlign='center'>
        

<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Singup</Button>
      

        {/* {!isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>} */}
      </Box>
      <NavLink to='/ResetPassword' >Forgot Password ?</NavLink>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
        
        
        
        </TabPanel>
        <TabPanel value="2">

        <Box component='form' noValidate sx={{ mt: 1,width: 350, }} id='login-form' onSubmit={handleLogin}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />

      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      <Box textAlign='center'>
        

<Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
      

        {/* {!isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>} */}
      </Box>
      <NavLink to='/ResetPassword' >Forgot Password ?</NavLink>
      {error.status ? <Alert severity={error.type} sx={{ mt: 3 }}>{error.msg}</Alert> : ''}
    </Box>
        
        
        </TabPanel>
      </TabContext>
    </Box>
</Container>

    </Box>
  )
}

export default Singup;