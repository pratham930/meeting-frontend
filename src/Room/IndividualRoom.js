import React,{useEffect} from 'react';
import { Box ,Button} from '@mui/material';
// import {useJoinMeetingMutation,} from "../services/profile"
import {getToken} from '../services/localstorage';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";

import {useOnlineStudentsQuery,useGetAllMeetingQuery,useLeftMeetingMutation,useJoinMeetingMutation,useUserProfileQuery} from "../services/profile";
const socket = {};

const IndividualRoom = () => {
  const socket = io('http://192.168.1.38:8001');

  let {_id } = useParams();

  


    // const {data} = useOnlineStudentsQuery(null,{pollingInterval:300000})
    const {data} = useOnlineStudentsQuery(_id)
console.log(data,"14")

    const [join] = useJoinMeetingMutation();
    const [leave] = useLeftMeetingMutation();
 
    const token = getToken('token');
   const {data:userdata} = useUserProfileQuery(token);
   console.log(userdata)

    useEffect(() => {
      socket.on("connect", () => {
        console.log(socket.id);
      });
      // socket.emit("onlineStudent", data?.length);
      // socket.emit("join chat", _id);
      // setTyping(true);
      // socket.emit("onlineStudent", selectedChat._id);
      // eslint-disable-next-line
    }, []);

   

console.log(_id,"8")


const handle = async() =>{


    console.log("clicked")
    if (token ) {
      const data ={_id}
        const res = await leave({data,token})
        console.log(res)
        console.log(res.data.message,"first")
    } else {
        }}




const handleSubmit = async() =>{


console.log("clicked")
if (_id && token ) {
    const Data ={_id}
    const res = await join({Data,token})
    console.log(res)
    console.log(res.data.message,"first")
    socket.emit("joinChat", _id);
    socket.emit("setup", userdata?.user);
} else {
    
}
}


// const handleLogin = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     const actualData = {
//       email: data.get('email'),
//       password: data.get('password'),
//     }
    
//     if (actualData.email && actualData.password) {
//       // console.log(actualData.email,'41')
//       const res = await loginUser(actualData)
//       if (res.data.status === "success") {
//         storeToken(res.data.token)
//         // console.log(res.data.token)
//         navigate('/Meeting')
//       }
//       if (res.data.status === "failed") {
//         setError({ status: true, msg: res.data.message, type: 'error' })
//       }
//     } else {
//       setError({ status: true, msg: "All Fields are Required", type: 'error' })
//     }
//   }

    // const token = getToken('token')

    // let {_id } = useParams();
    // console.log(_id,"8")
  return (
    <div>

<Button onClick={()=> handleSubmit() }>

Join this Meeting
</Button>

<Button onClick={()=> handle() }>

leave this Meeting
</Button>
<h1> online student: {data && data?.length}
  </h1>
    </div>
  )
}

// const IndividualRoom = () => {
//   const socket = io('http://192.168.1.38:8001');

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log(socket.id);
//     });
//   }, [])

//   return (
//     <div>
//         HELLO WORLD
//     </div>
//   )
// }

export default IndividualRoom;