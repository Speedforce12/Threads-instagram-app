import { fetchUser } from "./fetchUser";
import prisma from "./prismadb";

export const fetchSuggestedUsers = async () => {
  const user = await fetchUser();
  // extract the ids of the currently log in users following
  const currentlyFollowing = user.following.map((follow) => follow.followingId);

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

    include: {
      followers: true,
    },
  });

  return suggestions;
};
