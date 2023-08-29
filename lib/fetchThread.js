import prisma from "./prismadb";

export const fetchThread = async (threadId) => {
  if (!threadId) return null;

  const thread = await prisma.thread.findUnique({
    where: {
      id: threadId,
    },
    include: {
      attachments: true,
      comments: {
        select: {
          creator: {
            select: {
              image: true,
              id: true,
            },
          },
        },
      },
      creator: {
        select: {
          username: true,
          image: true,
          id:true,
        },
      },
    },
  });

  return thread;
};
