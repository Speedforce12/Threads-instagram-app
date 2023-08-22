import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThreadOptions from "./ThreadOptions";
import LikeHeart from "../ThreadPostActions/LikeHeart";
import Share from "../ThreadPostActions/Share";
import Repost from "../ThreadPostActions/Repost";
import Comment from "../ThreadPostActions/Comment";

const ThreadPost = () => {
  return (
    <article className='flex w-full p-3  flex-col'>
      <div className='flex'>
        <div className='flex items-center flex-col'>
          <Link href={`/profile/${156}`} className='relative h-10 w-10'>
            <Image
              alt=''
              src='/avatar.png'
              fill
              className='object-cover rounded-full'
            />
          </Link>
          <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
        </div>
        <div className='flex flex-col w-full ml-3'>
          <div className='flex w-full justify-between items-center'>
            <p className='text-sm text-white'>Ovonee Delpesche</p>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm text-neutral-400 font-medium'>
                {moment([2023, 7, 21]).fromNow(true)}
              </span>
              <ThreadOptions />
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <p className='text-white whitespace-pre-line text-sm'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
              error cum ratione consequuntur. Animi quos porro praesentium!
              Molestias, nesciunt. Dolor tempora voluptates doloremque minima
              laudantium debitis atque repudiandae, nihil deleniti?
            </p>
            <div className='aspect-square relative mt-2.5'>
              <Image
                src='/avatar.png'
                alt=''
                fill
                className='rounded-lg object-cover border border-neutral-600 w-full mt-3'
              />
            </div>
          </div>
          <div className='flex items-center text-white gap-3 my-4'>
            <LikeHeart />
            <Comment />
            <Repost />
            <Share />
          </div>
        </div>
      </div>

      <div className='w-full border p-3'></div>
    </article>
  );
};

export default ThreadPost;
