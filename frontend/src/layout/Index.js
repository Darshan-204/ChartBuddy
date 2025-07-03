import React from 'react'
import image3 from "../assesst/image3.png"

const AuthLayouts  = ({children}) => {
  return (
    <>
       
        <header className='flex justify-center items-center py-3 h-28 shadow-md bg-white'>
            <img src={image3} className="h-40" alt="ChatApp" width={200} height={140}  />
        </header>
           
       
       {
        children
       }
    
    </>
  )
}

export default  AuthLayouts
