import Image from "next/image";
import Link from "next/link";
import React from "react";

const LikesReplyInfo = ({ comments, threadId, likes }) => {
  return (
    <>
      <div className='flex -space-x-3'>
        {comments.slice(0, 3).map((comment, i) => (
          <Image
            key={i}
            alt='avatar'
            src={comment.creator.image}
            width={25}
            height={25}
            className='h-5 w-5 border border-gray-300 object-cover rounded-full'
          />
        ))}
      </div>

      <div className='flex items-center space-x-2 ml-3'>
        <Link
          href={`/thread/${threadId}`}
          className='text-neutral-400 text-sm hover:underline-offset-2 hover:underline font-medium'>
          {comments.length > 1
            ? `${comments.length} replies`
            : `${comments.length} reply`}
        </Link>
        <div className='rounded-full bg-neutral-600 h-1.5 w-1.5' />
        <p className='text-neutral-400 text-sm font-medium'>{likes} likes</p>
      </div>
    </>
  );
};

export default LikesReplyInfo;
