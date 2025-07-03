const express=require("express")
const {Server}=require("socket.io")
const http=require('http');
const getUserDtailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../models/UserModel");
const { profile } = require("console");
const app=express();
// socket connection 
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:process.env.Frontend_url,
    credentials:true
    }
})

// socket runningat http://localhost:8080/
const onlineUser=new Set();
io.on('connection',async(socket)=>
{
    console.log("connect user",socket.id);
    const token=socket.handshake.auth.token;
    // console.log(token);
    // current user detail 
       const user=await getUserDtailFromToken(token);
    // create a room
      socket.join(user?._id);
      onlineUser.add(user?._id.toString());
      //io.on is used in server level for all user
      io.emit("onlineUser",Array.from(onlineUser));
      //socket.on is for specific individual user
      socket.on("message-page",async(userId)=>
    {
        console.log("userId: ",userId);
        const userDetails=await UserModel.findById(userId).select("-password");
        const payload={
            _id:userDetails?._id,
            name:userDetails?.name,
            email:userDetails?.email,
            profile_pic:userDetails?.profile_pic,
            online:onlineUser.has(userId)
        }
        socket.emit("message-user",payload);
    })


    socket.on('disconnect',()=>
    {
        onlineUser.delete(user?._id);
        console.log("disconnect user",socket.id);
    })
})
module.exports={
    app,server
}