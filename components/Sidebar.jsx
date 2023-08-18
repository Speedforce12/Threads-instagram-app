"use client";

import { routes } from "@/constants/constant";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = ({ userId, userImage }) => {
  const path = usePathname();

  return (
    <aside className="sticky left-0 top-0 hidden h-screen  w-60 flex-col justify-between border-r-[0.5px] border-gray-50/20 p-3 md:flex">
      <div className="flex flex-col justify-start">
        <Link className="my-7 flex items-center space-x-2 px-3" href="/">
          <Image
            alt="thread logo"
            src="/threads-logo.png"
            width={24}
            height={24}
            className="h-auto"
          />
          <h1 className="text-2xl font-bold text-white">Threads</h1>
        </Link>

        <div className="flex flex-col space-y-3">
          {routes.map((route) => (
            <Link
              key={route.label}
              href={route.path}
              className={cn(
                "group w-full rounded-md  py-2.5 text-lg font-semibold hover:bg-neutral-800",
                path === route.path && "bg-neutral-700 font-bold",
              )}
            >
              <div className="flex w-full items-center gap-x-2 px-3 text-white">
                {path === route.path ? (
                  <route.active className="h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105" />
                ) : (
                  <route.icon className="h-7 w-7 transition-all duration-200 ease-out group-hover:scale-105" />
                )}
                <p className="text-sm"> {route.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href={`/profile/${userId}`}
          className="group w-full rounded-md  py-2.5 text-lg font-semibold hover:bg-neutral-800"
        >
          <div className="flex w-full items-center gap-x-2 px-3 text-white">
            <Image
              src={userImage || "/avatar.png"}
              alt="dee"
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
            <p className="text-sm">Profile</p>
          </div>
        </Link>
      </div>

      <div>
        <div className="mb-3  flex cursor-pointer items-center space-x-2 rounded-md px-2 py-2.5 text-white hover:bg-neutral-800  ">
          <Menu className="h-8 w-8" />
          <p className="text-sm font-medium">More</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
