import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import Avatar from '../component/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {
  const [data,setdata]=useState({password:""})
  const dispatch=useDispatch();
  const location=useLocation();
  // console.log("location: ",location)
  useEffect(()=>{
        if(!location?.state?.name)
        {
          navigate('/email');
        }
  },[])
    const navigate=useNavigate();
    const handleOnChange =(e)=>
      {
          setdata({...data,[e.target.name]:e.target.value});
      }
      
      const handleSubmit=async(e)=>
      {
         e.preventDefault();
          const Url=`${process.env.REACT_APP_BACKEND_URL}/api/password`;
          try{

             const response= await axios(
              {
                method:"post",
                url:Url,
            data:{
              userId:location?.state?._id,
              password:data.password
            },
            withCredentials:true
              }
             );
             
             if(response.data.success)
             {
              dispatch(setToken(response?.data?.token));
              localStorage.setItem("token",response?.data?.token);

              toast.success(response?.data?.mess);
              navigate('/')
              setdata({password:""});
              
             }
             else{
              toast.error(response?.data?.mess);
             }
             
          }
          catch(err)
          {
             toast.error(err?.response?.data?.mess);
          }
        }
        const bgColor=["text-slate-400","text-red-400","text-orange-400","text-amber-400","text-yellow-400","text-lime-400","text-green-400",
          "text-emerald-400","text-teal-400","text-cyan-400","text-sky-400","text-blue-400","text-indigo-400","text-violet-400","text-fuchsia-400",
          "text-pink-400","text-rose-400"
      ]
      const randomNumber=Math.floor(Math.random()*(17-0)+0);

  return (
    <div className='mt-8'>
        <div className='bg-white w-full max-w-sm rounded overflow-hidden p-4 py-6 mx-auto'>
          <div className='w-fit mx-auto '>
             <Avatar width={70} height={70} name={location?.state?.name} randNum={randomNumber} />
          </div>
          <div className='flex flex-col justify-center items-center font-semibold p-0.5'>
          <h2>{location?.state?.email}</h2>
          <h2 className={`capitalize ${bgColor[randomNumber]}`}>{location?.state?.name}</h2>
          </div>
            {/* <h3 className='flex justify-center font-semibold textColor' > Welcome to Chat App!</h3> */}
            <form className='grid gap-3 mt-4' onSubmit={handleSubmit}>
              <div>

              </div>
                 
                 <div className='flex flex-col gap-1 px-2 font-semibold'>
                    <label htmlFor='password'>Password : </label>
                    <input type="password" id='password' name='password' value={data.password} onChange={handleOnChange} placeholder='enter your password' className='bg-slate-100 px-2 py-0.5 focus:outline-primary' required/>
                 </div>
                 
                 
                 <button className='bg-primary text-base px-4 py-1 mt-2 text-white font-semibold hover:bg-secondary rounded leading-relaxed tracking-wide'>
                  Check Password</button>
                 
            </form>
            <p className='text-sm mt-2 flex justify-center'>New User ?  <Link className=' pl-1 font-semibold hover:text-primary hover:underline' to={"/register"}> Register </Link>  / <Link to={'/forgot-password'} className='pl-1 font-semibold hover:text-primary hover:underline'>Forgot_Password</Link></p>
        </div>
    </div>
  )
}

export default CheckPasswordPage




