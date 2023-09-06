"use client";

import deleteThread from "@/actions/deleteThread";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ThreadOptions = ({ user, thread }) => {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();

    await deleteThread(thread.id);
    router.refresh();
    router.push("/");
    toast.success("Deleted");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className='text-neutral-600' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-[#181818] text-white border-white/50  shadow-md'>
        {user.id === thread.creatorId && (
          <DropdownMenuItem
            className='focus:bg-neutral-900/50 focus:text-white cursor-pointer focus:bg-neutral-800'
            onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className='focus:bg-neutral-900/50 text-rose-500 focus:text-rose-500 cursor-pointer focus:bg-neutral-800'>
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThreadOptions;
