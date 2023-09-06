import Image from "next/image";
import React from "react";
import Link from "next/link";
import FollowButton from "./FollowButton";

const SuggestedFollow = ({ suggestion, addOptimisticUsers, currentUser }) => {
  return (
    <div className='flex items-center justify-between w-full hover:bg-neutral-900 p-2 rounded-md'>
      <Link href='profile/user' className='flex items-center gap-2'>
        <div className='h-10 w-10 relative'>
          <Image
            src={suggestion.image}
            alt={suggestion.username}
            className='object-cover rounded-full'
            fill
          />
        </div>
        <div>
          <p className='text-white font-bold text-sm hover:underline'>
            {suggestion.username}
          </p>
          <p className='text-muted/70 font-extralight text-xs'>
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
