import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

export const useThreadLike = (threadId, currentUser) => {
  const router = useRouter();

  if (!threadId) {
    throw new Error("Thread ID is required");
  }

  const isLiked = useMemo(() => {
    const likedThreads = currentUser.likes || [];
    return likedThreads.includes(threadId);
  }, [threadId, currentUser.likes]);

  const toggleThreadLike = async () => {
    if (!currentUser) {
      return redirectToSignIn();
    }

    try {
      let request;
      if (isLiked) {
        request = () => axios.delete(`/api/thread/${threadId}/like`);
      } else {
        request = () => axios.post(`/api/thread/${threadId}/like`);
      }

      await request();
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return {
    isLiked,
    toggleThreadLike,
  };
};
