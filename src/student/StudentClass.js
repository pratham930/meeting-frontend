import React from 'react';
import {useGetStudentIndividualClassesQuery} from "../services/profile";
import {getToken} from '../services/studentStore';
import { NavLink } from 'react-router-dom';
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Alert,Box ,Container
    , MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';

const StudentClass = () => {
     
  const token = getToken('token')
    const {data} = useGetStudentIndividualClassesQuery(token)
    console.log(data,'7')
  return (
    <div>StudentClass


<Container>
     

     <Box sx={{}}>

       {data?.map(({ _id, className, startTime,classId,addedBy }) => {
         return (
           <Box sx={{ display: "flex", justifyContent: "space-between" }} key={_id}>
             <NavLink to={`/Students/${_id}`}>



               <Box>
                 {classId.className}
               </Box>
             
               
             </NavLink>
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