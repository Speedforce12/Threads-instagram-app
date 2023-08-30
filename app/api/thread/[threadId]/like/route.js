import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return NextResponse.json("unAuthorized", { status: 401 });
    }

    const { threadId } = params;

    const like = await prisma.like.create({
      data: {
        userId: user.id,
        threadId,
      },
    });

    return NextResponse.json(like, { status: 200 });
  } catch (error) {
    console.log("THREADS LIKES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return NextResponse.json("unAuthorized", { status: 401 });
    }

    const { threadId } = params;

    const deletedLike = await prisma.like.deleteMany({
      where: {
        userId: user.id,
        threadId,
      },
    });

    return NextResponse.json(deletedLike, { status: 200 });
  } catch (error) {
    console.log("THREADS REMOVE LIKES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
