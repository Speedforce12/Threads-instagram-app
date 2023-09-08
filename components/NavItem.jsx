"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({ icon: Icon, activeIcon: ActiveIcon, route }) => {
  const path = usePathname();

  return (
    <Link
      href={route}
      className={"group w-full rounded-md  py-2.5 text-lg font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200"}>
      <div className='flex w-full items-center gap-x-2 px-3 text-white'>
        {path === route ? (
          <ActiveIcon.type
            {...ActiveIcon.props}
            className='h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105 dark:text-white text-black'
          />
        ) : (
          <Icon.type
            {...Icon.props}
            className='h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105 text-neutral-500'
          />
        )}
      </div>
    </Link>
  );
};

export default NavItem;
