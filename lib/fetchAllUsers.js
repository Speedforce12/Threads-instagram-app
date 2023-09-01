import { fetchUser } from "./fetchUser";
import prisma from "./prismadb";

export const fetchAllUsers = async () => {
  const user = await fetchUser();

  if (!user) return null;

  const users = await prisma.user.findMany({});

  return users;
};
