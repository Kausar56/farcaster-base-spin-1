import { LeaderProps } from "@/types";
import React from "react";

const Leader = ({ leader }: LeaderProps) => {
  return (
    <div>
      <div className="backdrop-blur-md p-1 rounded-md cursor-pointer text-sm font-semibold duration-300 hover:bg-indigo-400/20 flex justify-between">
        <div className="flex gap-2">
          <p>{leader?.index}</p>
          <p>{leader?.username}</p>
        </div>
        <p>{leader?.earned.toFixed(5)} ETH</p>
      </div>
    </div>
  );
};

export default Leader;
