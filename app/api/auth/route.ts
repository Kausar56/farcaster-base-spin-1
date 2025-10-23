import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  address: z.string(),
  fid: z.number(),
  username: z.string(),
});

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const requestBody = requestSchema.safeParse(requestJson);

  if (!requestBody.success || requestBody.data === null) {
    return Response.json(
      { success: false, errors: "Invalid request body" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const findUser = await User.findOne({ fid: requestBody.data.fid });
    if (findUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }
    const user = await User.create(requestBody.data);
    if (!user) {
      return NextResponse.json({ success: false }, { status: 400 });
    }
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
