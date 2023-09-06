"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";

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
      <DropdownMenuTrigger className='mb-3 w-full  flex cursor-pointer space-x-2 rounded-md px-2 py-2.5 items-center dark:text-white text-black dark:hover:bg-neutral-800 hover:bg-neutral-300 '>
        <Menu className='h-8 w-8 ' />
        <p className='text-sm font-medium'>More</p>
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
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreOptions;
