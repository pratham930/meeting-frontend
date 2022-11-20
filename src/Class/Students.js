import React,{useEffect,useState} from 'react';
import { Box ,Button} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import {useJoinMeetingMutation,} from "../services/profile"
import {getToken} from '../services/localstorage';
import { useParams } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Grid, TextField, Typography, FormControlLabel, Checkbox, Alert,
  InputLabel, MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';
  import {useOnlineStudentsQuery,
    useGetClassByTeacherQuery,
    useGetAllMeetingQuery,
    useLeftMeetingMutation,
    useJoinMeetingMutation,
    useUploadStudentsMutation,
    useGetAllStudentAddedByTeacherQuery,
    useGetAllStudentByClassIdQuery,
    useUserProfileQuery} from "../services/profile";

  


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

// import { io } from "socket.io-client";


const Student = () => {
  // const socket = io('http://192.168.1.38:8001');


  const Input = styled('input')({
    display: 'none',
  });
  let {_id } = useParams();

const [open, setOpen] = useState(false)
  

const [addAttachment, setaddAttachment] = useState('')
const [error, setError] = useState({
  status: false,
  msg: "",
  type: ""
})


const handleClose = () => {
  setOpen(false)
}

const openDialog = () => {
  console.log("clicked first")
  setOpen(true)
}


  const token = getToken('token');
console.log(token)
     const {data:Data} = useGetClassByTeacherQuery(token)
     console.log(Data,'24')
   
 
   const {data:userdata} = useUserProfileQuery(token);
   console.log(userdata)
 const {data:AllStudent} =useGetAllStudentAddedByTeacherQuery(token)
const [UploadData] = useUploadStudentsMutation()
 console.log(AllStudent)

 const {data:students} = useGetAllStudentByClassIdQuery({_id,token})

 console.log(students,'43')
    // useEffect(() => {
    //   socket.on("connect", () => {
    //     console.log(socket.id);
    //   });
    
    // }, []);

   

console.log(_id,"8")



const handleSubmit = async() =>{


  const data = new FormData()
  data.append('addAttachment', addAttachment)
data.append("_id",_id)

  if (addAttachment ) {
    const token = getToken('token')
    const doc = await UploadData({data,token})

    
    console.log(doc)

    
 
    setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
 
  } else {
    setError({ status: true, msg: "All Fields are Required", type: 'error' })
  }
}







  return (
    <div>

students


{ students?.map(({studentName,_id,createdAt})=>{
return(
    <List key={_id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>
     
      <ListItemText primary={studentName} secondary={new Date(createdAt)?.toDateString()} />
    </ListItem>
  
    
  </List>)

   })
       
}
<Fab onClick={openDialog} style={{position: 'fixed', bottom: 10, right: 10}} color="primary" aria-label="add">
          <AddIcon />
        </Fab>


        <BootstrapDialog sx={{}}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
        <DialogTitle sx={{p: 2, }}>

       
        <Box sx={{my:5,p:2}}>
<Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', my:1 }}>
        <Typography variant='caption' component="div" sx={{ fontWeight: 'normal', color: 'white' }}>student Data</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item >
          <Box component="form" sx={{ justifyContent:"center",alignItems:"center" }} noValidate id="resume-form" onSubmit={handleSubmit}>
            

                <Stack  alignItems="center"  >
              <label htmlFor='profile-photo'>
                <Input size ="small" accept="doc/*" id="profile-photo" type="file" onChange={(e) => { setaddAttachment(e.target.files[0]) }} />
                <Button size='small' variant='contained' component='span'>Upload csv </Button>
              </label>
             
            </Stack>
           
            <Button  size='small' type='submit' variant='contained' sx={{  }} color="error">Submit</Button>
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
    
      </BootstrapDialog>





    </div>


  )
}



export default Student;