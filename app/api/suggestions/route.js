import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const user = await fetchUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // extract the ids of the currently log in users following
    const currentlyFollowing = user.following.map(
      (follow) => follow.followingId
    );

    const mutualFollowers = await prisma.followers.findMany({
      where: {
        userId: {
          in: currentlyFollowing,
          not: user.id, // Exclude the currently logged-in user
        },
        followersId: {
          not: user.id, // Exclude the currently logged-in user
        },
      },
      select: {
        followersId: true,
      },
    });

   const mutualFollowerIds = mutualFollowers.map((item) => item.followersId);

    // Find users who are not already followed by the currently logged-in user
    const suggestions = await prisma.user.findMany({
      where: {
        id: {
          not: user.id, // Exclude the currently logged-in user
          in: [...mutualFollowerIds], // Exclude already followed and mutual followers
        },
      },
    });
    

    if (suggestions.length === 0) {
      return NextResponse.json("No Suggested Users Found", { status: 404 });
    }

    return NextResponse.json(suggestions);
  } catch (error) {
    console.log("FETCHING FOLLOW SUGGESTION:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
