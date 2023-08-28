import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";

export const useThreadLike = async (threadId) => {
  if (!threadId) {
    throw new Error("Thread ID is required");
  }

  const { data: user } = await axios.get("/api/user");
  console.log(user);

  if (!user) {
    return redirectToSignIn();
  }

  const likedThreads = user.likes;
  const isLiked = likedThreads.includes(threadId);

  console.log(isLiked);

  const toggleThreadLike = () => {
    if (isLiked) {
      axios.patch(`/api/thread/${threadId}/like`);
    } else {
      axios.delete(`/api/thread/${threadId}/like`);
    }
  };

  return {
    isLiked,
    toggleThreadLike,
  };
};
