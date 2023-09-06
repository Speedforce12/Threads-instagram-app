"use client";

import { BsChat } from "react-icons/bs";
import { useModalStore } from "@/hooks/useModal";

const Comment = ({ thread, user }) => {
  const { onOpen } = useModalStore();

  return (
    <div
      className='rounded-full h-8 w-8 dark:hover:bg-neutral-800 hover:bg-neutral-300 cursor-pointer flex items-center justify-center group group'
      onClick={() => onOpen("reply", { thread, user })}>
      <BsChat
        size={18}
        className=' group-hover:fill-sky-600 fill-sky-400 dark:fill-white'
      />
    </div>
  );
};

export default Comment;
