
import SheduleClass from "../Class/SheduleClass";
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Alert,
  InputLabel, MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';
import { Box, Container,Button } from '@mui/material';
import React,{useState} from 'react';
import { getToken } from '../services/localstorage';
import { useOnlineStudentsQuery,useCreateClassMutation, useGetAllClassQuery ,useGetClassByTeacherQuery} from "../services/profile";
import { NavLink, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({





  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },

}));









const AllClasses = () => {



 
  const token = getToken('token')
  // const {data} = useOnlineStudentsQuery()
  const { data: Data } = useGetAllClassQuery(token)
   const {data} =  useGetClassByTeacherQuery(token)
 
   console.log(data,'49')
const [open, setOpen] = useState(false)


  // console.log(data)
  console.log(Data, "9")

  


  const handleClose = () => {
    setOpen(false)
  }
  
  const openDialog = () => {
    console.log("clicked first")
    setOpen(true)
  }

  const [SheduleClass] = useCreateClassMutation()

  const [className, setName] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
 
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

const resetForm = () => {
  setName('')

  // category('')

  setStartTime('')
  setEndTime('')
 

  document.getElementById('resume-form').reset()

}
console.log(className,startTime,endTime,'44')



    
const handleSubmit = async(e) => {
// navigate('/Meeting')
  e.preventDefault();
  

  const actualData = {
    className,
    startTime,
    endTime

  }
  // data.append('className', className)
  // data.append('startTime', startTime)
  // data.append('endTime', endTime)
  

  if (className && startTime) {
const res = await SheduleClass({actualData,token})
if (res?.data?.status ==="success") {
setOpen(false)
setError({ status: true, msg: "class shedule Successfully", type: 'success' })
resetForm()
} else {
  
 
    setError({ status: true, msg: "All Fields are Required", type: 'error' })
  }
}

}

  return (
    <>
   
      <Container>
     

        <Box sx={{}}>

          {data?.map(({ _id, className, startTime }) => {
            return (
              <Box sx={{ display: "flex", justifyContent: "space-between" }} key={_id}>
                <NavLink to={`/Students/${_id}`}>



                  <Box>
                    {className}
                  </Box>

                </NavLink>
                <Box>
                  classStartAt :{new Date(startTime)?.toDateString() + ' ' + new Date(startTime)?.toLocaleTimeString()}
                </Box>


              </Box>
            )
          })}

        </Box>
 <Box sx={{display:"flex",justifyContent:"center",spacing:"2"}}>
        <NavLink style={{ listStyle:"none" ,textDecoration:"none"}} to='/CreateMeeting'>
        <Box>
        <Button variant="contained">shedule An new meeting
        </Button>
         
        </Box>

        </NavLink>

        <NavLink style={{ listStyle:"none" ,textDecoration:"none"}} to='/AllClasses'>
        <Box>
        <Button  variant="outlined">View StudentsBy class
        </Button>
         
        </Box>

        </NavLink>

        </Box>
        <Fab onClick={openDialog} style={{position: 'fixed', bottom: 10, right: 10}} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
        <DialogTitle sx={{ m: 0, p: 2 }}>

        {/* <SheduleClass/> */}
        <Box>
<Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 1 }}>
        <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Class Details</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id="name" name="className" required fullWidth margin='normal' label='className' onChange={(e) => setName(e.target.value)} />
           
                                        


            <FormControl fullWidth margin='normal'>
        
              <TextField id="email" startTime="startTime" required fullWidth margin='normal' label='startTime' onChange={(e) => setStartTime(e.target.value)} />
            </FormControl>
           
              <FormControl fullWidth margin='normal'>
       
              <TextField id="email" endTime="endTime" required fullWidth margin='normal' label='endTime' onChange={(e) => setEndTime(e.target.value)} />
              </FormControl>
           

           
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

    
      </Grid>


</Box>


          
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          
        </DialogTitle>
        {/* <DialogContent dividers>
          <p>Hello world</p>
        </DialogContent> */}
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>

      </Container>





    </>
  )}

export default AllClasses;