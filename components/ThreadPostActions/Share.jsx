import { Send } from 'lucide-react';
import React from 'react'

const Share = () => {
  return (
    <div className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group'>
      <Send className='h-5 w-5' />
    </div>
  );
}

export default Share