import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const DELETE = async (request, {params}) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return NextResponse.json("unAuthorized", { status: 401 });
    }

    const { threadId } = params;

    const deletedThread = await prisma.thread.deleteMany({
      where: {
        creatorId: user.id,
        id: threadId,
      },
    });

    return NextResponse.json(deletedThread, { status: 200 });
  } catch (error) {
    console.log("THREADS DELETED", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
