"use client";

import { useTheme } from "next-themes";
import {BiMenuAltRight} from "react-icons/bi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

const MoreOptions = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme("light");
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='mb-3 w-full  flex cursor-pointer  rounded-md px-2 py-2.5 items-center hover:text-black text-neutral-400 dark:hover:text-white'>
        <BiMenuAltRight className='h-8 w-8 ' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-black text-white border-neutral-500'>
        <DropdownMenuItem
          className='focus:bg-black focus:text-white cursor-pointer'
          onClick={handleThemeChange}>
          Switch appearance
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-neutral-800' />

        <DropdownMenuItem className='focus:bg-black focus:text-white cursor-pointer'>
          About
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-neutral-800' />

        <DropdownMenuItem className='focus:bg-black focus:text-white cursor-pointer'>
          Report a problem
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-neutral-800' />

        <DropdownMenuItem className='focus:bg-black focus:text-white cursor-pointer'>
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptions;
