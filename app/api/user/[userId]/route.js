import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
  } catch (error) {}
};

export const GET = async (request, { params }) => {
  try {
    const logInUser = await currentUser();
    if (!logInUser) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { userId } = params;

    if (!userId) {
      return NextResponse.json("UserId Not provided", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse("Internal Server Error", { status: 500 });
  }
};
