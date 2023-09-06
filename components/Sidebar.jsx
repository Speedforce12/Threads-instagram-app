"use client";

import { routes } from "@/constants/constant";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MoreOptions from "./MoreOptions";

const Sidebar = ({ userId, userImage }) => {
  const path = usePathname();

  return (
    <aside className='sticky left-0 top-0 hidden h-screen  w-60 flex-col justify-between border-r-[0.5px] border-gray-50/20 p-3 md:flex'>
      <div className='flex flex-col justify-start'>
        <Link className='my-7 flex items-center space-x-2 px-3' href='/'>
          <Image
            alt='thread logo'
            src='/threads-logo.png'
            width={24}
            height={24}
            className='h-auto'
          />
          <h1 className='text-2xl font-bold dark:text-white text-black'>Threads</h1>
        </Link>

        <div className='flex flex-col space-y-3'>
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.path}
              className={cn(
                "group w-full rounded-md  py-2.5 text-lg font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200",
                path === route.path &&
                  "dark:bg-neutral-700 bg-neutral-400 font-bold"
              )}>
              <div className='flex w-full items-center gap-x-2 px-3 text-white'>
                {path === route.path ? (
                  <route.active className='h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105' />
                ) : (
                  <route.icon className='h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105 text-black dark:text-white' />
                )}
                <p className='text-sm text-black dark:text-white'>
                  {" "}
                  {route.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`/profile/${userId}`}
          className='group w-full rounded-md  py-2.5 text-lg font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200'>
          <div className='flex w-full items-center gap-x-2 px-3 text-white'>
            <Image
              src={userImage || "/avatar.png"}
              alt='dee'
              width={30}
              height={30}
              className='rounded-full object-cover'
            />
            <p className='text-sm text-black dark:text-white '>Profile</p>
          </div>
        </Link>
      </div>

      <div className='mb-3'>
        <MoreOptions />
      </div>
    </aside>
  );
};

export default Sidebar;
