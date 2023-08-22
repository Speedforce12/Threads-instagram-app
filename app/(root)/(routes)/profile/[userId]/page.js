import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
  const user = await currentUser();
  return (
    <div className='border border-white/20 rounded-md items-center  flex flex-col mt-16 text-white md:mx-auto px-3 mx-3'>
      <div className='flex items-center justify-between  w-full'>
        <div className='flex flex-col'>
          <h2 className='font-semibold text-lg'>{user.firstName}</h2>
          <p className='text-sm font-medium text-neutral-400'>
            @{user.username}
          </p>

          <span className='mt-3 text-sm font-medium pb-2.5'>
            Just being me as usual
          </span>
          <div className="'pt-3 flex  gap-4 items-center">
            <span className='flex items-center gap-2 text-sm font-semibold'>
              28<p className='text-neutral-400'>Following</p>
            </span>
            <span className='flex items-center gap-2 text-sm font-semibold'>
              0<p className='text-neutral-400'>Followers</p>
            </span>
          </div>
        </div>

        <div className='h-16 w-16 relative'>
          <Image
            src={user.imageUrl}
            alt={user.firstName}
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
