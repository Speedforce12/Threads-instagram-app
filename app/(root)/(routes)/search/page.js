import SearchInput from "@/components/search/SearchInput";
import { fetchAllUsers } from "@/lib/fetchAllUsers";
import React from "react";

const SearchPage = async () => {
  const data = await fetchAllUsers();
  console.log(data);
  return (
    <div className=' mt-8 flex flex-col  p-3'>
      <SearchInput users={data} />
    </div>
  );
};

export default SearchPage;
