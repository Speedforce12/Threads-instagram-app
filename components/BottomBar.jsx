"use client";

import { routes } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = ({ userId, userImage }) => {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 left-0 right-0 z-30 flex w-full flex-1 bg-[#10101299] px-3 opacity-80 backdrop-blur-lg backdrop-filter md:hidden'>
      <div className='flex w-full items-center justify-between space-x-2'>
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.path}
            className='group  w-full rounded-t-md py-2.5'>
            <div className='flex w-full items-center justify-center gap-x-2 px-3 text-white'>
              {pathname === route.path ? (
                <route.active className='h-6 w-6' />
              ) : (
                <route.icon className='h-6 w-6' />
              )}
            </div>
          </Link>
        ))}

        <Link
          href={`/profile/${userId}`}
          className='group w-full rounded-md  py-2.5 text-lg font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200'>
          <div className='w-full px-3 flex items-center justify-center'>
            <Image
              src={userImage || "/avatar.png"}
              alt='dee'
              width={30}
              height={30}
              className='rounded-full object-cover'
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
