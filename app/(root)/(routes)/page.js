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


  return (
    <div className='flex flex-col flex-1 md:mt-14 mt-10 w-full mx-auto px-7'>
      <div className='p-3'>
        <ThreadForm user={user} />
      </div>
      <div className="mb-10">
        {threads.map((thread) => (
          <div className='border-t border-white/30' key={thread.id}>
            <ThreadPost thread={thread} />
          </div>
        ))}
      </div>
    </div>
  );
}
