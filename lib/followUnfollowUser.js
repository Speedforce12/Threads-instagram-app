import axios from "axios";
import { toast } from "sonner";

export const handleFollowingUser = async (userId, action) => {

  console.log(action)
  try {
    let request;
    if (action === "unfollow") {
      request = () => axios.delete(`/api/user/${userId}/follow`);
    } else {
      request = () => axios.post(`/api/user/${userId}/follow`);
    }

    await request();
  } catch (error) {
    toast.error("something went wrong");
  }
};
