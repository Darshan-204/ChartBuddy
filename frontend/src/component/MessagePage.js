import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {Link, useParams} from "react-router-dom"
import AvatarMain from './AvatarMain';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";
import uploadFile from '../helper/UploadFile';


const MessagePage = () => {
  const params=useParams()
  // console.log(params.userId);
  const user=useSelector(state=>state?.user)
  const socketConnection=useSelector(state=>state?.user?.socketConnection)
  const[openImVe,setOpenIMVe]=useState(false);
  const[dataUser,setDataUser]=useState({
     _id:"",
    name:"",
    email:"",
    profile_pic:"",
    online:false
   
  })
  const handleImVidUpload=()=>
  {
    setOpenIMVe(preve=>!preve);
  }

  const handleuploadimage=async()=>
  {
    const uploadPhoto_url=await uploadFile(uploadPhoto);
    setdata((preve)=>
     {
       return{
         ...preve,
         profile_pic:uploadPhoto_url?.url
       }
     })
  }




  useEffect(()=>
  {
    if(socketConnection)
    {
      socketConnection.emit("message-page",params.userId)
      socketConnection.on("message-user",(data)=>{
        // console.log("data user:",data);
        setDataUser(data);
      }
    )
    }

  },[socketConnection,params.userId,user])
  return (
    <div>
      <header className='sticky top-0 h-16 bg-white border-l-2 flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'><FaAngleLeft size={25}/></Link>
          <div className='w-10'>
            <AvatarMain width={40} height={40} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id}/>
          </div>
          <div>
            <h3 className='font-semibold text-lg capitalize text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className=' -my-2'>
              {dataUser?.online ?<span className='text-primary text-sm'>online</span>:<span className='text-slate-400 text-sm'>offline</span>}
            </p>
          </div>
        </div>
        <div className='text-lg'>
          <button className='cursor-pointer hover:text-primary'><HiDotsVertical/></button>
          
        </div>
      </header>
      {/* show all message  */}
      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollBar'>
         show all message
      </section>
      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative'>
          <button onClick={handleImVidUpload} className='flex justify-center items-center w-8 h-8 rounded-full  p-2 cursor-pointer hover:bg-primary hover:text-white'>
            <FaPlus size={20}/></button>
          {/* video and image  */}
          {
            openImVe &&
            (
              <div className='bg-white shadow rounded absolute bottom-12 w-32 p-2'>
           <form>
            <label htmlFor='uploadImage' className='flex items-center p-1 rounded px-3 cursor-pointer gap-3 hover:bg-slate-400'>
              <div className='text-primary'>
                  <FaRegImages size={18}/>
              </div>
              <p>image</p>
            </label>
            <label htmlFor='uploadVideo' className='flex items-center cursor-pointer rounded p-1 px-3 gap-3 hover:bg-slate-400'>
              <div className='text-primary'>
                  <MdVideoLibrary size={18}/>
              </div>
              <p>video</p>
            </label>
            <input type="file" id="uploadImage" onChange={handleuploadimage} className='hidden'/>
            <input type="file" id="uploadVideo" onChange={handleuploadvideo}/>
           </form>
          </div>

            )
          }
        </div>
      </section>
    </div>
  )
}

export default MessagePage
