import { Repeat2 } from 'lucide-react';
import React from 'react'

const Repost = () => {
  return (
    <div className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group'>
      <Repeat2 className='h-5 w-5 group-hover:text-green-500' />
    </div>
  );
}

export default Repost