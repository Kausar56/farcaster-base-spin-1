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

export { APP_URL, spinOptions };
