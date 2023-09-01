import { fetchUser } from "@/lib/fetchUser";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const user = await fetchUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
      }
      
      
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
