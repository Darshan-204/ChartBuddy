const getUserDtailFromToken = require("../helpers/getUserDetailFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetail(req,res)
{
    try{
        const token=req.cookies.token || "";
        // const token=localStorage.getItem('token');  // Retrieve token from localStorage

        const user=await getUserDtailFromToken(token);
        const {name,profile_pic}=req.body;
        const updateUser=await UserModel.updateOne({_id:user._id},
            {
                name,profile_pic
            }
        );
        // console.log(updateUser,user);
        const userInfromation=await UserModel.findById(user._id);
        return res.json({
            mess:"user is updated successfully",
            data:userInfromation,
            success:true
        })
        
    }
    catch(err)
    {
        return res.status(401).json({
            mess:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=updateUserDetail;