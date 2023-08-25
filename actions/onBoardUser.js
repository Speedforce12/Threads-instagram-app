import axios from "axios";
import { toast } from "sonner";

const onBoardedUser = async (data) => {
  try {
    if (!data) return;

    const thread = await axios.post("/api/user", data);
    if (thread.status === 200) {
      return thread;
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export default onBoardedUser;
