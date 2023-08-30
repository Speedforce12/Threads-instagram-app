const { default: prisma } = require("@/lib/prismadb");

const getAllThreads = async () => {
  const threads =
    (await prisma.thread.findMany({
      include: {
        attachments: true,
        likes: true,
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
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) || [];

  return threads;
};

export default getAllThreads;
