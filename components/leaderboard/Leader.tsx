import { LeaderProps } from "@/types";
import React from "react";
import { useFrame } from "../farcaster-provider";

const Leader = ({ leader }: LeaderProps) => {
  const { context, actions } = useFrame();

  const handleViewProfile = async () => {
    try {
      if (!actions || !leader?.fid) return;
      await actions.viewProfile({
        fid: leader?.fid,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      onClick={handleViewProfile}
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
          {leader?.pfp && (
            <img src={leader?.pfp} alt="pfp" className="w-full h-full" />
          )}
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
