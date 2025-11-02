export const MESSAGE_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 day

const APP_URL = process.env.NEXT_PUBLIC_URL;

if (!APP_URL) {
  throw new Error("NEXT_PUBLIC_URL or NEXT_PUBLIC_VERCEL_URL is not set");
}

const spinOptions = [
  {
    option: "Nothing!",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "0.1 USD",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFFFF" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "0.05 USD",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFBEB" },
  },
  {
    option: "Nothing!",
    style: { backgroundColor: "#60a5fa", textColor: "#f5b939" },
  },
  {
    option: "0.01 USD",
    style: { backgroundColor: "#90cdf4", textColor: "#FFFFFF" },
  },
];

const notificationsBtn = [
  {
    id: 1,
    name: "Draw Started",
    title: "🎉 Draw started",
    body: "Join now to win big rewards 💰!",
  },
  {
    id: 2,
    name: "Winner Selected",
    title: "🏆 Winners selected!",
    body: "Check if you won or not 🥇!",
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
    title: "🛞 You forgot to spin!",
    body: "Open app and claim daily free spin ⚡!",
  },
];

export { APP_URL, spinOptions, notificationsBtn };
