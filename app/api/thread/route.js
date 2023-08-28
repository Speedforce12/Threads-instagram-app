import { currentUser } from "@clerk/nextjs";
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
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { thread, media, replyStatus } = await request.json();

    if (!replyStatus && !thread && !media) {
      return NextResponse.json("No thread data provided", { status: 400 });
    }

    // Loop through the files and upload them to Cloudinary
    const attachments = await Promise.all(
      media.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.url, {
          resource_type: "auto", folder:"threads_attachment",
        });
        return result;
      })
    );

    console.log("Uploading attachments", attachments);

    const creator = await prisma.user.findUnique({
      where: {
        userId: user.id,
      },
    });

    const newThread = await prisma.thread.create({
      data: {
        thread,
        replyStatus,
        creatorId: creator.id,
        attachments: {
          create: attachments.map((file) => ({
            url: file.secure_url,
            type: file.resource_type
          }))
        }
      },
    });

    return NextResponse.json(newThread, { status: 200 });
  } catch (error) {
      console.error(error)
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
