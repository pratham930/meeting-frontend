import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// import { isMessage } from './schemaValidators'

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001/api',
  // prepareHeaders(headers) {
  //   return headers;
  // },
  // credentials: "include"
 
}),
 
tagTypes: ['Adress','User','Class','Join','Student'],


//post request
  endpoints: (builder) => ({


    singupProfile: builder.mutation({
      query: (data) => {
      return{
     url:'register',
    method:'POST',
    body:data
                }},
                invalidatesTags: ['User'],  
              }),


    loginProfile: builder.mutation({
      query: (user) => {
     return{
    url:'login',
    method:'POST',
    body:user,
    headers: {
      'content-type':"application/json",
  },}},
  invalidatesTags: ['User'],
}),



joinMeeting: builder.mutation({
    query: ({Data,token}) => {
     return{
     url:'joinMeeting',
     method:'POST',
        body:Data,
        headers: {
  'authorization': `Bearer ${token}`,
  },


}},
invalidatesTags: ['Join'],
}),
 





getAllUser: builder.query({
  query: () => ({
  
      url: `getAllUser`,
      method: 'GET',
     
}),
providesTags: ['User'],

}),

// joinMeeting



userProfile: builder.query({
  query: (token) => ({
  
      url: `about`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
      providesTags: ['User'],
})

}),


OnlineStudents: builder.query({
  query: (_id) => ({
    // url: `GetAdressbyId/${_id}`,
      url:`OnlineStudents/${_id}`,
      method: 'GET',
      
     
}),

providesTags: ['Join'],
}),




getAllTeacher: builder.query({
  query: (token) => ({
  
      url: `getAllTeacher`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
}),
providesTags: ['User'],

}),



GetAllMeeting: builder.query({
  query: (token) => ({
  
      url: `GetAllMeeting`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['User'],
})

}),

//new colleage

// createClass

createClass: builder.mutation({
  query: ({actualData,token}) => ({
 
url:'createClass',
method:'POST',
body:actualData,
headers: {
  'authorization': `Bearer ${token}`,
  },


invalidatesTags: ['Class'],


})  }),


getAllClass: builder.query({
  query: (token) => ({
  
      url: `getAllClass`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['Class'],
})

}),

getClassByTeacher: builder.query({
  query: (token) => ({
  
      url: `getClassByTeacher`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['Class'],
})

}),




//new Student





getClassByTeacher: builder.query({
  query: (token) => ({
  
      url: `getClassByTeacher`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['Class'],
})

}),


getAllStudentAddedByTeacher: builder.query({
  query: (token) => ({
  
      url: `getClassByTeacher`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['Class'],
})

}),




getAllStudentByClassId: builder.query({
  query: ({_id,token}) => ({
  
      url: `getAllStudentByClassId/${_id}`,
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        },
     
      providesTags: ['Student'],
})

}),

studentLogin: builder.mutation({
  query: (user) => {
 return{
url:'studentLogin',
method:'POST',
body:user,
headers: {
  'content-type':"application/json",
},}},
invalidatesTags: ['Student'],
}),




joinClass: builder.mutation({
  query: ({Data,token}) => {
   return{
   url:'joinClass',
   method:'POST',
      body:Data,
      headers: {
'authorization': `Bearer ${token}`,
},


}},
invalidatesTags: ['Join'],
}),


leftClass: builder.mutation({
  query: ({data,token}) => {
 return{
url:'leftClass',
method:'PATCH',
body:data,
headers: {
  'authorization': `Bearer ${token}`,
  },


}},
invalidatesTags: ['Join'],
}),




// getMessages: builder.query({
//   query: (channel) => `messages/${channel}`,
//   async onCacheEntryAdded(
//     arg,
//     { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
//   ) {
//     // create a websocket connection when the cache subscription starts
//     // const ws = new WebSocket('ws://localhost:8080')
//     // const ws = io("ws://localhost:3000");
//     const socket = io("ws://192.168.1.38:3000");

//     try {
//       // wait for the initial query to resolve before proceeding
//       await cacheDataLoaded

//       // when data is received from the socket connection to the server,
//       // if it is a message and for the appropriate channel,
//       // update our query result with the received message
//       const listener = (event) => {
//         const data = JSON.parse(event.data)
//         console.log(data)
//         // if (!isMessage(data) || data.channel !== arg) return

//         // updateCachedData((draft) => {
//         //   draft.push(data)
//         // })
//       }

//       socket.addEventListener('message', listener)
//     } catch {
//       // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
//       // in which case `cacheDataLoaded` will throw
//     }
//     // cacheEntryRemoved will resolve when the cache subscription is no longer active
//     await cacheEntryRemoved
//     // perform cleanup steps once the `cacheEntryRemoved` promise resolves
//     socket.close()
//   },
// }),




}),

})

export const { useLoginProfileMutation,
  useSingupProfileMutation,
  useGetMessagesQuery,
  useGetMessagesMutation,
  useGetAllUserQuery,
  useOnlineStudentsQuery,
  useGetAllMeetingQuery,
  useJoinMeetingMutation,
  useLeftMeetingMutation,
 useUserProfileQuery,
useGetAllTeacherQuery,
 

//class
useGetAllClassQuery,
useGetClassByTeacherQuery,
useCreateClassMutation,
//student
useStudentLoginMutation,
useJoinClassMutation,
useLeftClassMutation,
useGetAllStudentAddedByTeacherQuery,
useGetAllStudentByClassIdQuery,

 } = profileApi;

// const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


// import { io } from "socket.io-client";

// const socket = io("ws://localhost:3000");

// // send a message to the server
// socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// // receive a message from the server
// socket.on("hello from server", (...args) => {
//   // ...
// });

// // import { Server } from "socket.io";

// const io = new Server(3000);

// io.on("connection", (socket) => {
//   // send a message to the client
//   socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

//   // receive a message from the client
//   socket.on("hello from client", (...args) => {
//     // ...
//   });
// });