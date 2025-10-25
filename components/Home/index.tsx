"use client";
import { Haptics } from "./Haptics";
import { Menu } from "../common/Menu";
import SpinWheelGame from "../SpinWheel";
import ConnectedAddress from "../common/ConnectedAddress";
import { useFrame } from "../farcaster-provider";
import Quiz from "../Quiz";
import { Profile } from "../Profile";
import Leaderboard from "../leaderboard";
import Admin from "../admin/Admin";
import Lottery from "../Lottery";

export function Demo() {
  const { route } = useFrame();
  return (
    <>
      {/* <ConnectedAddress /> */}
      <div className="">
        {route === "lottery" && <Lottery />}
        {route === "spin" && <SpinWheelGame />}
        {route === "profile" && <Profile />}
        {route === "leaderboard" && <Leaderboard />}
        {route === "admin" && <Admin />}
      </div>
      <Menu />
    </>
  );
}
