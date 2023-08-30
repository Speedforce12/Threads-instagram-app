"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

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
import MediaViewer from "./MediaViewer";

const ThreadPost = ({ threads, user }) => {
  const [optimisticThreads, addOptimisticThread] = useOptimistic(
    threads,

    (currentOptimisticThreads, newThread) => {
      const newOptimisticThreads = [...currentOptimisticThreads];
      const index = newOptimisticThreads.findIndex((t) => t.id === newThread.id);

      newOptimisticThreads[index] = newThread;
      return newOptimisticThreads;
    }
  );

  return optimisticThreads.map((thread) => (
    <article className='border-t border-white/30' key={thread.id}>
      <div className='flex w-full px-3  flex-col'>
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
          <div className='flex flex-col w-full pr-3'>
            <Link href={`/thread/${thread.id}`}>
              <div className='flex w-full justify-between items-center'>
                <p className='text-sm text-white'>{thread.creator.username}</p>
                <div className='flex items-center justify-between gap-2 '>
                  <span className='text-sm text-neutral-400 font-medium '>
                    {moment(thread.createdAt).fromNow(true)}
                  </span>
                  <ThreadOptions />
                </div>
              </div>
              <div className='flex flex-col mt-2'>
                <p className='text-white whitespace-pre-wrap text-sm'>
                  {thread.thread}
                </p>
                {thread.attachments.length > 0 && (
                  <div className='my-3 w-[90%]'>
                    <MediaViewer media={thread.attachments} />
                  </div>
                )}
              </div>
            </Link>
            <div className='flex items-center text-white gap-3 mt-4'>
              <LikeHeart
                thread={thread}
                user={user}
                addOptimisticThread={addOptimisticThread}
              />
              <Comment thread={thread} user={user} />
              <Repost />
              <Share threadId={thread.id} />
            </div>
          </div>
        </div>

        <div className='w-full p-2 flex items-center'>
          <LikesReplyInfo
            comments={thread.comments}
            threadId={thread.id}
            likes={thread.likeCount}
          />
        </div>
      </div>
    </article>
  ));
};

export default ThreadPost;
