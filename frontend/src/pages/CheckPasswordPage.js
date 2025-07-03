import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helper/UploadFile';
import axios from "axios"
import toast from 'react-hot-toast';
import { HiUserCircle } from "react-icons/hi2";

const ChectEmailPage = () => {
  const [data,setdata]=useState({email:""})
    const navigate=useNavigate();
    const handleOnChange =(e)=>
      {
          setdata({...data,[e.target.name]:e.target.value});
      }
      
      const handleSubmit=async(e)=>
      {
         e.preventDefault();
          const url=`${process.env.REACT_APP_BACKEND_URL}/api/email`;
          try{
             const response= await axios.post(url,data);
             toast.success(response.data.mess);
             if(response.data.success)
             {
              setdata({email:""});
              navigate('/password',{
                state:response?.data?.data
              })
             }
             
          }
          catch(err)
          {
             toast.error(err?.response?.data?.mess);
          }
        }

  return (
    <div className='mt-8'>
        <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 py-6 mx-auto'>
          <div className='w-fit mx-auto mb-2'>
             <HiUserCircle size={70} color='#53bedb'/>
          </div>
            <h3 className='flex justify-center font-semibold textColor' > Welcome to Chat App!</h3>
            <form className='grid gap-3 mt-4' onSubmit={handleSubmit}>
                 
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='email'>Email : </label>
                    <input type="email" id='email' name='email' value={data.email} onChange={handleOnChange} placeholder='enter your Email' className='bg-slate-100 px-2 py-0.5 focus:outline-primary' required/>
                 </div>
                 
                 
                 <button className='bg-primary text-base px-4 py-1 mt-2 text-white font-semibold hover:bg-secondary rounded leading-relaxed tracking-wide'>
                  Check Email</button>
                 
            </form>
            <p className='text-sm mt-2 flex justify-center'>New User ?  <Link className=' pl-1 font-semibold hover:text-primary hover:underline' to={"/register"}> Register</Link></p>
        </div>
    </div>
  )
}

export default ChectEmailPage
