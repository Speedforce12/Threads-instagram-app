import axios from "axios";
import { toast } from "sonner";

export const likeUnlikeThreads = async (threadId, type) => {
  try {
    let request;
    if (type === "unlike") {
      request = () => axios.delete(`/api/thread/${threadId}/like`);
    } else {
      request = () => axios.post(`/api/thread/${threadId}/like`);
    }

    await request();
  } catch (error) {
    toast.error("something went wrong");
  }
};
