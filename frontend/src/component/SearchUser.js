import React, { useEffect, useState } from 'react'
import { ImSearch } from "react-icons/im";
import CircularLoading from './CircularLoading';
import UserSearchCard from './UserSearchCard';
import toast from "react-hot-toast"
import axios from "axios"
import { useSelector } from 'react-redux';
import { IoCloseSharp } from "react-icons/io5";
const SearchUser = ({onclose}) => {
    const[searchUser,setSearchUser]=useState([])
    const[loading,setLoading]=useState(false);
    const [searchUserLocation,setSearchUserLocation]=useState(false)
    const [searchUserInput,setSearchUserInput]=useState("");
    const user=useSelector(state=>state?.user);
    const emailFilter=user?.email;

    //function for fetch the details of the user
    const handleSearchUser=async()=>
    {
        try{
            setLoading(true);
            const Url=`${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
            const response= await axios.post(Url,{
            searchUser : searchUserInput.trim()
           });
           const filterResponse=response?.data?.data;
           const afterFilter= filterResponse.filter(u => u.email !== emailFilter);
           setLoading(false);
           setSearchUser(filterResponse);


        }
        catch(err)
        {
            toast.errror(err?.response?.data?.mess)
        }
    }
    useEffect(()=>
    {
        handleSearchUser();
    },[searchUserInput])

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-400 bg-opacity-40 p-2 z-10'>
         <div className='w-full max-w-md  mx-auto mt-14'>
            {/* input for searching the user */}
            <div className='bg-white rounded h-14 overflow-hidden flex'>
                <input type='text' onChange={(e)=>setSearchUserInput(e.target.value)} value={searchUserInput} placeholder='search user by name ,email ....'
                className='w-full outline-none font-medium py-1 h-full px-4'/>
                <div className='w-14 h-14 flex justify-center items-center'>
                     <ImSearch size={20} />
                </div>
            </div>
            {/* display the searched user */}

            
            <div className='bg-white mt-2 w-full p-4 z-10'>
                {
                    searchUser.length===0 && !loading &&(<p className='text-center text-slate-500 font-semibold'>No User Found</p>)
                }
                {
                    loading && ( <div className=''><CircularLoading/></div>)
                }
                {
                    searchUser.length!==0 && !loading &&(
                        searchUser.map((user,index)=>
                        {
                            return(
                                <div className='cursor-pointer'>
                                <UserSearchCard key={user._id} user={user} onclose={onclose} className=""/>
                                </div>
                            )
                        })
                    )
                }
                 
            </div>
         </div>
         <div className='fixed top-0 right-0 m-4 text-2xl lg:text-4xl hover:text-white' onClick={onclose}><IoCloseSharp/></div>
    </div>
  )
}

export default SearchUser
