const { JsonWebTokenError } = require("jsonwebtoken");
const UserModel = require("../models/UserModel")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function checkPassword(req,res)
{
    try{
           const {password,userId}=req.body
           const user=await UserModel.findById(userId);
           if(!user)
            {
              return  res.status(400).json({
                    mess:"User not exit",
                    error:true,
                    success:false
                })
            }
            const verifiedPassword=await bcryptjs.compare(password,user.password);
            if(!verifiedPassword)
            {
                return res.status(200).json({
                    mess:"enter the correct passord",
                    success:false,
                    error:true
                })
            }
            const tokendata={
                userId : user._id,
                email:user.email
            }
            const token=await jwt.sign(tokendata,process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            const cookieOption={
                http:true,
                secure:true,
                sameSite: 'lax'
            }
            // localStorage.setItem('token', token); 

            return res.cookie('token',token,cookieOption).status(200).json({
                mess:"login successfully",
                token:token,
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

module.exports=checkPassword;