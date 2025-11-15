import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "My Cool NFT #1",
    description: "An awesome NFT from my collection",
    image: "ipfs://QmY5678efgh/1.png",
    attributes: [
      {
        trait_type: "Background",
        value: "Blue",
      },
      {
        trait_type: "Eyes",
        value: "Laser",
      },
    ],
  });
}
