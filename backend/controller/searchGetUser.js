const UserModel = require("../models/UserModel");

async function searchGetUser(req,res) {
    try
    {
        const {searchUser}=req.body;
        const query=new RegExp(searchUser,"i","g");
        const user=await UserModel.find({
            "$or":[
                { name:query},
                {email:query}
            ]
        }).select("-password");
        
        return res.json({
            mess:" all usern data is fetched",
            data:user,
            success:true,
            error:false

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
module.exports=searchGetUser;