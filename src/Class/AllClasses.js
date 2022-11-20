
import SheduleClass from "../Class/SheduleClass"

import { Box, Container,Button } from '@mui/material';
import React,{useState} from 'react';
import { getToken } from '../services/localstorage';
import { useOnlineStudentsQuery, useGetAllClassQuery ,useGetClassByTeacherQuery} from "../services/profile";
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
 
   console.log(data)
const [open, setOpen] = useState(false)
  // console.log(data)
  console.log(Data, "9")

  //    const StartTime = () =>{

  // var elemen
  //     for (let index = 0; index < Data.length; index++) {

  //        elemen = Data[index].startTime;
  //       console.log(elemen,"19")
  //     }
  // return elemen.toDateString()
  //    }


  const handleClose = () => {
    setOpen(false)
  }
  
  const openDialog = () => {
    console.log("clicked first")
    setOpen(true)
  }

  return (
    <>
      {/* <h1> online student: {data?.length}
  </h1> */}
      <Container>


        <Box sx={{}}>

          {Data?.map(({ _id, className, startTime }) => {
            return (
              <Box sx={{ display: "flex", justifyContent: "space-between" }} key={_id}>
                <NavLink to={`/IndividualRoom/${_id}`}>



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

        <SheduleClass/>
          {'Add Class'}


          
            <IconButton
              aria-label="close"
              onClick={openDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          )
        </DialogTitle>
        <DialogContent dividers>
          <p>Hello world</p>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>

      </Container>
    </>
  )
}

export default AllClasses;