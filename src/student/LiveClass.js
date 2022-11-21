import { Box, Container ,Button} from '@mui/material';
import React from 'react';
import { Navigate, useParams ,useNavigate} from 'react-router-dom';
import {useLeftClassMutation} from "../services/profile";
import {getToken} from '../services/studentStore';


const TeacherLiveClass = () => {


    const token = getToken('token');
    const navigate = useNavigate()

     let {_id } = useParams();
 const [leave] = useLeftClassMutation()
    const handle = async() =>{


        console.log("clicked")
        if (token ) {
          const data ={_id}
            const res = await leave({data,token})

            if(res.data.status === "success"){
                navigate('/StudentClass')
            }
            
        } else {
            }}

  return (
    <>
<Container   onClick={()=> handle() }>
<Box>
<Button>
leftClass

</Button>

</Box>

</Container>

    </>
  )
}

export default TeacherLiveClass;