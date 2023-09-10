"use client";

import { useModalStore } from "@/hooks/useModal";
import { Button } from "./ui/button";
import { TbSquareRoundedPlus } from "react-icons/tb";

const CreateButton = ({ user }) => {
  const { onOpen } = useModalStore();
  return (
    <div
      className='group w-full rounded-md font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200 px-3 py-1'
      onClick={() => onOpen("create", { user })}>
      <Button
        size='icon'
        variant='ghost'
        className='bg-transparent hover:bg-transparent'>
        <TbSquareRoundedPlus className='h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105 text-neutral-500' />
      </Button>
    </div>
  );
};

export default CreateButton;
