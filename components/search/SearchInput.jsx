"use client";

import { useDebouncedCallback } from "use-debounce";
import { Search, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import SearchResultCard from "./SearchResultCard";
import { experimental_useOptimistic as useOptimistic } from "react";

const SearchInput = ({ users, currentUser }) => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [optimisticUsers, addOptimisticUsers] = useOptimistic(
    users,
    (currentOptimisticUsers, newUser) => {
      const newOptimisticUsers = [...currentOptimisticUsers];
      const index = newOptimisticUsers.findIndex(
        (user) => user.id === newUser.id
      );

      newOptimisticUsers[index] = newUser;
      return newOptimisticUsers;
    }
  );

  const debounced = useDebouncedCallback((value) => {
    filterUsers(value);
  }, 200);

  useEffect(() => {
    setFilteredUsers(optimisticUsers);
  }, [optimisticUsers]);

  const filterUsers = (searchTerm) => {
    const filtered = optimisticUsers.filter((user) =>
      user.username.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debounced(newQuery);
  };

  const handleCancel = () => {
    setQuery("");
    setFilteredUsers(optimisticUsers);
  };
  return (
    <div className='items-center  space-y-4 w-full'>
      <div className='border rounded-2xl border-neutral-700 flex items-center p-2'>
        <Search className='text-gray-500' size={20} />
        <Input
          type='text'
          className='bg-transparent focus-visible:ring-0 border-none focus-visible:ring-black focus-visible:ring-offset-0 text-white placeholder:text-gray-500'
          value={query}
          autoFocus
          onChange={handleSearch}
          placeholder='Search'
        />
        {query && (
          <XCircle
            size={20}
            className='text-gray-500 cursor-pointer'
            onClick={handleCancel}
          />
        )}
      </div>

      <div className='py-3 space-y-4'>
        {filteredUsers.map((user) => (
          <SearchResultCard
            key={user.id}
            user={user}
            currentUser={currentUser}
            addOptimisticUsers={addOptimisticUsers}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchInput;