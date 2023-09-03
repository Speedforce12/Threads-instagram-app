"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { handleFollowingUser } from "@/lib/followUnfollowUser";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SearchResultCard = ({ user, currentUser, addOptimisticUsers }) => {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFollowUnfollow = async (e) => {
    e.preventDefault();
    // setLoading(true);
    try {
      if (user.user_isFollowing) {
        addOptimisticUsers({
          ...user,
          user_isFollowing: !user.user_isFollowing,
          followersCount: user.followersCount - 1,
        });
        await handleFollowingUser(user.id, "unfollow");
      } else {
        addOptimisticUsers({
          ...user,
          user_isFollowing: !user.user_isFollowing,
          followersCount: user.followersCount + 1,
        });
        await handleFollowingUser(user.id, "follow");
      }
    } catch (error) {
      toast.error("Failed to complete request");
    } finally {
      // setLoading(false);
      router.refresh();
    }
  };

  console.log(user);

  return (
    <Link href={`/profile/${user.id}`} className='flex  gap-x-4'>
      <div className=' h-9 w-9 relative flex-grow-0 flex flex-col'>
        <Image
          alt={user.username}
          src={user.image}
          fill
          className='object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col  w-full'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='font-bold text-sm text-white hover:underline hover:underline-offset-2'>
              {user.username}
            </span>
            <span className='font-medium text-sm  text-neutral-600'>
              {user.username}
            </span>
          </div>

          <Button
            onClick={handleFollowUnfollow}
            className={cn(
              "text-white font-bold bg-transparent hover:bg-inherit hover:text-white rounded-lg border-neutral-600/70 shadow-md",
              user.user_isFollowing &&
                "text-neutral-600  hover:text-neutral-600",
              user.id === currentUser.id && "hidden"
            )}
            size='sm'
            variant='outline'>
            {user.user_isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
        <div className='flex justify-start space-x-2  items-center mt-2.5 pb-4  border-b  border-zinc-300/20'>
          <span className='text-white text-sm font-normal'>
            {user.followersCount} follower{user.followersCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
