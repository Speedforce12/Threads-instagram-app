"use client";

import { useThreadLike } from "@/hooks/useLikes";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeHeart = ({ threadId, currentUser }) => {
  const { isLiked, toggleThreadLike } = useThreadLike(threadId, currentUser);

  return (
    <div
      className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group'
      onClick={toggleThreadLike}>
      {isLiked ? (
        <FaHeart size={18} className='  text-rose-500' />
      ) : (
        <FaRegHeart size={18} className=' group-hover:fill-rose-500' />
      )}
    </div>
  );
};

export default LikeHeart;
