"use client";

import Link from "next/link";
import SuggestedFollow from "./SuggestedFollow";

const RightBar = () => {
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

          <SuggestedFollow />
          <SuggestedFollow />
          <SuggestedFollow />
          <SuggestedFollow />
          <SuggestedFollow />
        </ul>
      </div>
    </section>
  );
};

export default RightBar;
