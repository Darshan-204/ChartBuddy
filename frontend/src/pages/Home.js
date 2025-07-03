import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUser, setsocketConnection, setUser } from '../redux/userSlice'
import SideBar from '../component/SideBar'
import logo from "../assesst/image4.png"
import io from "socket.io-client"
const Home = () => {
  const user=useSelector(state=>state.user);
  const navigate=useNavigate();
  const location=useLocation()
  const basePath=location.pathname==='/';
  // console.log(user)
  const dispatch=useDispatch();
  const fetchUserDetails=async()=>
  {
    const Url=`${process.env.REACT_APP_BACKEND_URL}/api/user-detail`;
    try{
       const response=await axios({
        url:Url,
        withCredentials:true
       })
       dispatch(setUser(response?.data?.data));
       if(response?.data?.data?.logout)
       {
        dispatch(logout());
        navigate('/email');
       }
      //  console.log("user : ",response);
    }
    catch(err)
    {
        console.log(err);
    }
  }
  useEffect(()=>{
     fetchUserDetails();
  },[])
  // socket connection
  useEffect(()=>
  {
    const socketConnection=io(process.env.REACT_APP_BACKEND_URL,{
      auth:{
        token:localStorage.getItem('token')
      }
    });
    socketConnection.on("onlineUser",(data)=>
    {
      console.log(data);
      dispatch(setOnlineUser(data))
    })
    dispatch(setsocketConnection(socketConnection))
  return ()=>{
    socketConnection.disconnect()
  }
  },[])

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"}  lg:block `}><SideBar/></section>
      {/* message component  */}
      <section className={` ${basePath  && "hidden"}  `}>
         <Outlet/>
      </section>
      <div  className={`lg:${!basePath ? "hidden":"flex"} justify-center items-center  flex-col gap-1 hidden -z-10`}>
        <div className=''>
          <img className='-mt-12' src={logo} width={200} alt=''/>
        </div>
        <p className='relative bottom-12 text-lg text-slate-500'>Select user to send message</p>
      </div>
    </div>
  )
}

export default Home
