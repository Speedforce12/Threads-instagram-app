"use client";

import { likeUnlikeThreads } from "@/lib/likeUnlikeThreads";
import { redirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeHeart = ({ thread, user, addOptimisticThread }) => {
  const router = useRouter();

  if (!user) {
    return redirectToSignIn();
  }

  const handleLikeUnlike = async () => {
    if (thread.user_liked_thread) {
      addOptimisticThread({
        ...thread,
        likeCount: thread.likeCount - 1,
        user_liked_thread: !thread.user_liked_thread,
      });
      await likeUnlikeThreads(thread.id, "unlike");
    } else {
      addOptimisticThread({
        ...thread,
        likeCount: thread.likes + 1,
        user_liked_thread: !thread.user_liked_thread,
      });
      await likeUnlikeThreads(thread.id, "like");
    }

    router.refresh();
  };

  return (
    <div
      className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group'
      onClick={handleLikeUnlike}>
      {thread.user_liked_thread ? (
        <FaHeart size={18} className='  text-rose-500' />
      ) : (
        <FaRegHeart size={18} className=' group-hover:fill-rose-500' />
      )}
    </div>
  );
};

export default LikeHeart;
