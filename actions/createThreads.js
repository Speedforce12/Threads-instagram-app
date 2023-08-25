import axios from "axios";
import { toast } from "sonner";

const createThreads = async (data) => {
  try {
    if (!data) return;

    const thread = await axios.post("/api/create", data);
    if (thread.status === 200) {
      return thread;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export default createThreads;
