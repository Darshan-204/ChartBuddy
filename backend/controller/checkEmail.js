const UserModel = require("../models/UserModel");

async function checkEmail(req,res)
{
    try
    {
      const {email}=req.body;
      const checkemail=await UserModel.findOne({email}).select("-password");
      if(!checkemail)
      {
        return res.json({
            mess:"user is not exist",
            error:true,
            success:false
        })
      }
      return res.status(200).json({
        mess:"email is verified",
        data:checkemail,
        error:false,
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
module.exports=checkEmail;