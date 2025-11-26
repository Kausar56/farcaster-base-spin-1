import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await context.params;
  const nftId = tokenId.split(".")[0];
  return NextResponse.json({
    name: `Warplet Monstar #${nftId}`,
    description: "An awesome NFT from Base Spin Warplet Monstar collection.",
    image: "https://base-spin.vercel.app/monster.png",
    attributes: [
      {
        trait_type: "Background",
        value: "Purple",
      },
      {
        trait_type: "Eyes",
        value: "Laser",
      },
      {
        trait_type: "Mouth",
        value: "Smile",
      },
      {},
    ],
  });
}
