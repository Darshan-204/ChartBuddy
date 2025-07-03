async function logout(req,res)
{
    try{
        const cookieOption={
            http:true,
            secure:true
        }

        return res.cookie('token','',cookieOption).json({
               mess:"session out",
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
module.exports=logout;