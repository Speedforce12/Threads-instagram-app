"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa";



const LikeHeart = () => {

  const handleClick = (e) => { 
    e.preventDefault()
  }
    return (
      <div className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group' onClick={handleClick}>
        <FaRegHeart size={18} className=' group-hover:fill-rose-500' />
      </div>
    );
};

export default LikeHeart;
