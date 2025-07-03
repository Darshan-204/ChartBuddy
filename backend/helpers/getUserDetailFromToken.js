const jwt=require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const getUserDtailFromToken=async(token)=>
{
    // console.log("tooken",token);
    if(!token)
    {
        return {
            mess:"session out",
            logout:true,
            error:true
        }
    }
    const decod=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    const user=await UserModel.findById(decod.userId).select("-password");
    return user;
}
module.exports=getUserDtailFromToken;