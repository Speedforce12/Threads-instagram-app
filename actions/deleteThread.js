import axios from "axios";
import { toast } from "sonner";

const deleteThread = async (threadId) => {
  try {
    if (!threadId) return;

    const deletedThread = await axios.delete(`/api/thread/${threadId}/delete`);
    if (deletedThread.status === 200) {
      return deletedThread;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

export default deleteThread;
