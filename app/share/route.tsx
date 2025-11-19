// app/share/route.ts
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const castHash = url.searchParams.get("castHash");
  const castFid = url.searchParams.get("castFid");
  const viewerFid = url.searchParams.get("viewerFid");

  console.log("Share handler hit: ", { castHash, castFid, viewerFid });

  return new Response(
    JSON.stringify({
      message: "Parameters logged",
      castHash,
      castFid,
      viewerFid,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
