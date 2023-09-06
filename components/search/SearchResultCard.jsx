"use client";

import Image from "next/image";
import Link from "next/link";
import FollowButton from "../FollowButton";

const SearchResultCard = ({ user, currentUser, addOptimisticUsers }) => {
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

          <FollowButton
            user={user}
            addOptimisticUsers={addOptimisticUsers}
            currentUser={currentUser}
          />
        </div>
        <div className='flex justify-start space-x-2  items-center mt-2.5 pb-4  border-b  border-zinc-300/20'>
          <span className='text-white text-sm font-normal'>
            {user.followersCount} follower{user.followersCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
