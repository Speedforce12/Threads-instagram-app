import BackArrow from "@/components/BackArrow";
import MediaViewer from "@/components/threadCard/MediaViewer";
import ThreadOptions from "@/components/threadCard/ThreadOptions";
import { fetchThread } from "@/lib/fetchThread";
import { fetchUser } from "@/lib/fetchUser";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ThreadPage = async ({ params }) => {
  const { threadId } = params;
  const thread = await fetchThread(threadId);
  const user = await fetchUser();

  console.log(thread);
  return (
    <div className='flex flex-col px-3 sm:px-0'>
      <BackArrow />

      <div className='my-2 flex justify-start flex-col'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <div className='h-12 w-12 relative rounded-full border'>
              <Image
                src={thread.creator.image}
                fill
                alt={thread.creator.username}
                className='rounded-full object-cover'
              />
            </div>
            <Link
              href={`profile/${thread.creator.id}`}
              className='font-bold text-sm text-white hover:underline'>
              {thread.creator.username}
            </Link>
          </div>

          <div className='flex items-center justify-between gap-2'>
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
      </div>
    </div>
  );
};

export default ThreadPage;
