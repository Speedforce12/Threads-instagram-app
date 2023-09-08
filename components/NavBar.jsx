import React from "react";
import MoreOptions from "./MoreOptions";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className='top-0 sticky z-20  bg-opacity-30 backdrop-blur-lg backdrop-filter px-3  bg-[#121417] md:hidden'>
      <div className='flex items-center justify-between h-12 px-2 py-7'>
        <div className='flex items-center'>
          <Link className='space-x-2 px-3' href='/'>
            <Image
              alt='thread logo'
              src='/threads-logo.png'
              width={40}
              height={40}
              className='h-auto'
            />
          </Link>
        </div>

        <div>
          <MoreOptions />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
