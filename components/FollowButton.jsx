"use client";

import React from "react";
import { Button } from "./ui/button";
import { handleFollowingUser } from "@/lib/followUnfollowUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FollowButton = ({ user, addOptimisticUsers, currentUser }) => {
  const router = useRouter();

  const handleFollowUnfollow = async (e) => {
    e.preventDefault();
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
      router.refresh();
    }
  };
  return (
    <Button
      onClick={handleFollowUnfollow}
      className={cn(
        " dark:shadow-md shadow font-bold bg-transparent hover:bg-inherit  hover:text-white rounded-lg border-neutral-600/70",
        user.user_isFollowing ? "text-neutral-600  hover:text-neutral-600" : "dark:text-white text-black hover:text-black",
        user.id === currentUser.id && "hidden"
      )}
      size='sm'
      variant='outline'>
      {user.user_isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
