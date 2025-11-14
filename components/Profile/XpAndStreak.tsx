import { contractAbi } from "@/abi/abi";
import React from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useReadContract } from "wagmi";

const XpAndStreak = () => {
  const { address } = useAccount();
  // BXP balance
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    token: contractAbi.BXPToken.address,
  });

  const { data: totalStreak } = useReadContract({
    address: contractAbi.claimPrize.address,
    abi: contractAbi.claimPrize.abi,
    functionName: "userGMCount",
    args: address ? [address] : undefined,
  });
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="bg-primary rounded-xl p-3">
        <p className="text-gray-200 text-sm mb-1">Total BXP</p>
        <p className="text-xl font-bold text-white">
          {balance ? (
            parseInt(formatUnits(balance.value, 18))
          ) : (
            <span className="animate-pulse">0.00</span>
          )}
        </p>
      </div>
      <div className="bg-primary rounded-xl p-3">
        <p className="text-gray-200 text-sm mb-1">Streak</p>
        <p className="text-xl font-bold text-orange-500">
          {totalStreak?.toString()} 🔥
        </p>
      </div>
    </div>
  );
};

export default XpAndStreak;
