"use client"

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const SuggestedFollow = () => {
  return (
    <div className='flex items-center justify-between w-full hover:bg-neutral-900 p-2 rounded-md'>
      <Link href='profile/user' className='flex items-center gap-2'>
        <div className='h-10 w-10 relative'>
          <Image
            src='/avatar.png'
            alt='OnePLus Security'
            className='object-cover rounded-full'
            fill
          />
        </div>
        <div>
          <p className='text-white font-bold text-sm hover:underline'>
            OnePlus Security
          </p>
          <p className='text-muted/70 font-extralight text-xs'>
            @OnePlusSecurity
          </p>
        </div>
      </Link>
      <Button className='text-sky-500 rounded-full hover:text-sky-200 font-medium text-sm transition-colors duration-300 py-1 px-3 z-20'>
        Follow
      </Button>
    </div>
  );
};

export default SuggestedFollow;
