import { auth } from "@clerk/nextjs";
import prisma from "./prismadb";

export const fetchUser = async () => {
  try {
    const { userId } = auth();

    if (!userId) return;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};
