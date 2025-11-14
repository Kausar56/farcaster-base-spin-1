import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { fid, prize } = await request.json();

  // Validate input
  if (!fid || !prize) {
    return NextResponse.json(
      { success: false, message: "Invalid input" },
      { status: 400 }
    );
  }

  // Call the smart contract function to claim the prize
  try {
    await dbConnect();
    console.log({ fid, prize });
    const user = await User.findOne({ fid });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const prizeNumber = parseInt(prize);
    if (isNaN(prizeNumber)) {
      return NextResponse.json(
        { success: false, message: "Invalid prize amount" },
        { status: 400 }
      );
    }
    user.earned += prizeNumber;
    await user.save();
    return NextResponse.json({ isSuccess: true }, { status: 200 });
  } catch (error) {
    console.error("Error claiming prize:", error);
    return new Response("Error claiming prize", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const users = await User.find({})
      .sort({ earned: -1 }) // Sort by earned field in descending order
      .limit(10); // Limit to top 10 users

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}
