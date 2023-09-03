import SearchInput from "@/components/search/SearchInput";
import { fetchAllUsers } from "@/lib/fetchAllUsers";
import { fetchUser } from "@/lib/fetchUser";
import React from "react";

const SearchPage = async () => {
  const data = await fetchAllUsers();
  const user = await fetchUser();

  const newUsers = data.map((users) => ({
    ...users,
    user_isFollowing: !!users.followers.find((f) => f.followersId === user.id),
    followersCount: users.followers.length,
  }));


  // console.log(newUsers);


  return (
    <div className=' mt-8 flex flex-col  p-3'>
      <SearchInput users={newUsers} currentUser={user} />
    </div>
  );
};

export default SearchPage;
