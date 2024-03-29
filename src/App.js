
import './App.css';
// import Singup from "../auth/Singup.js"
import { useEffect ,useState} from 'react';
import { io } from "socket.io-client";
import {useGetAllUserQuery,} from './services/profile';
import Meeting from "./Room/Meeting"
import Singup from "./auth/Singup";
import Students from "./Class/Students"
import { Route, Routes } from "react-router-dom";
import IndividualRoom from "./Room/IndividualRoom"
import CreateMeeting from './Room/CreateMeeting';
import AllClasses from './Class/AllClasses';
import RegisterTeacher from "./admin/RegisterTeacher";
import DashBoard from "./admin/DashBoard";
import Navbar from "./components/Navbar";
import StudentLogin from './Class/StudentLogin';
import StudentClass from "./student/StudentClass";
import 'bulma/css/bulma.min.css';

import  LiveClass from "./student/LiveClass"
// const socket = io('http://192.168.1.38:8001');

function App() {
  const [SocketConnected, setSocketConnected] = useState()
  const {data} = useGetAllUserQuery()

  // console.log(data,"18")
  // console.log(SocketConnected,"19")
  
  useEffect(() => {
    console.log('heyyy ')
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });
    setSocketConnected(true)
    // socket.on('setup', (data) )
    // socket.emit("setup", data);


  }, [])

  return (
    <div className="App">
{/* <Singup/> */}
{/* <Meeting/> */}
<Navbar/>
<Routes>


<Route path="/" element={<Singup />} />
<Route path="/IndividualRoom/:_id" element={<IndividualRoom/>}/>

<Route path="/CreateMeeting" element={<CreateMeeting/>} />
<Route path="/AllClasses" element={<AllClasses/>} />
<Route path="/DashBoard" element={<DashBoard/>} />
<Route path="/RegisterTeacher" element={<RegisterTeacher/>} />

<Route path="/Meeting" element={<Meeting />} />
<Route path="/Students/:_id" element={<Students/>} />
<Route path="StudentLogin" element={<StudentLogin/>} />
<Route path="StudentClass" element={<StudentClass/>} />
<Route path="/LiveClass/:_id" element={<LiveClass/>} />





</Routes>
    </div>
  );
}

export default App;
