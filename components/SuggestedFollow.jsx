import Image from "next/image";
import React from "react";
import Link from "next/link";
import FollowButton from "./FollowButton";

const SuggestedFollow = ({ suggestion, addOptimisticUsers, currentUser }) => {
  console.log(suggestion)
  return (
    <div className='flex items-center justify-between w-full dark:hover:bg-neutral-900 hover:bg-neutral-300 p-2 rounded-md cursor-pointer'>
      <Link href={`/profile/${suggestion.id}`} className='flex items-center gap-2'>
        <div className='h-10 w-10 relative'>
          <Image
            src={suggestion.image}
            alt={suggestion.username}
            className='object-cover rounded-full'
            fill
          />
        </div>
        <div>
          <p className='dark:text-white text-gray-800 font-bold text-sm hover:underline'>
            {suggestion.username}
          </p>
          <p className='dark:text-muted/30 text-gray-400 dark:font-extralight font-medium text-xs'>
            @{suggestion.username}
          </p>
        </div>
      </Link>
      <FollowButton
        addOptimisticUsers={addOptimisticUsers}
        user={suggestion}
        currentUser={currentUser}
      />
    </div>
  );
};

export default SuggestedFollow;
