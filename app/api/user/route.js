import { RedirectToSignIn, auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prismadb";

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

    return NextResponse.json(onBoardedUser, { status: 200 });
  } catch (error) {
    console.log("Create User", error);
    return NextResponse.json("Internal Sever Error", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json("Users not found", { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log("Fetch User", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
