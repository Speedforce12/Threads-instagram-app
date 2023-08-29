import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const POST = async (request, { params }) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return NextResponse.json("unAuthorized", { status: 401 });
    }

    const { threadId } = params;

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        likes: {
          push: threadId,
        },
      },
    });

    if (updatedUser) {
      revalidatePath("/");
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json(updatedUser, { status: 200 });
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

    let likes = [...(user.likes || [])];
    likes = likes.filter((c) => c !== threadId);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        likes,
      },
    });

    if (updatedUser) {
      revalidatePath("/");
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("THREADS REMOVE LIKES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
