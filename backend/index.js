const express=require("express")
const cors=require("cors")
const connectDB=require("./config/connectDB")
require('dotenv').config()
const cookiesParser=require("cookie-parser")
// const app=express()
const {app,server}=require("./socket/index")
const router=require("./router/index")
app.use(cors({
    origin:process.env.Frontend_url,
    credentials:true
}))
app.use(express.json());
app.use(cookiesParser())

//api endpoint
app.use("/api",router);

connectDB().then(()=>
{
    const PORT=process.env.port|| 8080;  // when the 8000 port busy in systen when the env taken the free port to run the application
    server.listen(PORT,()=>{
    console.log("server running at: "+PORT)
      })

})

