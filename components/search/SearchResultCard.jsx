import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const SearchResultCard = ({ user }) => {
  return (
    <Link href={`/profile/${user.id}`} className='flex  gap-x-4'>
      <div className=' h-9 w-9 relative flex-grow-0 flex flex-col'>
        <Image
          alt={user.username}
          src={user.image}
          fill
          className='object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col  w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='font-bold text-sm text-white hover:underline hover:underline-offset-2'>
              {user.username}
            </span>
            <span className='font-medium text-sm  text-neutral-600'>
              {user.username}
            </span>
          </div>

          <Button
            className='text-white font-bold bg-transparent hover:bg-inherit hover:text-white rounded-lg border-neutral-600/70 shadow-md'
            size='sm'
            variant='outline'>
            Follow
          </Button>
        </div>
        <div className='flex justify-start space-x-2  items-center mt-2.5 pb-4  border-b  border-zinc-300/20'>
          <div className='flex -space-x-2 items-center'>
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
              className='h-5 w-5 border border-gray-300 object-cover rounded-full'
            />
          </div>

          <span className='text-white text-sm font-normal'>{user.followers.length} followers</span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
