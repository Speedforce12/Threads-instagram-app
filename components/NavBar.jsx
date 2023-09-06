import { UserButton } from "@clerk/nextjs";
import React from "react";

const NavBar = () => {
  return (
    <header className='top-0 sticky z-20  bg-opacity-30 backdrop-blur-lg backdrop-filter px-5  bg-[#121417] md:hidden'>
      <div className='flex items-center justify-between h-12 px-2 py-7'>
        <div className='flex items-center'>
          <h1 className='text-2xl dark:text-white text-black font-medium'>Threads</h1>
        </div>

        <div>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
