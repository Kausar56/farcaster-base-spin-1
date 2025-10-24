import { contractAbi } from "@/abi/abi";
import React from "react";
import { useReadContract, useWriteContract } from "wagmi";

const PauseSpin = () => {
  const { writeContract, isPending } = useWriteContract();
  const { data: isPaused, isLoading: isLoadingPaused } = useReadContract({
    address: contractAbi.claimPrize.address,
    abi: contractAbi.claimPrize.abi,
    functionName: "paused",
  });

  const handlePauseToggle = () => {
    writeContract({
      address: contractAbi.claimPrize.address,
      abi: contractAbi.claimPrize.abi,
      functionName: isPaused ? "unpause" : "pause",
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <button
        onClick={handlePauseToggle}
        disabled={isLoadingPaused || isPending}
        className="py-2 px-3 bg-blue-500 rounded-md mt-2 text-white"
      >
        {isLoadingPaused || isPending
          ? "Loading..."
          : isPaused
          ? "Spin is Paused"
          : "Spin is Active"}
      </button>
    </div>
  );
};

export default PauseSpin;
