"use client";

import Link from "next/link";
import SuggestedFollow from "./SuggestedFollow";
import { experimental_useOptimistic as useOptimistic } from "react";

const RightBar = ({ suggestions, currentUser }) => {
  

  const Suggested = suggestions.map((suggest) => ({
    ...suggest,
    user_isFollowing: !!suggest.followers.find((f) => f.followersId === currentUser.id),
    followersCount: suggest.followers.length,
  }));

  const [optimisticSuggestions, addOptimisticSuggestions] = useOptimistic(
    Suggested,
    (currentOptimisticUsers, newUser) => {
      const newOptimisticUsers = [...currentOptimisticUsers];
      const index = newOptimisticUsers.findIndex(
        (user) => user.id === newUser.id
      );

      newOptimisticUsers[index] = newUser;
      return newOptimisticUsers;
    }
  );


  return (
    <section className='md:flex flex-col justify-between h-screen hidden  left-0 top-0 sticky flex-none w-[400px] p-5 mr-10'>
      <div className='flex flex-col mt-8 justify-start w-full'>
        <ul className='space-y-3'>
          <li className='flex items-center justify-between'>
            <p className='text-neutral-400 font-semibold text-sm'>
              Suggested for you
            </p>
            <Link
              href='/people'
              className='text-white font-medium text-sm hover:text-neutral-600 transition-colors duration-300  mr-6'>
              See All
            </Link>
          </li>

          {optimisticSuggestions.map((suggestion) => (
            <SuggestedFollow
              suggestion={suggestion}
              key={suggestion.id}
              addOptimisticUsers={addOptimisticSuggestions}
              currentUser={currentUser}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RightBar;
