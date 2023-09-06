"use client";

import { Send } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { useOrigin } from "@/hooks/useOrigin";
import { toast } from "sonner";

const Share = ({ threadId }) => {
  const origin = useOrigin();
  const shareLink = `${origin}/thread/${threadId}`;

  const handleShare = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Copied");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full h-8 w-8 dark:hover:bg-neutral-800 hover:bg-neutral-300 cursor-pointer flex items-center justify-center group'>
        <Send
          size={18}
          className='dark:group-hover:text-sky-600 text-sky-400 dark:text-white'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black text-white'>
        <DropdownMenuItem
          className='cursor-pointer focus:bg-neutral-900 focus:text-white'
          onClick={handleShare}>
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Share;
