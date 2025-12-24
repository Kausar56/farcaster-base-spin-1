import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ tokenId: string }> }
) {
  const { tokenId } = await context.params;
  const nftId = tokenId.split(".")[0];
  return NextResponse.json({
    name: `Christmas Box #${nftId}`,
    description: "An awesome NFT from Base Spin collection",
    image: "https://base-spin.vercel.app/box.png",
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
