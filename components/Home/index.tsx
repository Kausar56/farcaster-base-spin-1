"use client";
import { Menu } from "../common/Menu";
import SpinWheelGame from "../SpinWheel";
import { useFrame } from "../farcaster-provider";
import { Profile } from "../Profile";
import Leaderboard from "../leaderboard";
import Admin from "../admin/Admin";
import Lottery from "../Lottery";
// import Giveaway from "../Giveaway";
import DailyStreak from "../DailyStreak";
import { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import ConnectWalletPage from "../common/ConnectWalletPage";
import { Settings } from "lucide-react";
import Airdrop from "../Airdrop";

export function Demo() {
  const { route } = useFrame();
  const { isConnected } = useAccount();
  return isConnected ? (
    <>
      <p className="bg-gray-900 text-white p-3 text-center flex justify-center gap-2">
        App is maintenance mode for upgrading{" "}
        <Settings className="animate-spin" />
      </p>
      <DailyStreak />
      <div className="">
        {route === "lottery" && <Lottery />}
        {route === "spin" && <SpinWheelGame />}
        {route === "profile" && <Profile />}
        {route === "airdrop" && <Airdrop />}
        {route === "leaderboard" && <Leaderboard />}
        {route === "admin" && <Admin />}
      </div>
      <Menu />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={15}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background:
              "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%, rgba(19, 19, 173, 1) 0%, rgba(7, 124, 227, 1) 100%)",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  ) : (
    <ConnectWalletPage />
  );
}
