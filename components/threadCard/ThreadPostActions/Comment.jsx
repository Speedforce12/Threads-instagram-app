"use client";

import { BsChat } from "react-icons/bs";
import { useModalStore } from "@/hooks/useModal";

const Comment = ({ thread, currentUser }) => {
  const { onOpen } = useModalStore();

  return (
    <div
      className='rounded-full h-8 w-8 hover:bg-neutral-800 cursor-pointer flex items-center justify-center group group'
      onClick={() => onOpen("reply", { thread, currentUser })}>
      <BsChat size={18} className=' group-hover:fill-sky-600' />
    </div>
  );
};

export default Comment;
