import { LeaderProps } from "@/types";
import Image from "next/image";
import React from "react";
import { useFrame } from "../farcaster-provider";

const Leader = ({ leader }: LeaderProps) => {
  const { context } = useFrame();
  return (
    <div
      className={`${
        context?.user?.username === leader?.username &&
        "border-2 border-orange-500"
      } bg-primary text-white p-2 rounded-md cursor-pointer text-sm font-semibold duration-300 hover:bg-indigo-400/20 flex items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <p className="text-md">
          {leader?.index === 1 ? (
            <span className="text-2xl">🥇</span>
          ) : leader?.index === 2 ? (
            <span className="text-2xl">🥈</span>
          ) : leader?.index === 3 ? (
            <span className="text-2xl">🥉</span>
          ) : (
            leader?.index
          )}
        </p>
        <div className="bg-white rounded-full w-8 h-8 overflow-hidden">
          <Image src={leader.pfp} alt="pfp" width={35} height={35} />
        </div>
        <p>
          {context?.user?.username === leader?.username ? (
            <span className="text-orange-500">You</span>
          ) : (
            leader?.username
          )}
        </p>
      </div>
      <p>{leader?.earned} BXP</p>
    </div>
  );
};

export default Leader;
