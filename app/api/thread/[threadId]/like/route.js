import { fetchUser } from "@/lib/fetchUser";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return NextResponse.json("unAuthorized", { status: 401 });
    }

    const { threadId } = params;
    console.log(threadId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("THREADS LIKES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
