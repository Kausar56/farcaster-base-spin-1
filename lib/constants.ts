export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day

const APP_URL = process.env.NEXT_PUBLIC_URL;

if (!APP_URL) {
  throw new Error("NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL is not set");
}

const spinOptions = [
  {
    option: "100 BXP",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "10 BXP",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFFFF" },
  },
  {
    option: "50 BXP",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "20 BXP",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFBEB" },
  },
  {
    option: "25 BXP",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "30 BXP",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFFFF" },
  },
];

const notificationsBtn = [
  {
    id: 1,
    name: "Draw Started",
    title: "🎉 New Draw started",
    body: "Join now to win big rewards 💰!",
  },
  {
    id: 2,
    name: "Winner Selected",
    title: "🏆 Lottery Winners selected!",
    body: "Check and claim rewards from lottery tab 🥇!",
  },
  {
    id: 3,
    name: "Giveaway Started",
    title: "🎉 Claim your prize now!",
    body: "FCFS giveaway started. Open app and claim now ⚡!",
  },
  {
    id: 4,
    name: "Daily spin",
    title: "🎡 You forgot to spin!",
    body: "Open app and claim daily free spin ⚡!",
  },
  {
    id: 5,
    name: "Mint NFT",
    title: "🎉 MINT your Pixel Cat!",
    body: "Get Exclusive rewards and utilities for Holder ⚡!",
  },
  {
    id: 6,
    name: "Unclaimed",
    title: "🎗️ Unclaimed rewards reminder!",
    body: "Open app and check for any unclaimed rewards ⚡!",
  },
  {
    id: 7,
    name: "Invite started",
    title: "🎉 Invite & Earn rewards!",
    body: "Invite your friends & earn more BXP ⚡!",
  },
];

export { APP_URL, spinOptions, notificationsBtn };
