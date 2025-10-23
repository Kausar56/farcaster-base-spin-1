import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    frame: {
      name: "Base Spin",
      version: "1",
      iconUrl: "https://base-spin.vercel.app/icon.png",
      homeUrl: "https://base-spin.vercel.app",
      imageUrl: "https://base-spin.vercel.app/image.png",
      buttonTitle: "Play Base Spin",
      splashImageUrl: "https://monadjam.vercel.app/splash.png",
      splashBackgroundColor: "#8E44AD",
      webhookUrl: "https://base-spin.vercel.app/api/webhook",
      subtitle: "Earn ETH by spin and quiz",
      description: "Win ETH token by spinning wheel and complete quiz.",
      primaryCategory: "games",
      tags: ["game", "social", "base-spin", "earn", "community"],
      tagline: "Earn ETH with Base Spin",
      ogTitle: "Base Spin - Play and Earn ETH",
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjMxNzI2MSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDQ5ZWUzMjNFYTFCYjY1RjY4RkE3NWRmMGM2RDQ0MWQyMGQ4M0E4Q2QifQ",
      payload: "eyJkb21haW4iOiJtb25hZGphbS52ZXJjZWwuYXBwIn0",
      signature:
        "YxqBNw9Ly04ybEvH1RAheaMzRyWB+1D8IP/LuCjoXg5vgTsvCdJwZWYbRN5sg8ttvnAs0asYGr0t7jNlcmIU5Rw=",
    },
  };

  return NextResponse.json(farcasterConfig);
}
