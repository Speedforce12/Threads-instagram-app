import Image from "next/image";
import Link from "next/link";
import React from "react";
import MoreOptions from "./MoreOptions";
import NavItem from "./NavItem";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Search } from "lucide-react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { TbSquareRoundedPlus, TbSquareRoundedPlusFilled } from "react-icons/tb";

const TopBar = ({ userId, userImage }) => {
  return (
    <div className='top-0 sticky z-40 dark:bg-[#10101299] bg-[#fbfbfe99]  backdrop-blur-xl backdrop-filter hidden md:block'>
      <div className='flex items-center justify-between h-16'>
        <Link className='space-x-2 px-3' href='/'>
          <Image
            alt='thread logo'
            src='/threads-logo.png'
            width={40}
            height={40}
            className='h-auto'
          />
        </Link>

        <div className='flex h-full  gap-x-10 items-center justify-between w-fit'>
          <NavItem icon={<GoHome />} activeIcon={<GoHomeFill />} route={"/"} />
          <NavItem
            icon={<Search />}
            activeIcon={<FaSearch />}
            route={"/search"}
          />
          <NavItem
            icon={<TbSquareRoundedPlus />}
            activeIcon={<TbSquareRoundedPlusFilled />}
            route={"/search"}
          />
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

        <div>
          <MoreOptions />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
