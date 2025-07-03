const mongoose=require("mongoose")
async function connectDB()
{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        const connection=mongoose.connection
        connection.on('connected',()=>
        {
            console.log("connected to db");
        })
        connection.on('error',()=>
        {
            console.log("something is wrong in mongodb : "+error);
        })

    }
    catch(err)
    {
        console.log("something is wrong in mongoose connection : "+err);
    }
}
module.exports=connectDB;