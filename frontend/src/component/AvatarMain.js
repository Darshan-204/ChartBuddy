import React from 'react'
import { HiUserCircle } from 'react-icons/hi2'
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa";
import { useSelector } from 'react-redux';

const AvatarMain = ({userId,name,imageUrl,width,randNum,height}) => {
    const onlineUser=useSelector(state=>state?.user?.onlineUser);
    let avatarName="";
    const bgColor=["bg-slate-400","bg-red-400","bg-orange-400","bg-amber-400","bg-yellow-400","bg-lime-400","bg-green-400",
        "bg-emerald-400","bg-teal-400","bg-cyan-400","bg-sky-400","bg-blue-400","bg-indigo-400","bg-violet-400","bg-fuchsia-400",
        "bg-pink-400","bg-rose-400"
    ]
    const randomNumber=Math.floor(Math.random()*(17-0)+0);
    
    if(name)
    {
        const splitName=name.split(" ");
        if(splitName.length>1)
        {
            avatarName=splitName[0][0]+splitName[1][0];
        }
        else
        {
            avatarName=splitName[0][0]+splitName[0][1];
        }
    }
    const isOnline=onlineUser.includes(userId);
    console.log("online inf: ",isOnline);
  return (
    <div className='text-slate-800 relative  rounded-full'>
      {
        imageUrl ? (
            <img className='rounded-full' src={imageUrl} width={width} height={height} alt={name}/>
        ):
        (
    name?(
    <div  className={`overflow-hidden h-8 rounded-full uppercase text-sm border font-medium flex justify-center items-center ${bgColor[randomNumber]}`} style={{width:width+"px",height:height+"px"}}>
        {avatarName}
    </div>
        ):(<div title="Profile" style={{width:width+"px",height:height+"px"}} className={`flex items-center`}>
            <FaUserSecret size={35} color='black' />
        </div>)
    )
      }
      {
        isOnline &&(<div className='bg-green-500 p-1 rounded-full absolute bottom-1 right-0 z-10'></div>)
      }
      
    </div>
  )
}

export default AvatarMain
