import axios from "axios";
import { toast } from "sonner";

const createComment = async (data, threadId) => {
  try {
    if (!data) return;

    const comment = await axios.post(`/api/thread/${threadId}/comment`, data);
    if (comment.status === 200) {
      return comment;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export default createComment;
