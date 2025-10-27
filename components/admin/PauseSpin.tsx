import { contractAbi } from "@/abi/abi";
import React from "react";
import { useReadContract, useWriteContract } from "wagmi";
import useContractState from "../useContractState";

const PauseSpin = () => {
  const { writeContract, isPending } = useWriteContract();
  const {
    isSpinPaused,
    isLotteryPaused,
    isLoadingLotteryPaused,
    isLoadingSpinPaused,
  } = useContractState();

  const handleSpinPauseToggle = () => {
    writeContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: isSpinPaused ? "unpause" : "pause",
    });
  };
  const handleLotteryPauseToggle = () => {
    writeContract({
      address: contractAbi.DailyLottery.address,
      abi: contractAbi.DailyLottery.abi,
      functionName: isLotteryPaused ? "unpause" : "pause",
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 bg-white rounded-2xl shadow-lg p-2">
      <div>
        <h1 className="text-blue-600 text-md font-bold">
          Contract Pause/Unpause
        </h1>
      </div>
      <div className="w-full grid grid-cols-2 items-center gap-2">
        <button
          onClick={handleSpinPauseToggle}
          disabled={isLoadingSpinPaused || isPending}
          className="py-2 px-3 bg-blue-600 rounded-2xl text-white"
        >
          {isLoadingSpinPaused || isPending
            ? "Loading..."
            : isSpinPaused
            ? "Spin is Paused"
            : "Spin is Active"}
        </button>
        <button
          onClick={handleLotteryPauseToggle}
          disabled={isLoadingLotteryPaused || isPending}
          className="py-2 px-3 bg-blue-600 rounded-2xl text-white"
        >
          {isLoadingLotteryPaused || isPending
            ? "Loading..."
            : isLotteryPaused
            ? "Lottery is Paused"
            : "Lottery is Active"}
        </button>
      </div>
    </div>
  );
};

export default PauseSpin;
