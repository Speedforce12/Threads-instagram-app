"use client";

import { experimental_useOptimistic as useOptimistic } from "react";

import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThreadOptions from "./ThreadOptions";
import LikeHeart from "./ThreadCardActions/LikeHeart";
import Share from "./ThreadCardActions/Share";
import Repost from "./ThreadCardActions/Repost";
import Comment from "./ThreadCardActions/Comment";
import LikesReplyInfo from "./LikesReplyInfo";
import MediaViewer from "./MediaViewer";

const ThreadPost = ({ threads, user }) => {
  // handle optimistic liking and unliking threads
  const [optimisticThreads, addOptimisticThread] = useOptimistic(
    threads,

    (currentOptimisticThreads, newThread) => {
      const newOptimisticThreads = [...currentOptimisticThreads];
      const index = newOptimisticThreads.findIndex(
        (t) => t.id === newThread.id
      );

      newOptimisticThreads[index] = newThread;
      return newOptimisticThreads;
    }
  );

  return optimisticThreads.map((thread) => (
    <article className='border-b border-white/20' key={thread.id}>
      <div className='flex w-full px-3  flex-col py-3'>
        <div className='flex md:gap-x-3 space-x-1.5'>
          <div className='flex items-center flex-col'>
            <Link
              href={`/profile/${thread.creatorId}`}
              className='relative h-8 w-8'>
              <Image
                alt=''
                src={thread.creator?.image}
                fill
                className='object-cover rounded-full'
              />
            </Link>
            <div className='relative mt-2 w-0.5 grow rounded-full bg-neutral-800' />
          </div>
          <div className='flex flex-col w-full pr-3'>
            <Link href={`/thread/${thread.id}`}>
              <div className='flex w-full justify-between items-center'>
                <p className='text-sm text-white'>{thread.creator?.username}</p>
                <div className='flex items-center justify-between gap-x-2 '>
                  <span className='text-sm text-neutral-400 font-medium '>
                    {moment(thread.createdAt).fromNow(true)}
                  </span>
                  <ThreadOptions user={user} thread={thread} />
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
            <section className='flex items-center text-white gap-3 mt-4'>
              <LikeHeart
                thread={thread}
                user={user}
                addOptimisticThread={addOptimisticThread}
              />
              <Comment thread={thread} user={user} />
              <Repost />
              <Share threadId={thread.id} />
            </section>
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
