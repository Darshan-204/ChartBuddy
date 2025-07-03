const UserModel = require("../models/UserModel");
const bcryptjs=require("bcryptjs")
async function registerUser(req,res)
{
    try
    {
        const {name,email,password,profile_pic} = req.body;
        const checkEmail=await UserModel.findOne({email});
        if(checkEmail)
        {
          return  res.status(400).json({
                mess:"User already exist",
                error:true,
                success:false
            })
        }
        //password in hashed password
        const salt= await bcryptjs.genSalt(10);
        const hashpassword= await bcryptjs.hash(password,salt);
        const payload={
            name,
            email,
            profile_pic,
            password:hashpassword
        }
        const userdetail=new UserModel(payload);
       const usersave=await userdetail.save();

       return(res.status(201).json({
        mess:"User is created successfully",
        data:payload,
        success:true,
        error:false
       }))

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
module.exports=registerUser;