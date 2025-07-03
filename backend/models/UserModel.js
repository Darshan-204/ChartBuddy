const mongoose=require("mongoose")
const UserScheme= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide name"]
    },
    email:{
        type:String,
        required:[true,"provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"provide the pasword"]
    },
    profile_pic:{
        type:String,
        default:""
    }
    

},{
    timestamps:true
})
const UserModel=mongoose.model("User",UserScheme);
module.exports=UserModel;