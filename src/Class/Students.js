import React,{useEffect} from 'react';
import { Box ,Button} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import {useJoinMeetingMutation,} from "../services/profile"
import {getToken} from '../services/localstorage';
import { useParams } from 'react-router-dom';
// import { io } from "socket.io-client";

import {useOnlineStudentsQuery,
  useGetClassByTeacherQuery,
  useGetAllMeetingQuery,
  useLeftMeetingMutation,
  useJoinMeetingMutation,
  useGetAllStudentAddedByTeacherQuery,
  useGetAllStudentByClassIdQuery,
  useUserProfileQuery} from "../services/profile";
const socket = {};

const Student = () => {
  // const socket = io('http://192.168.1.38:8001');

  let {_id } = useParams();

  

  const token = getToken('token');
console.log(token)
     const {data:Data} = useGetClassByTeacherQuery(token)
     console.log(Data,'24')
    // const {data} = useOnlineStudentsQuery(_id)
// console.log(data,"14")

    // const [join] = useJoinMeetingMutation();
    // const [leave] = useLeftMeetingMutation();
 
   const {data:userdata} = useUserProfileQuery(token);
   console.log(userdata)
 const {data:AllStudent} =useGetAllStudentAddedByTeacherQuery(token)

 console.log(AllStudent)

 const {data:students} = useGetAllStudentByClassIdQuery({_id,token})

 console.log(students,'43')
    // useEffect(() => {
    //   socket.on("connect", () => {
    //     console.log(socket.id);
    //   });
    
    // }, []);

   

console.log(_id,"8")


// const handle = async() =>{


//     console.log("clicked")
//     if (token ) {
//       const data ={_id}
//         const res = await leave({data,token})
//         console.log(res)
//         console.log(res.data.message,"first")
//     } else {
//         }}




// const handleSubmit = async() =>{


// console.log("clicked")
// if (_id && token ) {
//     const Data ={_id}
//     const res = await join({Data,token})
//     console.log(res)
//     console.log(res.data.message,"first")
//     // socket.emit("joinChat", _id);
//     // socket.emit("setup", userdata?.user);
// } else {
    
// }


// }

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

{/* <Button onClick={()=> handleSubmit() }>

Join this Meeting
</Button>

<Button onClick={()=> handle() }>

leave this Meeting
</Button>
<h1> online student: {data && data?.length}
  </h1> */}


    </div>


  )
}



export default Student;