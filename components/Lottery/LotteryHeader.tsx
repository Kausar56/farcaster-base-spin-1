import { contractAbi } from "@/abi/abi";
import { Sparkles } from "lucide-react";
import React from "react";
import { useReadContract, useReadContracts } from "wagmi";

const LotteryHeader = () => {
  const { data, isLoading } = useReadContract({
    address: contractAbi.DailyLottery.address as `0x${string}`,
    abi: contractAbi.DailyLottery.abi,
    functionName: "roundId",
  });
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-6 rounded-b-3xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Daily Lottery</h1>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          Round #{data?.toString() ?? "Loading..."}
        </div>
      </div>
      {/* <p className="text-blue-100 text-sm">Win big with just 0.0001 ETH!</p> */}
    </div>
  );
};

export default LotteryHeader;
