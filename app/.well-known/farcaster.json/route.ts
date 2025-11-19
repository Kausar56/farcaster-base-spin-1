import { NextResponse } from "next/server";

export async function GET() {
  const farcasterConfig = {
    miniapp: {
      name: "Base Spin",
      version: "1",
      iconUrl: "https://base-spin.vercel.app/icon.png",
      homeUrl: "https://base-spin.vercel.app",
      imageUrl: "https://base-spin.vercel.app/image.png",
      buttonTitle: "Play To Earn",
      splashImageUrl: "https://base-spin.vercel.app/splash.png",
      splashBackgroundColor: "#2563eb",
      webhookUrl: "https://base-spin.vercel.app/api/webhook",
      tags: ["game", "prize", "lottery", "spin", "wager"],
      tagline: "Spin and Win Lottery Prize",
      ogTitle: "Base Spin - Fun Lotto and Spin",
      ogDescription:
        "Don't miss the next draw! Join lottery and spin to earn BXP token.",
      subtitle: "Base Lotto and Spin Fun",
      description:
        "Join the daily BXP rush. Spin or enter the lotto for a chance to win crypto.",
      primaryCategory: "games",
      screenshotUrls: ["https://base-spin.vercel.app/screenshot1.png"],
      heroImageUrl: "https://base-spin.vercel.app/hero.png",
      ogImageUrl: "https://base-spin.vercel.app/hero.png",
      castShareUrl: "https://base-spin.vercel.app/share",
    },
    accountAssociation: {
      header:
        "eyJmaWQiOjIzOTUzMCwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDY1RDVDMDhGNkIyNzg1MTRkNjQyQkY1NDlBOTRkYjUzN2JEMUYzQmMifQ",
      payload: "eyJkb21haW4iOiJiYXNlLXNwaW4udmVyY2VsLmFwcCJ9",
      signature:
        "jz3Rx55O6+JqjF9mU8tbCQuE0OJoOr9CzdQmsY9alyBD9P9bFfna2Iesy8GAdec/0Gh92f8qHFCIjytqsWC5tBs=",
    },
    baseBuilder: {
      ownerAddress: "0xB23955A49c9974a40e68717813a108002072a368",
    },
  };

  return NextResponse.json(farcasterConfig);
}
