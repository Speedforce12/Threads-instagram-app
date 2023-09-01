import { fetchUser } from "@/lib/fetchUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const user = await fetchUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Get the user's current followers
    const currentFollowing = currentUser.following;

    // Suggest users who are followed by the user's followers but not the user
    const suggestions = await prisma.user.findMany({
      where: {
        following: {
          some: {
            id: { not: user.id },
            NOT: {
              id: { in: currentFollowing.map((follower) => follower.id) },
            },
          },
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
