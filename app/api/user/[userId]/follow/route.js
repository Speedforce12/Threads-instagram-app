import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  try {
    const user = await fetchUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = params;

    console.log(userId);

    if (!userId) {
      return new NextResponse("User Id is missing", { status: 400 });
    }

    // update the currently viewing   user followers array
    const updatedCurrentUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        following: {
          create: [
            {
              followingId: userId,
            },
          ],
        },
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          create: [
            {
              followersId: updatedCurrentUser.id,
            },
          ],
        },
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("FOLLOW USER ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const user = await fetchUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId } = params;

    console.log(userId);

    if (!userId) {
      return new NextResponse("User Id is missing", { status: 400 });
    }

    const followingUser = await prisma.following.findFirst({
      where: {
        userId: user.id,
        followingId: userId,
      },
    });

    // update the currently viewing   user followers array
    const updatedCurrentUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        following: {
          deleteMany: [{ id: followingUser.id }],
        },
      },
    });

    const followerUser = await prisma.followers.findFirst({
      where: {
        userId,
        followersId: updatedCurrentUser.id,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          deleteMany: [{ id: followerUser.id }],
        },
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("UNFOLLOW USER ROUTE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
