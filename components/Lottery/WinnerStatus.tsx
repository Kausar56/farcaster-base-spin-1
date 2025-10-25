import { contractAbi } from "@/abi/abi";
import { Frown, PartyPopper, User } from "lucide-react";
import React from "react";
import { useAccount, useReadContract } from "wagmi";
import useGetDrawStatus from "./hooks/useGetDrawStatus";
import { formatEther } from "viem";

const WinnerStatus = () => {
  const { address } = useAccount();
  const { data: winStatus } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "checkLastRoundResult",
    args: [address as `0x${string}`],
  });
  return (
    <div
      className={`bg-gradient-to-br ${
        winStatus?.[0]
          ? "from-green-500 to-green-600"
          : "from-red-300 to-red-400"
      } rounded-2xl p-3 shadow-xl text-white`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/30 p-2 rounded-full">
          {winStatus?.[0] ? (
            <PartyPopper className="w-5 h-5" />
          ) : (
            <Frown className="w-5 h-5" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-md">
            {winStatus?.[0] ? "You Won!" : "Not This Time!"}
          </h3>
          <p className="text-green-100 text-sm">Round #{winStatus?.[2]}</p>
        </div>
      </div>

      {winStatus?.[0] && (
        <button className="mt-2 w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full">
          Claim {formatEther(winStatus?.[1] ?? BigInt(0))} ETH
        </button>
      )}
    </div>
  );
};

export default WinnerStatus;
