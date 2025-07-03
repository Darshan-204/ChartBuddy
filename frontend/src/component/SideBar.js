import React, { useState } from 'react'
import { IoChatboxEllipses } from "react-icons/io5";
import { FaUsersRays } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { useSelector } from 'react-redux';
import AvatarMain from './AvatarMain';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from './SearchUser';

const SideBar = () => {
    const user=useSelector(state=>state?.user);
    const[openUserSearch,setOpenUserSearch]=useState(false);
    const[allUser,setAllUser]=useState([])
    const [editUserOpen,setEditUserOpen]=useState(false);
    
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] '>
      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 flex flex-col justify-between'>
         <div>
               <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 border-b rounded ${isActive && "bg-slate-300"}`} title='Chat'>
                  <IoChatboxEllipses size={25}/>
              </NavLink>
              <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 border-b rounded' onClick={()=>
                {
                  setOpenUserSearch(true);
                }
              } title='Add new friend'>
                   <FaUserPlus size={25}/>
               </div>
              <div className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 border-b rounded' title='Create the group'>
                   <FaUsersRays size={25}/>
               </div>
        </div>

         <div>
            <button title={user?.name} onClick={()=>setEditUserOpen(true)} className='w-12 h-12 pt-1.5 cursor-pointer hover:bg-slate-200 border-t rounded flex justify-center -pl-1'>
               <AvatarMain width={32} name={user?.name} userId={user?._id} imageUrl={user?.profile_pic} />
            </button>

             <button className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 border-t rounded' title='LogOut'>
                <span className='-ml-2'>
                  <BiLogOut size={25}/>
                </span>
                 
             </button>
         </div>
         

      </div>
      <div className=' w-full'>
        <div className='h-16 flex items-center '>
        <h2 className='w-full text-xl p-4 flex justify-center lg:justify-start font-semibold text-slate-800 '> Message</h2>
        </div>
        <div className='bg-slate-200 p-[0.5px]'>

        </div>
        <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll scrollBar'>
              
              {
                allUser.length===0 && (
                  <div className='mt-12'>
                    <div className='flex justify-center items-center mt-4 text-slate-500' >
                    <GoArrowUpLeft className='text-lg' size={40}/> 
                      </div>
                      <p className='text-lg text-center text-slate-400'>
                        Explore users to start a conversion with ...

                      </p>
                    </div>
                )
              }
        </div>
      </div>
      {/* eedit user detail  */}
      {
       editUserOpen && (<EditUserDetails onclose={()=>setEditUserOpen(false)} data={user}/>)
      }

      {/* search the user  */}
      {
        openUserSearch &&(
          <SearchUser onclose={()=>setOpenUserSearch(false)}/>
        )
      }
    </div>
  )
}

export default SideBar
