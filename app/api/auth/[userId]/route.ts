import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

type Params = { userId: string };

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> }
) {
  const params = await context.params;
  const userId = params.userId;
  if (!userId) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ fid: userId });
    if (user) {
      return NextResponse.json({ success: true, data: user }, { status: 200 });
    }
    return NextResponse.json({ success: false, data: user }, { status: 404 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
