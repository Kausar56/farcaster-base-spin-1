import dbConnect from "@/lib/db";
import Config from "@/models/Config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    dbConnect();
    const config = await Config.findOne({});
    return NextResponse.json({
      message: "Config fetched successfully",
      isSuccess: true,
      config,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching config",
        error: (error as Error).message,
        isSuccess: false,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const authHeader =
    request.headers.get("authorization") ||
    request.headers.get("Authorization");
  console.log(authHeader);
  if (!authHeader || authHeader !== `Bearer ${process.env.CONFIG_API_KEY}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { maintenanceMode, isSpinPaused, isQuizPaused } = await request.json();
  try {
    await dbConnect();
    let config = await Config.findOne({});
    if (!config) {
      config = new Config({});
    }
    if (maintenanceMode !== undefined) {
      config.maintenanceMode = maintenanceMode;
    }
    if (isSpinPaused !== undefined) {
      config.isSpinPaused = isSpinPaused;
    }
    if (isQuizPaused !== undefined) {
      config.isQuizPaused = isQuizPaused;
    }
    await config.save();
    return NextResponse.json(
      { message: "Config updated successfully", config },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating config", error: (error as Error).message },
      { status: 500 }
    );
  }
}
