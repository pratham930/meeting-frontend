import React,{useEffect,useState} from 'react';
import {useGetStudentIndividualClassesQuery ,useJoinClassMutation} from "../services/profile";
import {getToken} from '../services/studentStore';
import { NavLink ,useNavigate} from 'react-router-dom';
import { io } from "socket.io-client";
import { Grid, TextField, Typography, FormControlLabel, Checkbox,Button, Alert,Box ,Container
    , MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';

  const socket = io('http://192.168.1.38:8001'); 
  // const socket = io('http://localhost:5000'); 

  

const StudentClass = () => {

  const token = getToken('token')
  const {data} = useGetStudentIndividualClassesQuery(token)

  useEffect(() => {
    console.log('heyyy ')
    socket.on("connect", () => {
      console.log(socket.id,"21");
    });
    // setSocketConnected(true)
    socket.on('setup', (data) )
    socket.emit("setup", data);


  }, [])





     
 
 const [Join] = useJoinClassMutation()


const navigate = useNavigate()



const handleSubmit = async(_id) =>{


  console.log("clicked")
  if (_id && token ) {
      const Data ={_id}
      const res = await Join({Data,token})
      console.log(res)
      console.log(res.data.message,"first")
      if(res.data.status === "success"){
        navigate(`/LiveClass/${_id}`)

      }
      // socket.emit("joinChat", _id);
      // socket.emit("setup", userdata?.user);
  } else {
      
  }
  }
    console.log(data,'7')
  return (
    <div>StudentClass


<Container>
     

     <Box sx={{}}>

       {data?.map(({ _id, className, startTime,classId,addedBy }) => {
         return (
           <Box sx={{ display: "flex", justifyContent: "space-between" }} key={_id}>
             <NavLink to={`/LiveClass/${_id}`}>





            


               <Box>
                 {classId.className}
               </Box>
             
               
             </NavLink>

             <Box>

            <Button  onClick={()=> handleSubmit(_id) }>
join


</Button>
</Box>
             <Box>
              teacher:   {addedBy.name}
               </Box>
             <Box>
               classStartAt :{new Date(classId.startTime)?.toDateString() + ' ' + new Date(classId.startTime)?.toLocaleTimeString()}
             </Box>


           </Box>
         )
       })}

     </Box>
</Container>


    </div>
  )
}

export default StudentClass