const getUserDtailFromToken = require("../helpers/getUserDetailFromToken");

async function UserDetail(req,res)
{
    try{
        const token=req.cookies.token || "";
        // console.log(token);
        const user=await getUserDtailFromToken(token);
        // console.log(user);
        return res.json({
            mess:"user detail",
            data: user
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
module.exports=UserDetail;