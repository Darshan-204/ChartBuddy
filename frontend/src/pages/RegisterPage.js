import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helper/UploadFile';
import axios from "axios"
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [data,setdata]=useState(
    {
      name:"",
      email:"",
      password:"",
      profile_pic:""

    })
    const navigate=useNavigate();
    const [uploadPhoto,setUploadPhoto]=useState("");
    const handleOnChangePhoto=async(e)=>
    {
      const file=e.target.files[0];
      setUploadPhoto(file);
      
        
    }
    const handleClearUpLoadPhoto=(e)=>
    {
      e.preventDefault();
      e.stopPropagation();
      setUploadPhoto(null);
    }
    const handleOnChange =(e)=>
      {
          setdata({...data,[e.target.name]:e.target.value});
          // OR 
          // const {name,value}=e.target;
          // setdata((preve)=>{
          //   return{...preve,[name]:value}
          // })
      }
      const func=async()=>
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
      const handleSubmit=async(e)=>
      {
         e.preventDefault();
         func();
          const url=`${process.env.REACT_APP_BACKEND_URL}/api/register`;
          try{
             const response= await axios.post(url,data);
             toast.success(response.data.mess);
             if(response.data.success)
             {
              setdata( {
                name:"",
                email:"",
                password:"",
                profile_pic:""});
             }
             navigate('/email')
          }
          catch(err)
          {
             toast.error(err?.response?.data?.mess);
             navigate('/email')
          }


        
      }
  return (
    <div className='mt-8'>
        <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 py-6 mx-auto'>
            <h3 className='flex justify-center font-semibold textColor' > Welcome to Chat App!</h3>
            <form className='grid gap-3' onSubmit={handleSubmit}>
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='name'>Name : </label>
                    <input type="text" id='name' name='name' value={data.name} onChange={handleOnChange} placeholder='enter your name' className='bg-slate-100 px-2 py-0.5 focus:outline-primary' required/>
                 </div>
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='email'>Email : </label>
                    <input type="email" id='email' name='email' value={data.email} onChange={handleOnChange} placeholder='enter your Email' className='bg-slate-100 px-2 py-0.5 focus:outline-primary' required/>
                 </div>
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='password'>password : </label>
                    <input type="password" id='password' name='password' value={data.password} onChange={handleOnChange} placeholder='enter your password' className='bg-slate-100 px-2 py-0.5 focus:outline-primary' required/>
                 </div>
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='profile_pic'>Profile_pic :
                      <div className='h-14 bg-slate-200 flex justify-center items-center mt-1 border-2 rounded hover:border-primary'>
                        <p className='text-sm font-semibold max-w-[300px] text-ellipsis line-clamp-1'>
                          {
                            uploadPhoto?.name ? uploadPhoto?.name: " Upload Profile Photo"
                          }
                        
                         </p>
                         {
                          uploadPhoto?.name && ( <button  className='text-lg ml-2 hover:text-red-600' onClick={handleClearUpLoadPhoto}><RxCross2/></button>)
                         }
                        
                      </div>
                       </label>
                    <input type="file" id='profile_pic' name='profile_pic'  onChange={handleOnChangePhoto}   className='bg-slate-100 hidden px-2 py-0.5 focus:outline-primary'/>
                 </div>
                 <button className='bg-primary text-base px-4 py-1 mt-2 text-white font-semibold hover:bg-secondary rounded leading-relaxed tracking-wide'>
                  Register</button>
                 
            </form>
            <p className='text-sm mt-2 flex justify-center'>Already have account?  <Link className=' pl-1 font-semibold hover:text-primary hover:underline' to={"/email"}> Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage
