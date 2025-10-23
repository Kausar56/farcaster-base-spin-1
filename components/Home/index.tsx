"use client";

import { FarcasterActions } from "@/components/Home/FarcasterActions";
import { User } from "@/components/Home/User";
import { WalletActions } from "@/components/Home/WalletActions";
import { NotificationActions } from "./NotificationActions";
import CustomOGImageAction from "./CustomOGImageAction";
import { Haptics } from "./Haptics";
import { Menu } from "../common/Menu";
import SpinWheelGame from "../SpinWheel";
import ConnectedAddress from "../common/ConnectedAddress";
import { useFrame } from "../farcaster-provider";
import Quiz from "../Quiz";
import { Profile } from "../Profile";
import Leaderboard from "../leaderboard";
import Admin from "../admin/Admin";
import Auth from "../Auth";
import MonadArcadeGame from "../ArcadeGame";

export function Demo() {
  const { route } = useFrame();
  return (
    <>
      <ConnectedAddress />
      <div className="flex flex-col w-full h-full items-center justify-center">
        {/* <User />
        <FarcasterActions />
        <NotificationActions />
        <WalletActions />
        <CustomOGImageAction />
        <Haptics /> */}
        {route === "spin" && <SpinWheelGame />}
        {route === "quiz" && <Quiz />}
        {route === "profile" && <Profile />}
        {route === "leaderboard" && <Leaderboard />}
        {route === "admin" && <Admin />}

        {/* <Auth /> */}
        {/* <MonadArcadeGame /> */}
      </div>
      <Menu />
    </>
  );
}
