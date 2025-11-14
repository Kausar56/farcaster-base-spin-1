import { NextResponse } from "next/server";

export async function GET() {
  const farcasterConfig = {
    frame: {
      name: "Base Spin",
      version: "2",
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
        "Don't miss the next draw! Enter our lottery and spin to multiply your ETH 300x today.",
      subtitle: "ETH Lotto and Spin Fun",
      description:
        "Join the daily ETH rush! Spin the wheel or enter the lotto for a chance to win crypto. Players are winning up to 10x their entry every 6 hours!",
      primaryCategory: "games",
      screenshotUrls: ["https://base-spin.vercel.app/screenshot1.png"],
      heroImageUrl: "https://base-spin.vercel.app/hero.png",
      ogImageUrl: "https://base-spin.vercel.app/og-image.png",
      castShareUrl:
        "https://warpcast.com/~/compose?text=I+just+entered+this+Farcaster+Lottery+%F0%9F%92%B0%0A%0ATry+your+luck!+%F0%9F%91%87%0Ahttps%3A%2F%2Ffarcaster.xyz%2Fminiapps%2FOVGXH7QGFT1j%2Fbase-spin",
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
