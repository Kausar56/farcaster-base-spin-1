import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await context.params;
  const nftId = tokenId.split(".")[0];
  return NextResponse.json({
    name: `Pixel Cat #${nftId}`,
    description: "An awesome NFT from my collection",
    image: "https://base-spin.vercel.app/pixel-cat.png",
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
