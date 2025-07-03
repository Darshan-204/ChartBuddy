import React from 'react'
import AvatarMain from "./AvatarMain"
import { Link } from 'react-router-dom'

const UserSearchCard = ({user,onclose}) => {
  
  return (
    <Link to={"/"+user?._id} onClick={onclose} className='flex items-center gap-3 lg:p-2 hover:border hover:border-primary rounded border border-transparent border-t-slate-200'>
        <div>
          <AvatarMain width={40} height={40} name={user?.name} userId={user?._id}/>
        </div>
        <div>
           <div className='font-semibold capitalize text-ellipsis line-clamp-1'>
              {user?.name}
           </div>
           <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
        </div>
    </Link>
  )
}

export default UserSearchCard
