import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: `Pixel Cats Collection`,
    description: "A collection of 10000 pixel cats.",
    image: "https://base-spin.vercel.app/pixel-cat.png",
    seller_fee_basis_points: 500,
    fee_recipient: "0x4b2f389686868db6A4F5119445c2E7b9DA674A6b",
  });
}
