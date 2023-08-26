"use client"

import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThreadOptions from "./ThreadOptions";
import LikeHeart from "./ThreadPostActions/LikeHeart";
import Share from "./ThreadPostActions/Share";
import Repost from "./ThreadPostActions/Repost";
import Comment from "./ThreadPostActions/Comment";
import LikesReplyInfo from "./LikesReplyInfo";

const ThreadPost = ({thread}) => {
  return (
    <article className='flex w-full p-3  flex-col'>
      <div className='flex'>
        <div className='flex items-center flex-col'>
          <Link
            href={`/profile/${thread.creatorId}`}
            className='relative h-10 w-10'>
            <Image
              alt=''
              src={thread.creator.image}
              fill
              className='object-cover rounded-full'
            />
          </Link>
          <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
        </div>
        <Link href={`/thread/${thread.id}`} className='flex flex-col w-full ml-3'>
          <div className='flex w-full justify-between items-center'>
            <p className='text-sm text-white'>{thread.creator.username}</p>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-sm text-neutral-400 font-medium'>
                {moment(thread.createdAt).fromNow(true)}
              </span>
              <ThreadOptions />
            </div>
          </div>
          <div className='flex flex-col mt-2'>
            <p className='text-white whitespace-pre-line text-sm'>
              {thread.thread}
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
          <div className='flex items-center text-white gap-3 mt-4'>
            <LikeHeart />
            <Comment />
            <Repost />
            <Share />
          </div>
        </Link>
      </div>

      <div className='w-full p-2 flex items-center'>
        <LikesReplyInfo />
      </div>
    </article>
  );
};

export default ThreadPost;
