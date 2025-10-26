// import { exitCooldown } from "@/lib/lotteryControl";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const hash = await exitCooldown();
//     if (!hash) {
//       return NextResponse.json({ message: "TX failed" }, { status: 400 });
//     }

//     return NextResponse.json({ message: "TX success" }, { status: 2001 });
//   } catch (error) {
//     return NextResponse.json({ error: "Something wrong" }, { status: 500 });
//   }
// }
