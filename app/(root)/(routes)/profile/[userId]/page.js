import ProfileTabs from "@/components/ProfileTabs";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prismadb";
import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ params }) => {
  const { userId } = params;

  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      following: true,
      followers: true,
      threads: {
        include: {
          attachments: true,
          comments: {
            include: {
              creator: true,
            },
          },
          creator: true,
        },
      },
    },
  });

  console.log(profile);
  return (
    <div className='flex flex-col  w-full  mt-16 px-5 md:px-2'>
      {/* top section */}
      <div className='flex items-center justify-between  w-full mx-auto'>
        <div className='flex flex-col space-y-1'>
          <h2 className='font-semibold text-lg text-white'>
            {profile.username}
          </h2>
          <p className='text-sm font-medium text-neutral-400'>
            @{profile.username}
          </p>
        </div>
        <div className='h-20 w-20 relative'>
          <Image
            src={profile.image}
            alt={profile.username}
            fill
            className='object-contain'
          />
        </div>
      </div>

      {/* middle info */}
      <span className='mt-3 text-sm font-medium pb-2.5 text-white whitespace-pre-wrap text-justify'>
        {profile.bio}
      </span>

      <div className='flex items-center justify-between w-full'>
        <div className='flex gap-5'>
          <span className='flex items-center gap-2 text-sm font-semibold text-white'>
            {profile.following.length}
            <p className='text-neutral-400'>Following</p>
          </span>
          <span className='flex items-center gap-2 text-sm font-semibold text-white'>
            {profile.followers.length}
            <p className='text-neutral-400'>Followers</p>
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <Link href={`https://instagram.com/${"speedter_dee"}`}>
            <Instagram className='text-white' />
          </Link>
        </div>
      </div>

      <div className='flex flex-col pt-4'>
        <div className='flex items-center justify-between mx-auto gap-4'>
          <Button
            variant='outline'
            className='text-white bg-black w-40 py-1 font-semibold'>
            Edit profile
          </Button>

          <Button
            variant='outline'
            className='text-white bg-black w-40 py-1 font-semibold'>
            Share
          </Button>
        </div>
      </div>

      <ProfileTabs profile={profile} />
    </div>
  );
};

export default ProfilePage;
