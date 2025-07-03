import React, { useEffect, useRef, useState } from 'react'
import AvatarMain from './AvatarMain';
import uploadFile from '../helper/UploadFile';
import Divider from './Divider';
import axios from "axios"
import toast from "react-hot-toast"
import {setUser} from "../redux/userSlice"
import {useDispatch} from "react-redux"

const EditUserDetails = ({onclose,data}) => {
  const dispatch=useDispatch();
    const [data1,setdata1]=useState({
        name:"",
        profile_pic:""
    })
    // console.log(data);
    useEffect(()=>
    {
      setdata1((preve)=>
      {
        return{
          ...preve,...data
        }
      })
    },[data])
    const handleOnChange=(e)=>
    {
      const {name,value}=e.target;
      setdata1((preve)=>
      {
          return{...data1,[name]:value}
      })
      // setdata1({...data1,[e.target.name]:e.target.vale});
    }
    const uploadRef=useRef();
  

    // to get the url fro image 
    const handleUploadPhoto=async(e)=>
    { 
      const file=e.target.files[0];
      const uploadPhoto= await uploadFile(file);
      setdata1((preve)=>
      {
        return{...preve,profile_pic:uploadPhoto?.url}
        
      })

    }

    const handleSubmit=async(e)=>
    {
      e.preventDefault();
      e.stopPropagation();
      
      
      try{
        const URL=`${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response=await axios({
        method:'post',
        url:URL,
        data:data1,
        withCredentials:true

      });
      console.log("resp",response)
      toast.success(response?.data?.mess);
      if(response.data.success)
      {
         dispatch(setUser(response?.data?.data))
         onclose();
      }
      }
      catch(err)
      {
        toast.error(err?.response?.data?.mess)
        console.log("editUser",err);
      }
    }
    const handleDirection=(e)=>
    {
      e.preventDefault();
      e.stopPropagation();
      uploadRef.current.click();
    }
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-gray-600 bg-opacity-40 flex justify-center items-center z-10'>
      <div className='bg-white  py-6 px-6 p-4 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile Detail</h2>
        <p className='text-sm'>Edit User Details </p>
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-0.5'>
                <label htmlFor='name'>Name :</label>
                <input type='text' 
                className='w-full py-1 focus:outline-primary border-0.5'
                name="name" id='name' value={data1?.name} onChange={handleOnChange}/>
            </div>
            <div>
              <div>Photo :</div>
              <div >
              <label htmlFor='profile_pic' className='my-1 flex items-center gap-4'>
                <AvatarMain width={35} height={35} imageUrl={data1.profile_pic} name={data1?.name}/>
                <button onClick={handleDirection}  className='font-semibold cursor-pointer hover:text-primary hover:underline'>Change Photo</button>
                <input type='file' id='profile_pic' name='profile_pic' ref={uploadRef} className='hidden' onChange={handleUploadPhoto}/>
                </label>
              </div>
              
            </div>
            <Divider/>
            <div className='flex gap-2 w-fit ml-auto'>
              <button onClick={onclose} className='border-primary border hover:bg-primary hover:text-white px-4 py-1 rounded'> Cancel</button>
              <button onClick={handleSubmit} className='border-primary bg-primary hover:bg-secondary text-white border rounded px-4 py-1'>Save</button>
            </div>
        </form>

      </div>

    </div>
  )
}

export default React.memo(EditUserDetails)
