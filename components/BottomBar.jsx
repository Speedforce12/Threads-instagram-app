"use client";

import { routes } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavItem from "./NavItem";
import CreateButton from "./CreateButton";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Search } from "lucide-react";

const BottomBar = ({ userId, userImage, user }) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-30 flex w-full flex-1 bg-[#10101299] px-3 opacity-80 backdrop-blur-lg backdrop-filter md:hidden'>
      <div className='flex w-full items-center justify-between space-x-2'>
        <NavItem icon={<GoHome />} activeIcon={<GoHomeFill />} route={"/"} />
        <NavItem
          icon={<Search />}
          activeIcon={<FaSearch />}
          route={"/search"}
        />
        <CreateButton user={user} />
        <NavItem
          icon={<FaRegHeart />}
          activeIcon={<FaHeart />}
          route={"/activity"}
        />

        <Link
          href={`/profile/${userId}`}
          className='group w-full rounded-md  py-2.5 text-lg font-semibold dark:hover:bg-neutral-800 hover:bg-neutral-200 px-3'>
          <div className='w-full px'>
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
