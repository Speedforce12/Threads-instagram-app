import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  try {
    const user = await fetchUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { threadId } = params;
    const { content, replyStatus } = await request.json();

    if (!content || !replyStatus) {
      return NextResponse.json("No data provided", { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        creatorId: user.id,
        threadId,
        content,
        replyStatus,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("COMMENT THREAD: ", error);
  }
};
