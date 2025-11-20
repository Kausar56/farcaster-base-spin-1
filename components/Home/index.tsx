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
import { useAccount } from "wagmi";
import ConnectWalletPage from "../common/ConnectWalletPage";
import Airdrop from "../Airdrop";
import { useEffect } from "react";
import ClaimAirdrop from "../popup/ClaimAirdrop";

export function Demo() {
  const { route, actions } = useFrame();
  const { isConnected } = useAccount();
  useEffect(() => {
    if (actions) {
      actions?.addMiniApp();
    }
  }, [actions]);
  return isConnected ? (
    <>
      {/* <DailyStreak /> */}
      <ClaimAirdrop />
      <div className="">
        {route === "lottery" && <Lottery />}
        {route === "spin" && <SpinWheelGame />}
        {route === "profile" && <Profile />}
        {route === "airdrop" && <Airdrop />}
        {route === "leaderboard" && <Leaderboard />}
        {route === "admin" && <Admin />}
      </div>
      <Menu />
    </>
  ) : (
    <ConnectWalletPage />
  );
}
