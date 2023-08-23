import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LikesReplyInfo = () => {
    return (
      <>
        <div className='flex -space-x-3'>
          <Image
            alt='avatar'
            src='/avatar.png'
            width={25}
            height={25}
            className='h-5 w-5 border border-gray-300 object-cover rounded-full'
          />
          <Image
            alt='avatar'
            src='/avatar.png'
            width={25}
            height={25}
            className='h-5 w-5 object-cover rounded-full border border-gray-300'
          />
          <Image
            alt='avatar'
            src='/avatar.png'
            width={25}
            height={25}
            className='h-5 w-5 object-cover rounded-full border border-gray-300'
          />
        </div>

        <div className='flex items-center space-x-2 ml-3'>
          <Link
            href={`/thread/${125}`}
            className='text-neutral-400 text-sm hover:underline-offset-2 hover:underline font-medium'>
            3 replies
          </Link>
          <div className='rounded-full bg-neutral-600 h-1.5 w-1.5' />
          <p className='text-neutral-400 text-sm font-medium'>10 likes</p>
        </div>
      </>
    );
}

export default LikesReplyInfo