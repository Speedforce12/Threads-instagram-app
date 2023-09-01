import ThreadForm from "@/components/createThreads/ThreadForm";
import ThreadPost from "@/components/threadCard/ThreadPost";
import getAllThreads from "@/lib/fetchAllThreads";
import { fetchUser } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await fetchUser();

  if (!user?.isOnboarded) {
    redirect("/onboarding");
  }

  const data = await getAllThreads();

  const threads = data.map((thread) => ({
    ...thread,
    user_liked_thread: !!thread.likes?.find((t) => t?.userId === user.id),
    likeCount: thread?.likes?.length,
  }));

  return (
    <div className='flex flex-col flex-1 md:mt-14 mt-10 w-full mx-auto px-7'>
      <div className='p-3 mb-5'>
        <ThreadForm user={user} />
      </div>
      <div className='mb-10'>
        <ThreadPost threads={threads} user={ user} />
      </div>
    </div>
  );
}
