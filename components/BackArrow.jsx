"use client"

import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackArrow = () => {
    const router = useRouter()
  return (
    <div className='flex items-center justify-start space-x-5 mb-2'>
      <div className='h-11 w-11 hover:bg-neutral-800/70 hover:cursor-pointer flex items-center justify-center rounded-full' onClick={()=> router.back()}>
        <MoveLeft className='text-white' />
      </div>

      <h2 className='text-white font-semibold text-lg'>Thread</h2>
    </div>
  );
}

export default BackArrow