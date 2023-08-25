import { RedirectToSignIn, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (request) => {
  try {
    const user = await currentUser();

    if (!user) {
      return RedirectToSignIn();
    }

    const { username, bio, image } = await request.json();

    if (!image || !username || !bio) {
      return NextResponse.json("All data is required", { status: 400 });
    }

    const imageUrl = await cloudinary.uploader.upload(image, {
      folder: "user_profile_images",
    });

    const onBoardedUser = await prisma.user.create({
      data: {
        userId: user.id,
        username,
        bio,
        image: imageUrl.secure_url,
        isOnboarded: true,
      },
    });

    return NextResponse.json(onBoardedUser);
  } catch (error) {
    console.error("Create User", error);
    return NextResponse.json("Internal Sever Error", { status: 500 });
  }
};
