import React, { useEffect, useState } from "react";
import { useFrame } from "../farcaster-provider";
import { tokens } from "@/lib/tokens";
import Token from "./Token";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { contractAbi } from "@/abi/abi";
import { Loader } from "lucide-react";
import { formatUnits } from "viem";
import RefundAndClaimBtn from "./RefundAndClaimBtn";
import UserHIstroy from "./UserHIstroy";

const ProfilePfp = () => {
  const { context } = useFrame();

  return (
    <div className="flex flex-col items-center gap-2 px-4 -mt-4">
      <div className="bg-white rounded-2xl p-3 shadow-lg w-full flex items-center gap-4">
        <div className="w-20 h-20 ring-1 rounded-full overflow-hidden bg-indigo-500">
          {context?.user?.pfpUrl && (
            <img
              src={context?.user?.pfpUrl}
              className="w-full h-full rounded-full"
              alt="User Profile"
              width={56}
              height={56}
            />
          )}
        </div>

        <div className="">
          <p className="text-lg text-blue-600">{context?.user?.displayName}</p>
          <p className="text-sm text-indigo-600">@{context?.user?.username}</p>
        </div>
      </div>

      {/* Refund & claim */}
      <RefundAndClaimBtn />

      {/* User history */}
      <UserHIstroy />

      {/* Balance */}
      <div className="bg-white rounded-2xl w-full backdrop-blur-md  overflow-hidden p-3 text-sm shadow-md">
        <h2 className="text-black font-bold">My balance </h2>

        <div className="pt-4 flex flex-col gap-1 max-h-48 overflow-x-auto ">
          {tokens.map((token, index) => (
            <Token {...token} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePfp;
