import ThreadForm from "@/components/createThreads/ThreadForm";
import ThreadPost from "@/components/threadCard/ThreadPost";
import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await fetchUser();

  if (!user?.isOnboarded) {
    redirect("onboarding");
  }

  const threads = await prisma.thread.findMany({
    include: {
      attachments: true,
      creator: {
        select: {
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc"
    },
    
  });

  console.log(threads);

  return (
    <div className='flex flex-col flex-1 mt-14 w-full px-4'>
      <div className='p-3'>
        <ThreadForm user={user} />
      </div>
      {threads.map((thread) => (
        <div className='my-5 border-t border-b border-white/30' key={thread.id}>
          <ThreadPost thread={thread} />
        </div>
      ))}
    </div>
  );
}
