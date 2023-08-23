import React from 'react'
import { BsChat } from 'react-icons/bs';

const Comment = () => {
  return (
    <div className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group group'>
      <BsChat size={18} className=' group-hover:fill-sky-600' />
    </div>
  );
}

export default Comment